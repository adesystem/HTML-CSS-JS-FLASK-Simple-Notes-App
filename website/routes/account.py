from flask import Blueprint, flash, redirect, url_for, render_template, request
from flask_login import login_required, current_user, logout_user
from website import db
from website.models import Note, User
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import exists

account = Blueprint('account', __name__)

@account.route('/user')
@login_required
def user():

    try:
        total_notes: int = Note.query.filter_by(user_id=current_user.id).count()

    except:
        total_notes: int = 0
    
    return render_template('user.html', active_page='user', total_notes=total_notes)

@account.route('/user/username', methods=['POST'])
@login_required
def change_username():
    
    username: str = request.form.get('username')

    password: str = request.form.get('password')

    if not username:
        flash('USERNAME IS REQUIRED', category='error')
        return redirect(url_for('account.user'))
    
    if not password:
        flash('PASSWORD IS REQUIRED', category='error')
        return redirect(url_for('account.user'))

    try:
        user = User.query.filter_by(id=current_user.id).first()

        if (not check_password_hash(user.password, password)):
            flash('INCORRECT PASSWORD', category='error')
            return redirect(url_for('account.user'))

        username_exists: bool = db.session.query(exists().where(User.name == username)).scalar()

        if (username_exists):
            flash('USERNAME ALREADY EXISTS', category='error')
            return redirect(url_for('account.user'))
            
        user.name = username

        user_validator = user.to_validator()
    
        db.session.commit()
    
        flash('USERNAME CHANGED', category='success')
    
        return redirect(url_for('account.user'))
    
    except Exception as e:
        db.session.rollback()
        print(str(e))
        flash("INVALID DATA, TRY AGAIN LATER", category='error')
        return redirect(url_for('account.user'))
    

@account.route('/user/email', methods=['POST'])
@login_required
def change_email():
    
    email: str = request.form.get('email')
    password: str = request.form.get('password')

    if not email:
        flash('EMAIL IS REQUIRED', category='error')
        return redirect(url_for('account.user'))
    
    if not password:
        flash('PASSWORD IS REQUIRED', category='error')
        return redirect(url_for('account.user'))
    
    try:

        user = User.query.filter_by(id=current_user.id).first()

        if (not check_password_hash(user.password, password)):
            flash('INCORECT PASSWORD', category='error')
            return redirect(url_for('account.user'))

        email_exists: bool = db.session.query(exists().where(User.email == email)).scalar()

        if (email_exists):
            flash('EMAIL ALREADY EXISTS', category='error')
            return redirect(url_for('account.user'))

        user.email = email

        user_validator = user.to_validator()

        db.session.commit()

        flash('EMAIL CHANGED', category='success')

        return redirect(url_for('account.user'))

    except Exception as e:
        db.session.rollback()
        print(str(e))
        flash("INVALID DATA, TRY AGAIN LATER", category='error')
        return redirect(url_for('account.user'))
    

@account.route('/user/password', methods=['POST'])
@login_required
def change_password():
    
    current_password: str = request.form.get('current-password')

    if not current_password:
        flash('CURRENT PASSWORD IS REQUIRED', category='error')
        return redirect(url_for('account.user'))

    new_password: str = request.form.get('new-password')

    if not new_password:
        flash('NEW PASSWORD IS REQUIRED', category='error')
        return redirect(url_for('account.user'))
    
    if len(new_password) < 6:
        flash('PASSWORD IS TOO SHORT, IT MUST BE AT LEAST 6 CHARACTERS')
        return redirect(url_for('account.user'))

    if len(new_password) > 120:
        flash('PASSWORD IS TOO LONG, IT MUST BE AL MOST 120 CHARACTERS')
        return redirect(url_for('account.user'))
    
    try:

        user = User.query.filter_by(id=current_user.id).first()

        if (current_password == new_password or check_password_hash(user.password, new_password)):
            flash('NEW PASSWORD CANNOT BE THE SAME AS THE CURRENT ONE', category='error')
            return redirect(url_for('account.user'))

        if not check_password_hash(user.password, current_password):
            flash('Incorrect password!', category='error')
            return redirect(url_for('account.user'))
        
        user.password = generate_password_hash(new_password, method='pbkdf2:sha256')

        user_validator = user.to_validator()

        db.session.commit()

        flash('PASSWORD CHANGED', category='success')

        return redirect(url_for('account.user'))

    except Exception as e:
        db.session.rollback()
        print(e)
        flash("INVALID DATA, TRY AGAIN LATER", category='error')
        return redirect(url_for('account.user'))
    

@account.route('/user/delete', methods=['POST'])
@login_required
def delete_account():

    password: str = request.form.get('password')

    if not password:
        flash('PASSWORD IS REQUIRED', category='error')
        return redirect(url_for('account.user'))

    user_to_delete = User.query.filter_by(id=current_user.id).first()

    if not check_password_hash(user_to_delete.password, password):
        flash('INCORRECT PASSWORD', category='error')
        return redirect(url_for('account.user'))
    
    try: 
        Note.query.filter_by(user_id=user_to_delete.id).delete()
        logout_user()
        db.session.delete(user_to_delete)
        db.session.commit()
        flash('ACCOUNT DELETED SUCCESFULLY', category='success')
        return redirect(url_for('auth.signup'))
    
    except Exception as e:
        db.session.rollback()
        print(str(e))
        flash("INVALID DATA, TRY AGAIN LATER", category='error')
        return redirect(url_for('account.user'))