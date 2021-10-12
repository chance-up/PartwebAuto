from flask import Blueprint, request, render_template, jsonify
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

workAdminbp = Blueprint('workAdmin', __name__, url_prefix='/')


@workAdminbp.route('/workAdmin', methods=['GET'])
def workAdmin():
    if request.method == 'GET':
        return render_template('html/workAdmin.html')
