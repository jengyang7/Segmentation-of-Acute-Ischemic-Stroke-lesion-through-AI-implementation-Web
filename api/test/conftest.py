import pytest
from api import app as flask_app
from api import mongo as flask_app_mongo

@pytest.fixture(scope='module')
def app():
    return flask_app

@pytest.fixture(scope='module')
def mongo():
    return flask_app_mongo


@pytest.fixture(scope='module')
def client(app):
    return app.test_client()

