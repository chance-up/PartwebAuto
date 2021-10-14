from flask import Blueprint, request, render_template, jsonify
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

adminbp = Blueprint('admin', __name__, url_prefix='/')


@adminbp.route('/admin', methods=['GET'])
def admin():
    if request.method == 'GET':
        return render_template('html/admin.html')


@adminbp.route('/test', methods=['GET'])
def admin1():
    if request.method == 'GET':
        return render_template('html/nav.html')
