import sys
import os
from PartwebAuto.models.models import WeeklyWork
from flask import jsonify, session, make_response
from controllers import userController

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

# 주간보고 저장


def saveWeeklyWork(request):
    body = request.get_json()
    weeklyWork = WeeklyWork(**body)
    weeklyWork['userEmail'] = session['userEmail']
    weeklyWork['userName'] = userController.getUserName(session['userEmail'])

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
        return make_response(jsonify({'result': "empty"}), 201)

    return make_response(jsonify(refreshedWeeklyWork), 201)


def getWeeklyWorks(request):
    print(request.args.get('startDate'))
    weeklyWorks = WeeklyWork.objects(startDate=request.args.get('startDate'))
    print(weeklyWorks)
    if(weeklyWorks == None):
        return make_response(jsonify({'result': "empty"}), 500)

    for val in weeklyWorks:
        print(val['userName'])
        print(val['userEmail'])
        print(val['startDate'])
        print(val['endDate'])
        print(val['text'])

    return make_response(jsonify(weeklyWorks), 201)
