import json
import pymongo
import requests
from io import BytesIO

def test_retrieve_success(app,client,mongo):

    assert list([mongo.db.user.find_one({"username":"abc111"})])[0] !=None
    res = client.post('/login', json=dict(
        username="abc111",
        password="abc111"
    ))
    
    token = json.loads(res.data)["data"]["token"]
    assert res.status_code == 200
    assert "success" in json.loads(res.data)
    assert dict(json.loads(res.data))["success"] == True

    res_retrieve= client.get('/retrieve_filename', headers= { "Authorization": f"Bearer {token}"} )
    
    assert res_retrieve.status_code == 200
    assert "success" in json.loads(res_retrieve.data)
    assert dict(json.loads(res_retrieve.data))["success"] == True
    assert isinstance(dict(json.loads(res_retrieve.data))["data"],list) == True

    loaded = dict(json.loads(res_retrieve.data))["data"]
    res_retrieve_file = client.get(f'/retrieve/{loaded[0]["filename"]}', headers= { "Authorization": f"Bearer {token}"} )

    assert res_retrieve_file.status_code == 200
    assert res_retrieve_file.data != None



    