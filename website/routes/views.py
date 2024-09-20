from flask import Blueprint, redirect, url_for, render_template
from flask_login import login_required, current_user
from website.models import Note

views = Blueprint('views', __name__)


@views.route('/')
@login_required
def home():
    return redirect(url_for('views.profile'))

@views.route('/profile')
@login_required
def profile():

    total_notes: int = Note.query.filter_by(user_id=current_user.id).count()

    return render_template('profile.html', total_notes=total_notes)

@views.route('notes')
@login_required
def notes():
    return render_template('base.html')
