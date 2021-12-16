from PartwebAuto import db
import datetime


class User(db.Document):
    userName = db.StringField(max_length=64)
    userEmail = db.StringField(max_length=64, required=True)
    password = db.BinaryField(max_length=256)
    isAdmin = db.IntField()
    createdAt = db.DateTimeField(required=True, default=datetime.datetime.now)


class WeeklyWork(db.Document):
    userName = db.StringField(max_length=64)
    userEmail = db.StringField(max_length=64, required=True)
    startDate = db.DateTimeField(required=True)
    endDate = db.DateTimeField(required=True)
    text = db.StringField(max_length=512)
    createdAt = db.DateTimeField(required=True, default=datetime.datetime.now)


class WorkSchedule(db.Document):
    userName = db.StringField(max_length=64)
    userEmail = db.StringField(max_length=64, required=True)
    startDate = db.DateTimeField(required=True)
    endDate = db.DateTimeField(required=True)
    schedule = db.ListField(db.StringField(), required=True)
    createdAt = db.DateTimeField(required=True, default=datetime.datetime.now)


class Device(db.Document):
    userName = db.StringField(max_length=64, required=True)
    model = db.StringField(max_length=64)
    devMacId = db.StringField(max_length=64)
    said = db.StringField(max_length=64)
    serial = db.IntField()
    otv = db.IntField()
    msg = db.StringField(max_length=128)
    createdAt = db.DateTimeField(required=True, default=datetime.datetime.now)
