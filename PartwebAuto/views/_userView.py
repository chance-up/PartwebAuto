from flask import Blueprint, request, render_template, jsonify, flash
import sys
import os

from PartwebAuto.models.models import User
from PartwebAuto.controllers.userController import *
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


userbp = Blueprint('user', __name__, url_prefix='/')


@userbp.route('/getUsers', methods=['GET'])
def getUsers():
    users = User.objects()
    return jsonify(users), 200


@userbp.route('/getUser/<id>', methods=['GET'])
def getUser(id: str):
    user = User.objects(id=id).first()
    return jsonify(user), 200


@userbp.route('/insertUser', methods=['POST'])
def insertUser():
    print("insert User Execute")

    result = checkUser(request)

    print(result)

    if result == -1:
        flash("이미 등록된 사용자 이메일입니다.")
        return render_template('Login/register.html')

    if result == -2:
        flash("이미 등록된 사용자 이름입니다.")
        return render_template('Login/register.html')

    if result == -3:
        flash("비밀번호를 확인해주세요")
        return render_template('Login/register.html')

    return render_template('Login/register.html')
