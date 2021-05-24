import json
import pymongo
import requests
from io import BytesIO

def test_upload_success(app,client,mongo):

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
    print(res_upload.data)

    assert res_upload.status_code == 200
    assert "success" in json.loads(res_upload.data)
    assert dict(json.loads(res_upload.data))["success"] == True

    assert list(mongo.db.fs.files.find_one({"filename":"SMIR.Brain.XX.O.CT.345562.nii","username":"abc111"})) != None
    assert len(list(mongo.db.fs.files.find_one({"filename":"SMIR.Brain.XX.O.CT.345562.nii","username":"abc111"}))) >= 1
    assert mongo.db.fs.files.delete_many({"filename":"SMIR.Brain.XX.O.CT.345562.nii","username":"abc111"}).deleted_count >= 1

