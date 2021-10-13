import os


class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.environ.get("SECRET_KEY")
    BCRYPT_LEVEL = os.environ.get("BCRYPT_LEVEL")


class ProductionConfig(Config):
    MESSAGE = 'Product'


class DevelopmentConfig(Config):
    DEBUG = True
    MESSAGE = 'Development'
