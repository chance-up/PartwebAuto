from flask import Flask
from flask_mongoengine import MongoEngine
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

db = MongoEngine()


def create_app():
    def setting_blueprint():
        from .views import adminView, deviceView, firstView, loginView, weeklyWorkView, workScheduleView

        app.register_blueprint(adminView.adminbp)
        app.register_blueprint(deviceView.devicebp)
        app.register_blueprint(firstView.firstbp)
        app.register_blueprint(loginView.loginbp)
        app.register_blueprint(weeklyWorkView.weeklyWorkbp)
        app.register_blueprint(workScheduleView.workSchedulebp)

    def setting_database():
        # 추후 개발환경 따라 나눌 예정
        app.config['MONGODB_SETTINGS'] = {
            'db': os.environ.get("MONGO_COLLECTION_NAME"),
            'host':  os.environ.get("MONGO_HOST"),
            'port':  int(os.environ.get("MONGO_PORT"))
        }
        #app.config['MONGODB_SETTINGS'] = os.environ.get("MONGODB_SETTINGS")
        db.init_app(app)

    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
    app.config['BCRYPT_LEVEL'] = os.environ.get("BCRYPT_LEVEL")
    setting_blueprint()
    setting_database()

    return app
