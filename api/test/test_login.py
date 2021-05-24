import json
import pymongo
from flask_jwt_extended import (decode_token)

def test_login_user_success(app,client,mongo):
    assert list([mongo.db.user.find_one({"username":"abc111"})])[0] !=None
    res = client.post('/login', json=dict(
        username="abc111",
        password="abc111"
    ))
    print(json.loads(res.data))
    assert res.status_code == 204
    assert "success" in json.loads(res.data)
    assert dict(json.loads(res.data))["success"] == True
    
    


def test_login_error(app,client,mongo):
    
    assert list([mongo.db.user.find_one({"username":"jjj"})])[0] == None
    res = client.post('/login', json=dict(
        username="jjj",
        password="abc111"
    ))
    assert res.status_code == 401
    expected = {'success': False, 'message': 'invalid username or password'}
    assert expected == json.loads(res.data)


