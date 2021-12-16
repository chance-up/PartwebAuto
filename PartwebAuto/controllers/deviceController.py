import sys
import os
import bcrypt
from flask import jsonify, session, make_response

from PartwebAuto.models.models import Device

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


def getAllDevices():
    allDevice = Device.objects()

    if(allDevice == None):
        return 0

    return allDevice


def getDevice(request):
    device = Device.objects(devMacId=request.args.get('devMacId')).first()
    if(device == None):
        return make_response(jsonify({'result': "empty"}), 500)

    return make_response(jsonify(device), 201)


def getDevices(request):
    devices = Device.objects(userName=request.args.get('userName'))
    if(devices == None):
        return make_response(jsonify({'result': "empty"}), 500)

    return make_response(jsonify(devices), 201)


def insertDevice(request):
    body = request.get_json()
    device = Device(**body)

    # 있으면 update, 없으면 Insert
    existDevice = Device.objects(devMacId=device['devMacId']).first()

    if(existDevice == None):
        return make_response(jsonify(device.save()), 201)
    else:
        return make_response(jsonify(existDevice.update(**body)), 201)


def deleteDevice(request):
    body = request.get_json()
    device = Device(**body)
    deleteDevice = Device.objects(devMacId=device['devMacId']).first()
    if(device == None):
        return make_response(jsonify({'result': "empty"}), 500)

    return make_response(jsonify(deleteDevice.delete()), 201)


def dmUpdateDevice(request):
    body = request.get_json()
    device = Device(**body)

    print(device.userName)
    print(device.devMacId)
    print(device.model)

    # 있으면 update, 없으면 Insert
    existDevice = Device.objects(devMacId=device['devMacId']).first()

    if(existDevice == None):
        return make_response(jsonify(device.save()), 201)
    else:
        return make_response(jsonify(existDevice.update(**body)), 201)
