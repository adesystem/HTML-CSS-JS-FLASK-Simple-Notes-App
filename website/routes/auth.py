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
            flash('USERNAME IS REQUIRED', category='error')
            return redirect(url_for('auth.login'))

        password: str = request.form.get('password')

        if not password:
            flash('PASSWORD IS REQUIRED', category='error')
            return redirect(url_for('auth.login'))
        
        try:
            user = User.query.filter_by(name=username).first()
            if user:
                if check_password_hash(user.password, password):
                    flash('LOGGED IN SUCCESFULLY', category='success')
                    login_user(user, remember=True)
                    return redirect(url_for('account.user'))
                else:
                    flash('USERNAME OR PASSWORD IS INCORRECT', category='error')
            else:
                flash('USERNAME OR PASSWORD IS INCORRECT', category='error')

        except Exception as e:
            db.rollback()
            print(e)
            flash("INVALID DATA, TRY AGAIN LATER", category='error')
            return redirect(url_for('auth.login'))
    
    return render_template('login.html', active_page='login')


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('LOGGET OUT SUCCESFULLY', category='success')
    return redirect(url_for('auth.login'))


@auth.route('/sign-up', methods=['GET', 'POST'])
def signup():

    if request.method == 'POST':
        username: str = request.form.get('username')

        if not username:
            flash('USERNAME IS REQUIRED', category='error')
            return redirect(url_for('auth.signup'))

        email: str = request.form.get('email')

        if not email:
            flash('EMAIL IS REQUIRED', category='error')
            return redirect(url_for('auth.signup'))

        password: str = request.form.get('password')

        if not password:
            flash('PASSWORD IS REQUIRED', category='error')
            return redirect(url_for('auth.signup'))

        try:
            
            username_exists: bool = db.session.query(exists().where(User.name == username)).scalar()
            email_exists: bool = db.session.query(exists().where(User.email == email)).scalar()

            if username_exists:
                flash("USERNAME ALREADY EXISTS", category='error')
                return redirect(url_for('auth.signup'))

            if email_exists:
                flash('EMAIL ALREADY EXISTS', category="error")
                return redirect(url_for('auth.signup'))

            new_user_validator: UserValidator = UserValidator(name=username, email=email, password=generate_password_hash(password, method='pbkdf2:sha256'))
            new_user: User = new_user_validator.to_model()
            db.session.add(new_user)
            db.session.commit()
            flash('ACCOUNT CREATED SUCCESFULLY', category='success')
            login_user(new_user, remember=True)
            
            return redirect(url_for('account.user'))
        
        except Exception as e:
            db.session.rollback()
            flash(str(e), category='error')
            return redirect(url_for('auth.signup'))

    return render_template('sign-up.html', active_page='sign-up')
