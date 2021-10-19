
from flask import Blueprint, request, session, render_template, jsonify, flash
from werkzeug.utils import redirect
import sys
import os
from controllers import userController
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

loginbp = Blueprint('login', __name__, url_prefix='/')


@loginbp.route('/', methods=['GET'])
def index():
    return render_template('Login/login.html')


@loginbp.route('/register', methods=['GET'])
def register():
    return render_template('Login/register.html')


@loginbp.route('/createUser', methods=['POST'])
def createUser():
    return userController.createUser(request), 201


@loginbp.route('/loginUser', methods=['POST'])
def loginUser():
    return userController.loginUser(request), 201


@loginbp.route('/logoutUser')
def logoutUser():
    userController.loginUser(request)
    return render_template('Login/login.html')
