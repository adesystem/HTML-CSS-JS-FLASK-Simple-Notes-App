from flask import Blueprint, render_template, request, flash, redirect, url_for
from werkzeug.security import generate_password_hash, check_password_hash
from website.models import User, UserValidator
from sqlalchemy import exists
from website import db

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':
        email: str = request.form.get('email')
        password: str = request.form.get('password')

        user = User.query.filter_by(email=email).first()

        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                return redirect(url_for('views.home'))
            else:
                flash('Incorrect password, try again.', category='error')
        else:
            flash("Email doesn't exists.", category='error')

    return render_template('login.html')


@auth.route('/sign-up', methods=['GET', 'POST'])
def signup():

    if request.method == 'POST':
        username: str = request.form.get('username')
        email: str = request.form.get('email')
        password: str = request.form.get('password')

        try:
            
            user_exists: bool = db.session.query(exists().where(User.name == username)).scalar()
            email_exists: bool = db.session.query(exists().where(User.email == email)).scalar()
            
            if email_exists:
                raise Exception('Email already exists!')
            if user_exists:
                raise Exception('Username already exists!')

            new_user_validator: UserValidator = UserValidator(name=username, email=email, password=generate_password_hash(password, method='pbkdf2:sha256'))
            new_user: User = new_user_validator.to_model()
            db.session.add(new_user)
            db.session.commit()
            flash('Account created!', category='success')
        except Exception as e:
            db.session.rollback()
            flash(str(e), category='error')
        finally:
            return redirect(url_for('auth.login'))

    return render_template('sign-up.html')
