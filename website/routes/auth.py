from flask import Blueprint, render_template, request, flash, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from website.models import User, UserValidator, Note
from sqlalchemy import exists
from flask_login import login_user, login_required, logout_user, current_user
from website import db

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':
        
        username: str = request.form.get('username')

        if not username:
            flash('Username is required!', category='error')
            return redirect(url_for('auth.login'))

        password: str = request.form.get('password')

        if not password:
            flash('Password is required!', category='error')
            return redirect(url_for('auth.login'))
        
        try:
            user = User.query.filter_by(name=username).first()
            if user:
                if check_password_hash(user.password, password):
                    flash('Logged in successfully!', category='success')
                    login_user(user, remember=True)
                    return redirect(url_for('views.account'))
                else:
                    flash('Username or password is incorrect!', category='error')
            else:
                flash('Username or password is incorrect!', category='error')

        except Exception as e:
            db.rollback()
            flash(str(e), category='error')
            return redirect(url_for('auth.login'))
    
    return render_template('login.html')

@auth.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    flash('Logged out successfully!', category='success')
    return redirect(url_for('auth.login'))

@auth.route('/sign-up', methods=['GET', 'POST'])
def signup():

    if request.method == 'POST':
        username: str = request.form.get('username')

        if not username:
            flash('Username is required!', category='error')
            return redirect(url_for('auth.signup'))

        email: str = request.form.get('email')

        if not email:
            flash('Email is required!', category='error')
            return redirect(url_for('auth.signup'))

        password: str = request.form.get('password')

        if not password:
            flash('Password is required!', category='error')
            return redirect(url_for('auth.signup'))

        try:
            
            username_exists: bool = db.session.query(exists().where(User.name == username)).scalar()
            email_exists: bool = db.session.query(exists().where(User.email == email)).scalar()

            if username_exists:
                raise Exception('Username already exists!')

            if email_exists:
                raise Exception('Email already exists!')

            new_user_validator: UserValidator = UserValidator(name=username, email=email, password=generate_password_hash(password, method='pbkdf2:sha256'))
            new_user: User = new_user_validator.to_model()
            db.session.add(new_user)
            db.session.commit()
            flash('Account created!', category='success')
            login_user(new_user, remember=True)
            
            return redirect(url_for('views.account'))
        
        except Exception as e:
            db.session.rollback()
            flash(str(e), category='error')
            return redirect(url_for('auth.signup'))

    return render_template('sign-up.html')

@auth.route('/account/username', methods=['POST'])
@login_required
def change_username():
    
    username: str = request.form.get('username')

    if not username:
        flash('Username is required.', category='error')
        return redirect(url_for('views.account'))

    try:
            
            user = User.query.filter_by(id=current_user.id).first()
    
            user.name = username

            user_validator = user.to_validator()
    
            db.session.commit()
    
            flash('Username changed!', category='success')
    
            return redirect(url_for('views.account'))
    
    except Exception as e:
        db.session.rollback()
        flash(str(e), category='error')
        return redirect(url_for('views.account'))

@auth.route('/account/email', methods=['POST'])
@login_required
def change_email():
    
    email: str = request.form.get('email')

    if not email:
        flash('Email is required.', category='error')
        return redirect(url_for('views.account'))
    
    try:

        user = User.query.filter_by(id=current_user.id).first()

        user.email = email

        user_validator = user.to_validator()

        db.session.commit()

        flash('Email changed!', category='success')

        return redirect(url_for('views.account'))

    except Exception as e:
        db.session.rollback()
        flash(str(e), category='error')
        return redirect(url_for('views.account'))

@auth.route('/account/password', methods=['POST'])
@login_required
def change_password():
    
    current_password: str = request.form.get('current-password')

    if not current_password:
        flash('Current password is required.', category='error')

    new_password: str = request.form.get('new-password')

    if not new_password:
        flash('New password is required.', category='error')
    
    try:

        user = User.query.filter_by(id=current_user.id).first()

        if (current_password == new_password or check_password_hash(user.password, new_password)):
            flash('New password cannot be the same as the current password.', category='error')
            return redirect(url_for('views.account'))

        if not check_password_hash(user.password, current_password):
            flash('Incorrect password!', category='error')
            return redirect(url_for('views.account'))
        
        user.password = generate_password_hash(new_password, method='pbkdf2:sha256')

        user_validator = user.to_validator()

        db.session.commit()

        flash('Password changed!', category='success')

        return redirect(url_for('views.account'))

    except Exception as e:
        db.session.rollback()
        flash(str(e), category='error')
        return redirect(url_for('views.account'))
    

@auth.route('/account/delete', methods=['POST'])
@login_required
def delete_account():

    password: str = request.form.get('password')

    if not password:
        flash('Password is required.', category='error')
        return redirect(url_for('views.account'))

    user_to_delete = User.query.filter_by(id=current_user.id).first()

    if not check_password_hash(user_to_delete.password, password):
        flash('Incorrect password!', category='error')
        return redirect(url_for('views.account'))
    
    try: 
        Note.query.filter_by(user_id=user_to_delete.id).delete()
        logout_user()
        db.session.delete(user_to_delete)
        db.session.commit()
        flash('Account deleted!', category='success')
        return redirect(url_for('auth.login'))
    
    except Exception as e:
        db.session.rollback()
        flash(str(e), category='error')
        return redirect(url_for('views.account'))

@auth.route('admin')
@login_required
def admin():
    if current_user.account_type == 'admin':
        return 'admin'
    else:
        flash('You are not an admin!', category='error')
        return redirect(url_for('views.notes'))

