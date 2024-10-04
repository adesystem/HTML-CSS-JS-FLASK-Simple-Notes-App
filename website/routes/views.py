from flask import jsonify, Blueprint, flash, redirect, url_for, render_template, request
from flask_login import login_required, current_user
from website import db
from website.models import Note, NoteValidator

views = Blueprint('views', __name__)


@views.route('/')
def home():
    return render_template('home.html', active_page='home')

@views.route('user/notes')
@login_required
def notes():

    try: 
        notes = Note.query.filter_by(user_id=current_user.id).all()

    except:
        notes = []

    return render_template('notes.html', active_page='notes', notes=reversed(notes))

@views.route('user/notes/add', methods=['POST'])
@login_required
def add_note():
    
    title = request.form.get('title')
    content = request.form.get('content')
    
    if not title:
        flash('TITLE IS REQUIARED', category='error')
        return redirect(url_for('views.notes'))
        
    if not content:
        flash('CONTENT IS REQUIARED', category='error')
        return redirect(url_for('views.notes'))
        
    try:
        note_validator = NoteValidator(title=title, content=content, user_id=current_user.id)
        note = note_validator.to_model()
        db.session.add(note)
        db.session.commit()
        flash('NOTE ADDED SUCCESFULLY', category='success')
        return redirect(url_for('views.notes'))
        
    except Exception as e:
        db.session.rollback()
        print(str(e))
        flash('AN ERROR OCCURED WHILE ADDING THE NOTE, TRY AGAIN LATER', category='error')
        return redirect(url_for('views.notes'))
    
@views.route('user/notes/get/<int:id>', methods=['GET'])
@login_required
def get_note(id: int):
    
        try:
            note = Note.query.filter_by(id=id).first()
    
            if not note:
                flash('NOTE NOT FOUND', category='error')
                return redirect(url_for('views.notes'))
            
            if note.user_id != current_user.id:
                flash('NO REQUIRED PERMISSIONS', category='error')
                return redirect(url_for('views.notes'))
            
            return jsonify({
                'title': note.title,
                'content': note.content,
                'date': note.date.strftime('%d-%m-%Y')
            }), 200
        
        except Exception as e:
            print(str(e))
            flash('AN ERROR OCCURED WHILE GETTING THE NOTE, TRY AGAIN LATER', category='error')
            return redirect(url_for('views.notes'))

@views.route('user/notes/edit/<int:id>', methods=['POST'])
@login_required
def edit_note(id: int):

    title = request.form.get('title')

    content = request.form.get('content')

    if not title:
        flash('TITLE IS REQUIARED', category='error')
        return redirect(url_for('views.notes'))
        
    if not content:
        flash('CONTENT IS REQUIARED', category='error')
        return redirect(url_for('views.notes'))
    
    try:
        note = Note.query.filter_by(id=id).first()

        if not note:
            flash('NOTE NOT FOUND', category='error')
            return redirect(url_for('views.notes'))
        
        if note.user_id != current_user.id:
            flash('NO REQUIRED PERMISSIONS', category='error')
            return redirect(url_for('views.notes'))
        
        note.title = title

        note.content = content

        note_validator: NoteValidator = note.to_validator()

        db.session.commit()
        flash('NOTE EDITED SUCCESFULLY', category='success')
        return redirect(url_for('views.notes'))
    
    except Exception as e:
        db.session.rollback()
        print(str(e))
        flash("AN ERROR OCCURED WHILE EDITING THE NOTE, TRY AGAIN LATER", category='error')
        return redirect(url_for('views.notes'))
        
        
@views.route('user/notes/delete/<int:id>', methods=['POST'])
@login_required
def delete_note(id: int):

    try:
        
        note = Note.query.filter_by(id=id).first()

        if not note:
            flash('NOTE NOT FOUND', category='error')
            return redirect(url_for('views.notes'))
        
        if note.user_id != current_user.id:
            flash('NO REQUIRED PERMISSIONS', category='error')
            return redirect(url_for('views.notes'))
        
        db.session.delete(note)
        db.session.commit()

        flash('NOTE DELETED SUCCESFULLY', category='success')
        return redirect(url_for('views.notes'))
    
    except Exception as e:
        db.session.rollback()
        print(str(e))
        flash("AN ERROR OCCURED WHILE DELETING THE NOTE, TRY AGAIN LATER", category='error')
        return redirect(url_for('views.notes'))

        

        
