from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from dotenv import load_dotenv
import os

from flask_login import LoginManager

load_dotenv()

DATABASE_NAME: str = os.getenv("DATABASE_NAME")
DATABASE_USER: str = os.getenv("DATABASE_USER")
DATABASE_PASSWORD: str = os.getenv("DATABASE_PASSWORD")
DATABASE_HOST: str = os.getenv("DATABASE_HOST", "localhost")
DATABASE_PORT: str = os.getenv("DATABASE_PORT", "3306")

SECRET_KEY: str = os.getenv("SECRET_KEY")
DEBUG_MODE: bool = os.getenv("DEBUG_MODE", False)

db = SQLAlchemy()


def create_app():
    """
    Creates and configures the Flask application.
    Returns:
        app (Flask): The configured Flask application.
    """
    ...
    app = Flask(__name__)
    app.config['SECRET_KEY'] = SECRET_KEY
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}'
    db.init_app(app)

    from .models import User, Note

    from .routes.views import views
    from .routes.auth import auth
    from .routes.account import account

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(account, url_prefix='/')

    with app.app_context():
        db.create_all()

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.login_message = None
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app

