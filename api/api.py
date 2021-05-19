import time
import json
from flask import Flask, request,jsonify
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity)
from app import app, mongo, flask_bcrypt, jwt,mail
from flask_mail import  Message
from schema import validate_user,validate_register
from werkzeug.utils import secure_filename
from datetime import datetime


@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({
        'success': False,
        'message': 'Missing Authorization Header'
    }), 401

def verify_password(password, hash_from_database):
    password_bytes = password.encode()
    hash_bytes = hash_from_database.encode()
    does_match = bcrypt.checkpw(password_bytes, hash_bytes)
    return does_match


@app.route('/login', methods = ["POST"])
def login():
    data = validate_user(request.get_json())
    if data['success']:
        data = data['data']
        user = mongo.db.user.find_one({'username': data['username']})
        if user and flask_bcrypt.check_password_hash(user['password'], data['password']):
            del user['password']
            access_token = create_access_token(identity=data)
            refresh_token = create_refresh_token(identity=data)
            user['token'] = access_token
            user['refresh'] = refresh_token
            return jsonify({'success': True, 'data': user}), 200
        else:
            return jsonify({'success': False, 'message': 'invalid username or password'}), 401
    else:
        return jsonify({'success': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400

@app.route('/register', methods = ["POST"])
def register():
    data = validate_register(request.get_json())
    if data['success']:
        data = data['data']
        data['password'] = flask_bcrypt.generate_password_hash(
            data['password'])
        user = mongo.db.user.find_one({"username":data["username"]})
        mail = mongo.db.user.find_one({"email":data["email"]})
        if user:
            return jsonify({'success': False, 'message': 'User already exist '}), 400
        else:
            mongo.db.user.insert_one(data)
            return jsonify({'success': True, 'message': 'User created successfully!'}), 200
    else:
        return jsonify({'success': False, 'message': 'Bad request parameters: {}'.format(data['message'])}), 400

@app.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    ''' refresh token endpoint '''
    current_user = get_jwt_identity()
    ret = {
        'token': create_access_token(identity=current_user)
    }
    return jsonify({'success': True, 'data': ret}), 200

@app.route('/upload', methods = ["POST"])
@jwt_required
def upload():
    current_user = get_jwt_identity()
    print(current_user)
    if request.files != "":
        f = request.files["file"]
        filename = secure_filename(f.filename)
        mongo.save_file(filename, f,username=current_user["username"])
        return {"success":True} 
    return {"success":False} 

@app.route('/retrieve/<filename>', methods = ["GET"])
@jwt_required
def retrieve(filename):
    print(filename)
    return mongo.send_file(filename)

@app.route('/retrieve_filename', methods = ["GET"])
@jwt_required
def retrieve_filename():
    current_user = get_jwt_identity()
    return {"success":True,"data":list(mongo.db.fs.files.find({"username":current_user["username"]}))}

@app.route('/forget', methods = ["GET"])
def forget():
    email=request.get("email")
    print(email)
    user = mongo.db.user.find_one({"email":email})
    if user:
        expires = datetime.timedelta(hours=24)
        reset_token = create_access_token(str(user.id), expires_delta=expires)

        msg = Message('Hello', sender = app.config['MAIL_USERNAME'], recipients = [email])
        msg.body = "This is the email body"
        mail.send(msg)

    return {"success":False,"data":"Email doesnt exist"}

    