import sys
import os
from PartwebAuto.models.models import WeeklyWork
from flask import jsonify, session

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

# 주간보고 저장 - 유저 삽입


def saveWeeklyWork(request):
    body = request.get_json()
    weeklyWork = WeeklyWork(**body)
    weeklyWork.userEmail = session['userEmail']
    weeklyWork.save()
    print(weeklyWork.startDate)
    print(weeklyWork.endDate)
    print(weeklyWork.text)
    return jsonify(weeklyWork)


def refreshWeeklyWork(request):
    body = request.get_json()
    weeklyWork = WeeklyWork(**body)
    refreshedWeeklyWork = WeeklyWork.objects(
        startDate=weeklyWork.startDate).first()

    if(refreshedWeeklyWork == None):
        return jsonify({'result': "empty"})

    return jsonify(refreshedWeeklyWork)
