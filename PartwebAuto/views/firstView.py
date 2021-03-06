from flask import Blueprint, request, render_template, jsonify
import sys
import os
from PartwebAuto.decorators import decorator
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

firstbp = Blueprint('first', __name__, url_prefix='/first')


@firstbp.route('/', methods=['GET'])
@decorator.login_required
def first():
    if request.method == 'GET':
        return render_template('html/first.html')
