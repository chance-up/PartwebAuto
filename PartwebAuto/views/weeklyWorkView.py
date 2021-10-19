from flask import Blueprint, request, render_template, jsonify, session
import sys
import os
from PartwebAuto.decorators import decorator
from controllers import weeklyWorkController

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

weeklyWorkbp = Blueprint('weeklyWork', __name__, url_prefix='/')


@weeklyWorkbp.route('/weeklyWork', methods=['GET'])
@decorator.login_required
def weeklyWork():
    return render_template('html/weeklyWork.html')


@weeklyWorkbp.route('/refreshWeeklyWork', methods=['POST'])
def refreshWeeklyWork():
    return weeklyWorkController.refreshWeeklyWork(request), 201


@weeklyWorkbp.route('/saveWeeklyWork', methods=['POST'])
def saveWeeklyWork():
    return weeklyWorkController.saveWeeklyWork(request), 201
