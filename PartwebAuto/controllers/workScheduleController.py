import sys
import os
from PartwebAuto.models.models import WorkSchedule
from flask import jsonify, session, make_response
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

# 재택일정 저장


def saveWorkSchedule(request):
    body = request.get_json()
    workSchedule = WorkSchedule(**body)
    workSchedule['userEmail'] = session['userEmail']

    dbWorkSchedule = WorkSchedule.objects(
        startDate=workSchedule.startDate, userEmail=session['userEmail']).first()

    if(dbWorkSchedule == None):
        return make_response(jsonify(workSchedule.save()), 201)
    else:
        return make_response(jsonify(dbWorkSchedule.update(**body)), 201)

  


def refreshWorkSchedule(request):
    body = request.get_json()
    workSchedule = WorkSchedule(**body)

    dbWorkSchedule = WorkSchedule.objects(
        startDate=workSchedule.startDate, userEmail=session['userEmail']).first()

    print(dbWorkSchedule)

    if(dbWorkSchedule == None):
        return make_response(jsonify({'result': 'empty'}), 500)

    return make_response(jsonify(dbWorkSchedule), 201)
    # selectedSchedule = request.get_json()

    # dbWorkSchedule = WorkSchedule.objects(userEmail=session['userEmail'], ).filter(
    #     date__gte=selectedSchedule['startDate'], date__lte=selectedSchedule['endDate'])

    # if(workSchedules.count() != 5):
    #     return make_response({'result': "fail", 'msg': "There is no schedule!"}, 500)

    # # 개인 주간보고 탭에서는 session에 userEmail이 저장되어 있으므로 값이 넘어오지 않음
    # if weeklyWork['userEmail'] == "":
    #     refreshedWeeklyWork = WeeklyWork.objects(
    #         startDate=weeklyWork.startDate, userEmail=session['userEmail']).first()
    # # 관리자 탭에서는 어떤 유저인지 넘어와야 함.
    # else:
    #     refreshedWeeklyWork = WeeklyWork.objects(
    #         startDate=weeklyWork.startDate, userEmail=weeklyWork['userEmail']).first()

    # if(refreshedWeeklyWork == None):
    #     return jsonify({'result': "empty"})

    # return make_response(jsonify(refreshedWeeklyWork), 201)
