from functools import wraps
from flask import redirect, session, flash


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "userEmail" not in session:
            flash("로그인이  필요한  서비스  입니다.")
            return redirect('/')
        return f(*args, **kwargs)

    return decorated
