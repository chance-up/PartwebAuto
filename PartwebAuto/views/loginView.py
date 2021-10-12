
from flask import Blueprint, request, render_template, jsonify, flash
from werkzeug.utils import redirect
import sys
import os

#from PartwebAuto.models.models import User
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


loginbp = Blueprint('login', __name__, url_prefix='/')


@loginbp.route('/', methods=['GET'])
def index():
    return render_template('Login/login.html')

    # islogined = users.check_user(userid, password)
    # if islogined == 0:
    #     flash("등록 된 아이디가 없습니다.")
    #     return render_template('Login/login.html')
    # elif islogined == 1:
    #     flash("비밀번호가 일치하지 않습니다. 확인해주세요 : )")
    #     return render_template('Login/login.html')


@loginbp.route('/login', methods=['POST'])
def login():
    userid = request.form.get('id')
    password = request.form.get('password')
    print('userid : ' + userid)
    print('password : ' + password)
    islogined = 2
    if islogined == 0:
        print('등록 된 아이디가 없습니다.')
        return render_template('Login/login.html')
    elif islogined == 1:
        print('비밀번호가 일치하지 않습니다. 확인해주세요 : )')
        return render_template('Login/login.html')
    return redirect('/first')


@loginbp.route('/register', methods=['GET'])
def register():
    if request.method == 'GET':
        return render_template('Login/register.html')
