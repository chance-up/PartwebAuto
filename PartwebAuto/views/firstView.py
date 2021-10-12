from flask import Blueprint, request, render_template, jsonify
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

firstbp = Blueprint('first', __name__, url_prefix='/')


@firstbp.route('/first', methods=['GET'])
def first():
    if request.method == 'GET':
        return render_template('html/first.html')
