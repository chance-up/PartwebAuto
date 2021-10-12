from flask import Blueprint, request, render_template, jsonify
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

devicebp = Blueprint('device', __name__, url_prefix='/')


@devicebp.route('/device', methods=['GET', 'PUT', 'POSt', 'DELETE'])
def device():
    if request.method == 'GET':
        return render_template('html/device.html')
    else:
        content = request.get_json()
        print('method : ' + str(request.method))
        print('name : ' + str(content['userName']))
        print('serial : ' + str(content['serial']))
        print('msg : ' + str(content['msg']))
        print('model : ' + str(content['model']))
        print('devMacId : ' + str(content['devMacId']))
        print('said : ' + str(content['said']))
        print('otv : ' + str(content['otv']))

        return jsonify(
            username="g.user.username",
            email="g.user.email",
            id="g.user.id"
        )
