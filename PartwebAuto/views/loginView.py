
from flask import Blueprint, request, render_template, jsonify, flash
from werkzeug.utils import redirect
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


loginbp = Blueprint('login', __name__, url_prefix='/')


@loginbp.route('/', methods=['GET'])
def index():
    return render_template('Login/login.html')


@loginbp.route('/register', methods=['GET'])
def register():
    return render_template('Login/register.html')
