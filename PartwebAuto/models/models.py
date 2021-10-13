from PartwebAuto import db
import datetime


class User(db.Document):
    userName = db.StringField(max_length=64)
    userEmail = db.StringField(max_length=64, required=True)
    password = db.BinaryField(max_length=256)
    createdAt = db.DateTimeField(required=True, default=datetime.datetime.now)
