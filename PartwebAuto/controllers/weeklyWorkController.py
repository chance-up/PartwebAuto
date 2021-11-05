import sys
import os
from PartwebAuto.models.models import WeeklyWork
from flask import jsonify, session, make_response

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

# 주간보고 저장


def saveWeeklyWork(request):
    body = request.get_json()
    weeklyWork = WeeklyWork(**body)
    weeklyWork['userEmail'] = session['userEmail']

    dbWeeklyWork = WeeklyWork.objects(
        startDate=weeklyWork.startDate, userEmail=session['userEmail']).first()

    if(dbWeeklyWork == None):
        return make_response(jsonify(weeklyWork.save()), 201)
    else:
        return make_response(jsonify(dbWeeklyWork.update(**body)), 201)


# 주간보고 불러오기
def refreshWeeklyWork(request):
    body = request.get_json()
    weeklyWork = WeeklyWork(**body)

    # 개인 주간보고 탭에서는 session에 userEmail이 저장되어 있으므로 값이 넘어오지 않음
    if weeklyWork['userEmail'] == "":
        refreshedWeeklyWork = WeeklyWork.objects(
            startDate=weeklyWork.startDate, userEmail=session['userEmail']).first()
    # 관리자 탭에서는 어떤 유저인지 넘어와야 함.
    else:
        refreshedWeeklyWork = WeeklyWork.objects(
            startDate=weeklyWork.startDate, userEmail=weeklyWork['userEmail']).first()

    if(refreshedWeeklyWork == None):
        return jsonify({'result': "empty"})

    return make_response(jsonify(refreshedWeeklyWork), 201)
