from PartwebAuto import db

class User(db.Document):
    name = db.StringField(max_length=64, required=True)
    gender = db.StringField(max_length=120)
    major = db.StringField(max_length=120)
    age = db.IntField()
