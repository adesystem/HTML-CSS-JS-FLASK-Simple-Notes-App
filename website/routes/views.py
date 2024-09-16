from flask import Blueprint, redirect, url_for, render_template
from flask_login import login_required, current_user

views = Blueprint('views', __name__)


@views.route('/')
@login_required
def home():
    return redirect(url_for('views.notes'))

@views.route('/profile')
@login_required
def profile():
    return 'Profile'

@views.route('notes')
@login_required
def notes():
    return render_template('home.html')
