import sys
import os
from PartwebAuto.models.models import WorkSchedule
from flask import jsonify, session, make_response
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

# 재택일정 저장


def saveWorkSchedule(request):
    for saveWorkSchedule in request.get_json():
        body = saveWorkSchedule
        workSchedule = WorkSchedule(**body)
        workSchedule.userEmail = session['userEmail']
        workSchedule.save()

    return make_response(jsonify({'result': "success"}), 201)


def refreshWorkSchedule(request):
    selectedSchedule = request.get_json()
    workSchedules = WorkSchedule.objects(userEmail=session['userEmail']).filter(
        date__gte=selectedSchedule['startDate'], date__lte=selectedSchedule['endDate'])

    if(workSchedules.count() != 5):
        return make_response({'result': "fail", 'msg': "There is no schedule!"}, 500)

    print(workSchedules.count())
    return make_response(jsonify(workSchedules), 201)
