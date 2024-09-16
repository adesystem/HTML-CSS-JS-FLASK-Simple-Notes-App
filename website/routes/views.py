from flask import Blueprint, redirect, url_for

views = Blueprint('views', __name__)


@views.route('/')
def home():
    return redirect(url_for('auth.login'))

@views.route('/dashboard')
def dashboard():
    return 'Dashboard'

@views.route('/profile')
def profile():
    return 'Profile'

@views.route('notes')
def notes():
    return 'Notes'
