from PartwebAuto import db


class User(db.Document):
    userName = db.StringField(max_length=64)
    userEmail = db.StringField(max_length=64, required=True)
    password = db.StringField(max_length=64)
    confirmPassword = db.StringField(max_length=64)
