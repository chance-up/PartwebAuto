from flask import Blueprint, request, render_template, jsonify
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

weeklyWorkbp = Blueprint('weeklyWork', __name__, url_prefix='/')


@weeklyWorkbp.route('/weeklyWork', methods=['GET'])
def weeklyWork():
    if request.method == 'GET':
        return render_template('html/weeklyWork.html')
