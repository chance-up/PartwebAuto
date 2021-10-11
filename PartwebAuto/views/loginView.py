
from flask import Blueprint, request, render_template, jsonify
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


loginbp = Blueprint('main', __name__, url_prefix='/')


@loginbp.route('/', methods=['GET'])
def login():
    if request.method == 'GET':
        return render_template('Login/login.html')


@loginbp.route('/register', methods=['GET'])
def Register():
    if request.method == 'GET':
        return render_template('Login/register.html')


@loginbp.route('/test', methods=['GET', 'POST'])
def testGet():
    if request.method == 'GET':
        return jsonify(
            username="g.user.username",
            email="g.user.email",
            id="g.user.id"
        )

    else:
        content = request.get_json()

        print('func : ' + str(content['func']))
        print('name : ' + str(content['name']))
        print('otv : ' + str(content['otv']))
        print('serial : ' + str(content['serial']))
        print('model : ' + str(content['model']))
        print('msg : ' + str(content['msg']))
        print('mac : ' + str(content['mac']))
        print('said : ' + str(content['said']))
        print('func : ' + str(content['func']))

        return jsonify(
            username="g.user.username",
            email="g.user.email",
            id="g.user.id"
        )
