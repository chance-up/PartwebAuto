import sys
import os
import bcrypt


from PartwebAuto.models.models import User

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


# 회원가입 - 유저 Email,Name 검증
def checkUserValid(request):
    body = request.get_json()
    user = User(**body)

    # step 1 : Validate that a "userEmail" exists
    if len(User.objects(userEmail__exact=user.userEmail)):
        return -1

    # step 2 : Validate that a "userName" exists
    if len(User.objects(userName__exact=user.userName)):
        return -2

    return 0


# 회원가입 - 유저 삽입
def insertUser(request):
    body = request.get_json()
    user = User(**body)
    hashPassword = bcrypt.hashpw(
        user.password.encode('utf-8'), bcrypt.gensalt())
    user.password = hashPassword
    user.save()
    return user


# 로그인 - 유저 검증
def checkUser(request):
    body = request.get_json()
    loginUser = User(**body)

    dbUser = User.objects(userEmail__exact=loginUser.userEmail)
    # step 1 : Validate that a "userEmail" not exists
    if not len(dbUser):
        return -1

    # step 2 : Validate password
    loginPassword = loginUser.password
    dbPassword = dbUser[0].password
    if (bcrypt.checkpw(loginPassword.encode('utf-8'), dbPassword)) == False:
        return -2

    return 0
