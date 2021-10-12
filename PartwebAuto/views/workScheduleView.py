from flask import Blueprint, request, render_template, jsonify
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

workSchedulebp = Blueprint('workSchedule', __name__, url_prefix='/')


@workSchedulebp.route('/workSchedule', methods=['GET'])
def workSchedule():
    if request.method == 'GET':
        return render_template('html/workSchedule.html')
