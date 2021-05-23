import json
import pymongo


def test_register_user_success(app,client,mongo):
    mongo.db.user.delete_many({"username":"abc","email":"abc@gmail.com"})
    res = client.post('/register', json=dict(
        username="abc",
        password="abc",
        email="abc@gmail.com"
    ))
    assert res.status_code == 200
    expected = {'success': True, 'message': 'User created successfully!'}
    assert expected == json.loads(res.data)
    assert len(list([mongo.db.user.find_one({"username":"abc","email":"abc@gmail.com"})])) ==1
    assert mongo.db.user.delete_one({"username":"abc","email":"abc@gmail.com"}).deleted_count == 1

def test_register_email(app,client):
    res = client.post('/register', json=dict(
        username="x",
        password="x",
        email="kongman998@gmail.com"
    ))
    assert res.status_code == 400
    expected = {'success': False, 'message': 'Email already exist '}
    assert expected == json.loads(res.data)

def test_register_user(app,client):
    res = client.post('/register', json=dict(
        username="km",
        password="x",
        email="x@gmail.com"
    ))
    assert res.status_code == 400
    expected = {'success': False, 'message': 'User already exist '}
    assert expected == json.loads(res.data)

