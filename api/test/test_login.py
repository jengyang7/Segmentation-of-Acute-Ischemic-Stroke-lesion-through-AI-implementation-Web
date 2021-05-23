import json
import pymongo
from flask_jwt_extended import (decode_token)

def test_login_user_success(app,client,mongo):
    assert list([mongo.db.user.find_one({"username":"abc111"})])[0] !=None
    res = client.post('/login', json=dict(
        username="abc111",
        password="abc111"
    ))
    
    expected = decode_token(dict(json.loads(res.data))["data"]["token"])
    assert res.status_code == 200
    assert "success" in json.loads(res.data)
    assert dict(json.loads(res.data))["success"] == True
    assert expected["identity"]["username"] == "abc111"
    assert expected["identity"]["password"] == "abc111"


def test_loginl(app,client,mongo):
    
    assert list([mongo.db.user.find_one({"username":"jjj"})])[0] == None
    res = client.post('/login', json=dict(
        username="jjj",
        password="abc111"
    ))
    assert res.status_code == 401
    expected = {'success': False, 'message': 'invalid username or password'}
    assert expected == json.loads(res.data)


# def test_register_user(app,client):
#     res = client.post('/register', json=dict(
#         username="km",
#         password="x",
#         email="x@gmail.com"
#     ))
#     assert res.status_code == 400
#     expected = {'success': False, 'message': 'User already exist '}
#     assert expected == json.loads(res.data)

