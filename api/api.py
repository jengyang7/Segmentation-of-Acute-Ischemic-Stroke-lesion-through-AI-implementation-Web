import time
import json
from flask import Flask, request

app = Flask(__name__)
username = ["a"]
password = ["a"]

@app.route('/home')
def get_current_time():
    return {'time': time.time()}

@app.route('/login', methods = ["POST"])
def login():
    data = json.loads(request.data)
    print(data["username"],data["password"])
    if data["username"] in username and data["password"] in password :
        print("SUCCESS")
        return {"success":True}
    else:
        print("FAILED")
        return {"success":False}

@app.route('/login_error')
def login_error():
    return {"error": "unauthorized"}
