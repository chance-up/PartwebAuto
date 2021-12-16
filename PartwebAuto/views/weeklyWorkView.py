from flask import Blueprint, request, render_template, jsonify, session
import sys
import os
from flask.views import MethodView
from PartwebAuto.decorators import decorator
from PartwebAuto.controllers import weeklyWorkController

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

weeklyWorkbp = Blueprint('weeklyWork', __name__, url_prefix='/')


class WeeklyWorkView(MethodView):
    decorators = [
        decorator.login_required,
        decorator.admin_required(1)
    ]

    def get(self):
        return render_template('html/weeklyWork.html')

    def post(self):
        return weeklyWorkController.refreshWeeklyWork(request)

    def put(self):
        return weeklyWorkController.saveWeeklyWork(request)


weeklyWorkbp.add_url_rule(
    '/weeklyWork', view_func=WeeklyWorkView.as_view("WeeklyWorkView"))


# class WeeklyWorksView(MethodView):
#     decorators = [
#         decorator.login_required,
#         decorator.admin_required(1)
#     ]

#     def get(self):
#         return weeklyWorkController.getWeeklyWorks(request)
#         # return render_template('html/weeklyWork.html')

#     # def post(self):
#     #     return weeklyWorkController.refreshWeeklyWork(request)

#     # def put(self):
#     #     return weeklyWorkController.saveWeeklyWork(request)


# weeklyWorkbp.add_url_rule(
#     '/weeklyWorks', view_func=WeeklyWorksView.as_view("WeeklyWorksView"))
