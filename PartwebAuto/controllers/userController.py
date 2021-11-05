import sys
import os
import bcrypt
from flask import jsonify, session, make_response

from PartwebAuto.models.models import User

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


def logoutUser(request):
    session.pop('userEmail', None)
    return 0


def loginUser(request):
    checkResult = checkUser(request)
    print(checkResult)
    if checkResult == -1 or checkResult == -2:
        return make_response({'result': "fail", 'msg': "id or password check fail!"}, 500)

    # add 'userEmail' in session
    body = request.get_json()
    loginUser = User(**body)
    session['userEmail'] = loginUser.userEmail
    return make_response(jsonify({'result': "success"}), 201)


def createUser(request):
    checkValidResult = checkUserValid(request)
    if checkValidResult == -1:
        return make_response(jsonify({'result': "fail", 'msg': "user email already exist!"}), 500)

    if checkValidResult == -2:
        return make_response(jsonify({'result': "fail", 'msg': "user name already exist!"}), 500)

    user = insertUser(request)

    return make_response(jsonify(user), 201)


def checkUserValid(request):
    body = request.get_json()
    user = User(**body)

    # step 1 : Validate that a "userEmail" exists
    if User.objects(userEmail=user.userEmail).count() != 0:
        return -1

    # step 2 : Validate that a "userName" exists
    if User.objects(userName=user.userName).count() != 0:
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


def getAllUsers():
    allUser = User.objects()

    if(allUser == None):
        return 0

    return allUser


def getAdminLevel(userEmail):
    dbUser = User.objects(userEmail=userEmail).first()
    print(userEmail)
    print(dbUser['userEmail'])

    if(dbUser['isAdmin'] == 0):
        print("not User")
    elif(dbUser['isAdmin'] == 1):
        print("normal User")
    else:
        print("admin user")

    return dbUser['isAdmin']


def setPermission(request):
    body = request.get_json()
    loginUser = User(**body)
    dbUser = User.objects(userEmail=loginUser.userEmail).first()
    dbUser.update(isAdmin=loginUser['isAdmin'])

    return make_response(jsonify(dbUser), 201)
