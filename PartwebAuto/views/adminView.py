from PartwebAuto.controllers import userController, weeklyWorkController, workScheduleController
from flask import Blueprint, request, render_template, jsonify, make_response
import sys
import os
from PartwebAuto.decorators import decorator
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
adminbp = Blueprint('admin', __name__, url_prefix='/admin')


@adminbp.route('/', methods=['GET'])
@decorator.login_required
@decorator.admin_required(2)
def admin():
    if request.method == 'GET':
        return render_template('html/admin.html', allUsers=userController.getAllUsers())


@adminbp.route('/setPermission', methods=['POST'])
def setPermission():
    return userController.setPermission(request)


@decorator.login_required
@decorator.admin_required(2)
@adminbp.route('/adminWeeklyWork', methods=['GET'])
def adminWeeklyWork():
    return render_template('html/adminWeeklyWork.html')


@adminbp.route('/getAdminWeeklyWorks', methods=['GET'])
def getAdminWeeklyWorks():
    return weeklyWorkController.getWeeklyWorks(request)


@adminbp.route('/getAdminAllUser', methods=['GET'])
def getAdminAllUser():
    return make_response(jsonify(userController.getAllUsers()), 201)


@decorator.login_required
@decorator.admin_required(2)
@adminbp.route('/adminWorkSchedule', methods=['GET'])
def adminWorkSchedule():
    return render_template('html/adminWorkSchedule.html')


@adminbp.route('/getAdminWorkSchedules', methods=['GET'])
def getAdminWorkSchedules():
    return workScheduleController.getWorkSchedules(request)
