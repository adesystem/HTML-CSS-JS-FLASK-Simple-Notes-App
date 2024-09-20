from website import db
from flask_login import UserMixin
from sqlalchemy.sql import func

from pydantic import BaseModel, Field, PositiveInt, EmailStr
from typing import Optional, List, Literal
from datetime import datetime


# SQLAlchemy model for Note
class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text)
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self) -> str:
        return f'<Note {self.title}>'

    def to_validator(self) -> 'NoteValidator':
        return NoteValidator(id=self.id, title=self.title, content=self.content, date=self.date, user_id=self.user_id)


# Pydantic model for Note
class NoteValidator(BaseModel):
    id: Optional[PositiveInt] = Field(None, title="ID of the note")
    title: str = Field(..., title="Title of the note", min_length=3, max_length=100)
    content: str = Field(..., title="Content of the note", max_length=65535)
    date: Optional[datetime] = Field(default_factory=datetime.now, title="Date of the note")
    user_id: PositiveInt = Field(..., title="ID of the user that owns the note")

    def __repr__(self) -> str:
        return f'<Note {self.title}>'

    def to_model(self) -> 'Note':
        return Note(title=self.title, content=self.content, date=self.date, user_id=self.user_id)


# SQLAlchemy model for User
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    name = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    register_date = db.Column(db.DateTime(timezone=True), default=func.now())
    account_type = db.Column(db.String(5), nullable=False, default='admin')
    
    notes = db.relationship('Note', backref='user', lazy=True)

    def __repr__(self) -> str:
        return f"User('{self.name}')"

    def to_validator(self) -> 'UserValidator':
        return UserValidator(id=self.id, email=self.email, name=self.name, password=self.password, register_date=self.register_date, account_type = self.account_type)


# Pydantic model for User
class UserValidator(BaseModel):
    id: Optional[PositiveInt] = Field(None, title="ID of the user")
    email: EmailStr = Field(..., title="Email of the user", max_length=80)
    name: str = Field(..., title="Name of the user", min_length=6, max_length=30)
    password: str = Field(..., title="Password of the user", min_length=6, max_length=120)
    register_date: Optional[datetime] = Field(default_factory=datetime.now, title="Date of registration")
    account_type: Literal['user', 'admin'] = Field('admin', title="Type of account")
    notes: Optional[List[NoteValidator]] = Field(None, title="Notes of the user")

    def __repr__(self) -> str:
        return f"User('{self.name}')"

    def to_model(self) -> 'User':
        return User(email=self.email, name=self.name, password=self.password, register_date=self.register_date, account_type=self.account_type)
