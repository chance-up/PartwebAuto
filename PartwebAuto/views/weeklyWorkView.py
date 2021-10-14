from flask import Blueprint, request, render_template, jsonify, session
import sys
import os
from PartwebAuto.decorators import decorator
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

weeklyWorkbp = Blueprint('weeklyWork', __name__, url_prefix='/')


@weeklyWorkbp.route('/weeklyWork', methods=['GET'])
@decorator.login_required
def weeklyWork():
    # print(session['userEmail'])
    return render_template('html/weeklyWork.html')
