from flask import Blueprint, render_template, request, flash, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from website.models import User, UserValidator
from sqlalchemy import exists
from flask_login import login_user, login_required, logout_user, current_user
from website import db

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':
        
        username: str = request.form.get('username')
        password: str = request.form.get('password')

        user = User.query.filter_by(name=username).first()

        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.profile'))
        else:
            flash('Username or password is incorrect!', category='error')

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
        email: str = request.form.get('email')
        password: str = request.form.get('password')

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
            
            return redirect(url_for('views.profile'))
        
        except Exception as e:
            db.session.rollback()
            flash(str(e), category='error')
            return redirect(url_for('auth.signup'))

    return render_template('sign-up.html')

@auth.route('admin')
@login_required
def admin():
    if current_user.account_type == 'admin':
        return 'admin'
    else:
        flash('You are not an admin!', category='error')
        return redirect(url_for('views.profile'))

