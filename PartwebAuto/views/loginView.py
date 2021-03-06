
from flask import Blueprint, request, render_template
from flask.views import MethodView
import sys
import os
from PartwebAuto.controllers import userController
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

loginbp = Blueprint('login', __name__, url_prefix='/')


@loginbp.route('/', methods=['GET'])
@loginbp.route('/login/', methods=['GET'])
def index():
    return render_template('Login/login.html')


@loginbp.route('/register', methods=['GET'])
def register():
    return render_template('Login/register.html')


@loginbp.route('/createUser', methods=['POST'])
def createUser():
    return userController.createUser(request)


@loginbp.route('/loginUser', methods=['POST'])
def loginUser():
    return userController.loginUser(request)


@loginbp.route('/logoutUser')
def logoutUser():
    userController.logoutUser(request)
    return render_template('Login/login.html')
