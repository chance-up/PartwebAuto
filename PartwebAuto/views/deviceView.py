
from flask import Blueprint, request, render_template, jsonify
import sys
import os
from PartwebAuto.controllers import deviceController
from PartwebAuto.decorators import decorator
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
devicebp = Blueprint('device', __name__, url_prefix='/')


@devicebp.route('/device', methods=['GET'])
@decorator.login_required
@decorator.admin_required(1)
def device():
    if request.method == 'GET':
        return render_template('html/device.html', allDevices=deviceController.getAllDevices())


@devicebp.route('/getDevice', methods=['GET'])
def getDevice():
    return deviceController.getDevice(request)


@devicebp.route('/getDevices', methods=['GET'])
def getDevices():
    return deviceController.getDevices(request)


@devicebp.route('/insertDevice', methods=['POST'])
def insertDevice():
    return deviceController.insertDevice(request)


@devicebp.route('/deleteDevice', methods=['POST'])
def deleteDevice():
    return deviceController.deleteDevice(request)


# @devicebp.route('/device', methods=['GET', 'PUT', 'POSt', 'DELETE'])
# def device():
#     if request.method == 'GET':
#         return render_template('html/device.html')
#     else:
#         content = request.get_json()
#         print('method : ' + str(request.method))
#         print('name : ' + str(content['userName']))
#         print('serial : ' + str(content['serial']))
#         print('msg : ' + str(content['msg']))
#         print('model : ' + str(content['model']))
#         print('devMacId : ' + str(content['devMacId']))
#         print('said : ' + str(content['said']))
#         print('otv : ' + str(content['otv']))

#         return jsonify(
#             username="g.user.username",
#             email="g.user.email",
#             id="g.user.id"
#         )
