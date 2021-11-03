# import sys
# import os
# import bcrypt
# from flask import jsonify, session, make_response

# from PartwebAuto.models.models import Admin

# sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))


# def getAllAdmins():
#     allAdmins = Admin.objects()

#     for val in allAdmins:
#         print(val['userName'])

#     if(allAdmins == None):
#         return 0

#     return allAdmins


# def getAdmin(request):
#     admin = Admin.objects(userEmail=request.args.get('userEmail')).first()
#     if(admin == None):
#         return make_response(jsonify({'result': "empty"}), 500)

#     return make_response(jsonify(admin), 201)


# def insertAdmin(request):
#     body = request.get_json()
#     admin = Admin(**body)

#     # 있으면 update, 없으면 Insert
#     existAdmin = Admin.objects(userEmail=admin['userEmail']).first()

#     if(existAdmin == None):
#         return make_response(jsonify(admin.save()), 201)
#     else:
#         return make_response(jsonify(existAdmin.update(**body)), 201)
