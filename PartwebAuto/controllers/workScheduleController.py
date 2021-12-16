import sys
import os
from PartwebAuto.models.models import WorkSchedule
from flask import jsonify, session, make_response
from controllers import userController
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

# 재택일정 저장


def saveWorkSchedule(request):
    body = request.get_json()
    workSchedule = WorkSchedule(**body)
    workSchedule['userEmail'] = session['userEmail']
    workSchedule['userName'] = userController.getUserName(session['userEmail'])

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

    if(dbWorkSchedule == None):
        return make_response(jsonify({'result': 'empty'}), 201)

    return make_response(jsonify(dbWorkSchedule), 201)


def getWorkSchedules(request):
    print(request.args.get('startDate'))
    workSchedules = WorkSchedule.objects(
        startDate=request.args.get('startDate'))
    print(workSchedules)
    if(workSchedules == None):
        return make_response(jsonify({'result': "empty"}), 500)

    # for val in workSchedules:
    #     print(val['userName'])
    #     print(val['userEmail'])
    #     print(val['startDate'])
    #     print(val['endDate'])
    #     print(val['text'])

    return make_response(jsonify(workSchedules), 201)
