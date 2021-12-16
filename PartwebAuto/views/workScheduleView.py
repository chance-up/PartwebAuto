from flask import Blueprint, request, render_template, jsonify
from flask.views import MethodView
import sys
import os
from PartwebAuto.decorators import decorator
from PartwebAuto.controllers import workScheduleController
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

workSchedulebp = Blueprint('workSchedule', __name__, url_prefix='/')


class workScheduleView(MethodView):
    decorators = [
        decorator.login_required,
        decorator.admin_required(1)
    ]

    def get(self):
        return render_template('html/workSchedule.html')

    def post(self):
        return workScheduleController.refreshWorkSchedule(request)

    def put(self):
        return workScheduleController.saveWorkSchedule(request)


workSchedulebp.add_url_rule(
    '/workSchedule', view_func=workScheduleView.as_view("workScheduleView"))


# @workSchedulebp.route('/workSchedule', methods=['GET'])
# @decorator.login_required
# @decorator.admin_required(1)
# def workSchedule():
#     if request.method == 'GET':
#         return render_template('html/workSchedule.html')


# @workSchedulebp.route('/saveWorkSchedule', methods=['POST'])
# def saveWorkSchedule():
#     return workScheduleController.saveWorkSchedule(request)


# @workSchedulebp.route('/refreshWorkSchedule', methods=['POST'])
# def refreshWorkSchedule():
#     return workScheduleController.refreshWorkSchedule(request)
