from PartwebAuto import db
import datetime


class User(db.Document):
    userName = db.StringField(max_length=64)
    userEmail = db.StringField(max_length=64, required=True)
    password = db.BinaryField(max_length=256)
    createdAt = db.DateTimeField(required=True, default=datetime.datetime.now)


class WeeklyWork(db.Document):
    userEmail = db.StringField(max_length=64, required=True)
    startDate = db.DateTimeField(required=True)
    endDate = db.DateTimeField(required=True)
    text = db.StringField(max_length=512)
    createdAt = db.DateTimeField(required=True, default=datetime.datetime.now)


class WorkSchedule(db.Document):
    userEmail = db.StringField(max_length=64, required=True)
    date = db.DateTimeField(required=True)
    schedule = db.IntField(required=True)
    createdAt = db.DateTimeField(required=True, default=datetime.datetime.now)
