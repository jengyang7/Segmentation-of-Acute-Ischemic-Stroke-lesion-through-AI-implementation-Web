import json
import pymongo
import requests
from io import BytesIO
import time

def test_delete_success(app,client,mongo):

    assert list([mongo.db.user.find_one({"username":"abc111"})])[0] !=None
    res = client.post('/login', json=dict(
        username="abc111",
        password="abc111"
    ))
    
    token = json.loads(res.data)["data"]["token"]
    assert res.status_code == 200
    assert "success" in json.loads(res.data)
    assert dict(json.loads(res.data))["success"] == True

    file_dict = dict(file=(BytesIO(open("SMIR.Brain.XX.O.CT.345562.nii", "rb").read()),"SMIR.Brain.XX.O.CT.345562.nii"))
    res_upload = client.post('/upload', headers= { "Authorization": f"Bearer {token}","enctype":'multipart/form-data'}, data=file_dict )
    time.sleep(5)

    assert res_upload.status_code == 200
    assert "success" in json.loads(res_upload.data)
    assert dict(json.loads(res_upload.data))["success"] == True

    res = client.post('/delete/SMIR.Brain.XX.O.CT.345562.nii',headers= { "Authorization": f"Bearer {token}"})
    
    expected = {"success":True,"data":"File Deleted"}
    assert res.status_code == 200
    assert json.loads(res.data) == expected

def test_delete_fail(app,client,mongo):

    assert list([mongo.db.user.find_one({"username":"abc111"})])[0] !=None
    res = client.post('/login', json=dict(
        username="abc111",
        password="abc111"
    ))
    
    token = json.loads(res.data)["data"]["token"]
    assert res.status_code == 200
    assert "success" in json.loads(res.data)
    assert dict(json.loads(res.data))["success"] == True

    file_dict = dict(file=(BytesIO(open("SMIR.Brain.XX.O.CT.345562.nii", "rb").read()),"SMIR.Brain.XX.O.CT.345562.nii"))
    res_upload = client.post('/upload', headers= { "Authorization": f"Bearer {token}","enctype":'multipart/form-data'}, data=file_dict )
    time.sleep(5)

    assert res_upload.status_code == 200
    assert "success" in json.loads(res_upload.data)
    assert dict(json.loads(res_upload.data))["success"] == True

    res = client.post('/delete/SMIR.Brain.XX.O.CT.nii',headers= { "Authorization": f"Bearer {token}"})
    expected = {"success":False,"data":"File not found"}
    assert res_upload.status_code == 200
    assert json.loads(res.data) == expected