from functools import wraps
from flask import redirect, session, flash
from PartwebAuto.controllers import userController


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "userEmail" not in session:
            flash("로그인이  필요한  서비스  입니다.")
            return redirect('/')
        return f(*args, **kwargs)

    return decorated


def admin_required(param):
    def wrapper(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            adminLevel = userController.getAdminLevel(session['userEmail'])
            print("adminLevel : "+str(adminLevel))
            print("param : "+str(param))

            if adminLevel < param:
                flash("권한이 없습니다. 관리자에게 문의하세요.")
                return redirect('/first')

            return f(*args, **kwargs)
        return decorated
    return wrapper
