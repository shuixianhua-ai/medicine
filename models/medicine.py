from . import db
from sqlalchemy.sql import func


class Medicine(db.Model):
    __tablename__ = 'medicine'
    mid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    medNameZh = db.Column(db.text)
    medNameAlias = db.Column(db.text)
    Author = db.Column(db.String(32))
    Content = db.Column(db.String(500))
    Date = db.Column(db.DateTime, server_default = func.now())
    Type = db.Column(db.Integer)
