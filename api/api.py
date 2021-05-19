import time
import json
from flask import Flask, request,jsonify ,render_template
from flask_jwt_extended import (create_access_token, create_refresh_token,
                                jwt_required, jwt_refresh_token_required, get_jwt_identity,decode_token)
from app import app, mongo, flask_bcrypt, jwt,mail
from flask_mail import  Message
from schema import validate_user,validate_register
from werkzeug.utils import secure_filename
from datetime import timedelta,datetime
from mail_service import send_email

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
        elif mail :
            return jsonify({'success': False, 'message': 'Email already exist '}), 400
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

@app.route('/delete/<filename>', methods = ["POST"])
@jwt_required
def delete(filename):
    current_user = get_jwt_identity()
    f = mongo.db.fs.files.find_one({"filename":filename,"username":current_user["username"]})
    if f["_id"]:
        deleted = mongo.db.fs.files.delete_one({"filename":filename,"username":current_user["username"]})
        print(deleted)
        if "_id" in deleted:
            return {"success":True,"data":"File Deleted"}
        else:
            return {"success":False,"data":"File Delete Unsuccessful"}
    return {"success":False,"data":"File not found"}



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

@app.route('/forget', methods = ["POST"])
def forget():
    url = request.host_url + 'reset/'
    body = request.get_json()
    email = body.get('email')

    mail = mongo.db.user.find_one({"email":email})
    if not mail :
        return {"success": False, "data":"Email not found"}
    expires = timedelta(hours=24)
    reset_token = create_access_token(identity=mail["email"], expires_delta=expires)

    return {"success":True,"data":send_email('[Segmentation Model] Reset Your Password',
                        sender=app.config["MAIL_USERNAME"],
                        recipients=[email],
                        text_body=render_template('reset_password.txt',
                                                url=url + reset_token),
                        html_body=render_template('reset_password.html',
                                                url=url + reset_token))}

@app.route('/reset/<token>', methods = ["POST"])
def reset(token):
    body = request.get_json()
    reset_token = token
    password = body.get('password')

    if not reset_token or not password:
        return {"success": False}

    mail_id = decode_token(reset_token)['identity']

    user = mongo.db.user.find_one({"email":mail_id})
    password = flask_bcrypt.generate_password_hash(
            password)
    mongo.db.user.update_one({"email":user["email"],"username":user["username"]},{"password":password})
    
    return send_email('[Segmentation Model] Password Reset Successful',
                        sender=app.config["MAIL_USERNAME"],
                        recipients=[user["email"]],
                        text_body='Password reset was successful',
                        html_body='<p>Password reset was successful</p>')

    