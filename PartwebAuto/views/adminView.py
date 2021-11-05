from PartwebAuto.controllers import userController
from flask import Blueprint, request, render_template, jsonify
import sys
import os
from PartwebAuto.decorators import decorator
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
adminbp = Blueprint('admin', __name__, url_prefix='/')


@adminbp.route('/admin', methods=['GET'])
@decorator.login_required
@decorator.admin_required(2)
def admin():
    if request.method == 'GET':
        return render_template('html/admin.html', allUsers=userController.getAllUsers())


@adminbp.route('/setPermission', methods=['POST'])
def setPermission():
    return userController.setPermission(request)
