from flask import Blueprint, request, render_template, jsonify, flash

import sys
import os

from PartwebAuto.models.models import User
from PartwebAuto.controllers.userController import *
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

userbp = Blueprint('user', __name__, url_prefix='/')


# @userbp.route('/getUsers', methods=['GET'])
# def getUsers():
#     users = User.objects()
#     return jsonify(users), 200


# @userbp.route('/getUser/<id>', methods=['GET'])
# def getUser(id: str):
#     user = User.objects(userEmail=id).first()
#     return jsonify(user), 200


@userbp.route('/createUser', methods=['POST'])
def createUser():
    checkValidResult = checkUserValid(request)
    if checkValidResult == -1:
        return "이미 등록된 사용자 이메일입니다.", 400

    if checkValidResult == -2:
        return "이미 등록된 사용자 이름입니다.", 400

    user = insertUser(request)
    return jsonify(user), 201


@userbp.route('/loginUser', methods=['POST'])
def loginUser():
    checkResult = checkUser(request)
    if checkResult == -1 or checkResult == -2:
        return "이메일과 비밀번호를 확인하세요.", 400

    return jsonify({'result': "success"}), 200
