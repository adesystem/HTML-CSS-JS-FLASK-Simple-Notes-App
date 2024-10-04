from flask import Blueprint, flash, redirect, url_for, render_template, request
from flask_login import login_required, current_user
from website import db

admin = Blueprint('admin', __name__)

@admin.route('admin')
@login_required
def admin_panel():
    if current_user.account_type == 'admin':
        return render_template('admin.html', active_page='admin')
    else:
        flash('NO REQUIRED PERMISSIONS', category='error')
        return redirect(url_for('account.user'))
