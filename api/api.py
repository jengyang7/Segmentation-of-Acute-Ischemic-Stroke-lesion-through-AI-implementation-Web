import time
import json
from flask import Flask, request
import bcrypt

app = Flask(__name__)
db = {}

def verify_password(password, hash_from_database):
    password_bytes = password.encode()
    hash_bytes = hash_from_database.encode()
    does_match = bcrypt.checkpw(password_bytes, hash_bytes)
    return does_match


@app.route('/login', methods = ["POST"])
def login():
    data = json.loads(request.data)
    print(data["username"],data["password"])
    if data["username"] in db:
        if verify_password(data["password"], db[data["username"]]) :
            print("SUCCESS")
            return {"success":True}
    print("FAILED")
    return {"success":False}

@app.route('/register', methods = ["POST"])
def register():
    print(request.data)
    data = json.loads(request.data)
    print(data["username"],data["password"])
    if data["username"] not in db:
        db[data["username"]] = data["password"]
        print("success")
        return {"success":True } 
    print("failed")
    return {"success":False} 

@app.route('/upload', methods = ["POST"])
def upload():
    return {"success":True} 

