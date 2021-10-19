import sys
import os
import bcrypt
from flask import jsonify, session

from PartwebAuto.models.models import User

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


def logoutUser(request):
    session.pop('userEmail', None)
    return 0


def loginUser(request):
    checkResult = checkUser(request)
    if checkResult == -1 or checkResult == -2:
        return {'result': "fail", 'msg': "id or password check fail!"}

    # add 'userEmail' in session
    body = request.get_json()
    loginUser = User(**body)
    session['userEmail'] = loginUser.userEmail
    return jsonify({'result': "success"})


def createUser(request):
    checkValidResult = checkUserValid(request)
    if checkValidResult == -1:
        return jsonify({'result': "fail", 'msg': "user email check fail!"})

    if checkValidResult == -2:
        return jsonify({'result': "fail", 'msg': "user name check fail!"})

    user = insertUser(request)

    return jsonify(user)


def checkUserValid(request):
    body = request.get_json()
    user = User(**body)

    # step 1 : Validate that a "userEmail" exists
    if len(User.objects(userEmail__exact=user.userEmail)):
        return -1

    # step 2 : Validate that a "userName" exists
    if len(User.objects(userName__exact=user.userName)):
        return -2

    return 0


def insertUser(request):
    body = request.get_json()
    user = User(**body)
    hashPassword = bcrypt.hashpw(
        user.password.encode('utf-8'), bcrypt.gensalt())
    user.password = hashPassword
    user.save()
    return user


def checkUser(request):
    body = request.get_json()
    loginUser = User(**body)

    dbUser = User.objects(userEmail__exact=loginUser.userEmail)
    # step 1 : Validate that a "userEmail" not exists
    if not len(dbUser):
        return -1

    # step 2 : Validate password
    loginPassword = loginUser.password
    dbPassword = dbUser[0].password
    if (bcrypt.checkpw(loginPassword.encode('utf-8'), dbPassword)) == False:
        return -2

    return 0
