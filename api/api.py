import time
import json
from flask import Flask, request

app = Flask(__name__)
db = {}

@app.route('/home')
def get_current_time():
    return {'time': time.time()}

@app.route('/login', methods = ["POST"])
def login():
    data = json.loads(request.data)
    print(data["username"],data["password"])
    if data["username"] in db:
        if db[data["username"]] == data["password"]:
            print("SUCCESS")
            return {"success":True}
    print("FAILED")
    return {"success":False}

@app.route('/register', methods = ["POST"])
def register():
    data = json.loads(request.data)
    print(data["username"],data["password"])
    if data["username"] not in db:
        print("SUCCESS")
        db[data["username"]] = data["password"]
        return {"success":True} 
    print("FAILED")
    return {"success":False} 

@app.route('/upload', methods = ["POST"])
def upload():
    return {"success":True} 

@app.route('/login_error')
def login_error():
    return {"error": "unauthorized"}
