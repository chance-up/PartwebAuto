from flask import Blueprint, request, render_template, jsonify, session
import sys
import os
from PartwebAuto.decorators import decorator
from PartwebAuto.controllers import weeklyWorkController

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

weeklyWorkbp = Blueprint('weeklyWork', __name__, url_prefix='/')


@weeklyWorkbp.route('/weeklyWork', methods=['GET'])
@decorator.login_required
@decorator.admin_required(1)
def weeklyWork():
    return render_template('html/weeklyWork.html')


@weeklyWorkbp.route('/refreshWeeklyWork', methods=['POST'])
@decorator.login_required
def refreshWeeklyWork():
    return weeklyWorkController.refreshWeeklyWork(request)


@weeklyWorkbp.route('/saveWeeklyWork', methods=['POST'])
def saveWeeklyWork():
    return weeklyWorkController.saveWeeklyWork(request)
