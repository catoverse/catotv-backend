import os
class Config(object):
    DEBUG = False
    TESTING = False


class DevelopmentConfig(Config):
    DEBUG = True
    DEVELOPMENT = True
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_DATABASE = os.getenv("DB_DATABASE")
    DB_PORT = '3306'

    MQ_BROKER_ADDRESS = os.getenv("MQ_BROKER_ADDRESS")
    MQ_PORT = os.getenv("MQ_PORT")
    MQ_USER = os.getenv("MQ_USER")
    MQ_PASSWORD = os.getenv("MQ_PASSWORD")


class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
