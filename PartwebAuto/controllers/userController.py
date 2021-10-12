import sys
import os

from PartwebAuto.models.models import User

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


def checkUser(request):
    userEmail = request.form.get('userid')
    userName = request.form.get('username')
    password = request.form.get('password')
    confirmPassword = request.form.get('confirm_pw')
    print(len(User.objects(userEmail__exact=userEmail)))
    print(len(User.objects(userName__exact=userName)))
    print(password != confirmPassword)

    # result = User.objects(userEmail__exact=userEmail)

    # return result

    if len(User.objects(userEmail__exact=userEmail)):
        return -1

    if len(User.objects(userName__exact=userName)):
        return -2

    if password != confirmPassword:
        return -3

    return 0
