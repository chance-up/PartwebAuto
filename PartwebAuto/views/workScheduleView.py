from flask import Blueprint, request, render_template, jsonify
import sys
import os
from PartwebAuto.decorators import decorator
from PartwebAuto.controllers import workScheduleController
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

workSchedulebp = Blueprint('workSchedule', __name__, url_prefix='/')


@workSchedulebp.route('/workSchedule', methods=['GET'])
@decorator.login_required
def workSchedule():
    if request.method == 'GET':
        return render_template('html/workSchedule.html')


@workSchedulebp.route('/saveWorkSchedule', methods=['POST'])
def saveWorkSchedule():
    return workScheduleController.saveWorkSchedule(request)


@workSchedulebp.route('/refreshWorkSchedule', methods=['POST'])
def refreshWorkSchedule():
    return workScheduleController.refreshWorkSchedule(request)
