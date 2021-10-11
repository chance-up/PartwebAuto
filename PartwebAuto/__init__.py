
from flask import Flask
from flask_mongoengine import MongoEngine
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

db = MongoEngine()


def create_app():
    def setting_blueprint():
        from .views import loginView
        app.register_blueprint(loginView.loginbp)

    def setting_database():
        # 추후 개발환경 따라 나눌 예정
        app.config['MONGODB_SETTINGS'] = {
            'db': 'testmongo',
            'host': 'localhost',
            'port': 27017
        }
        db.init_app(app)

    app = Flask(__name__)
    setting_blueprint()
    setting_database()

    return app
