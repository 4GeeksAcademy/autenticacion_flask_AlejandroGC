"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_admin import Admin

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)



@api.route('/user', methods=['GET'])
def handle_hello():

    response_body = {
        "msg": "Hello, this is your GET /user response "
    }

    return jsonify(response_body), 200


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one()

        if password == user.password:
            access_token = create_access_token(identity=email)
            return jsonify(access_token=access_token)

        return jsonify({"msg": "Bad email or password"}), 401

    except:
        return jsonify({"msg": "You should register"}), 401
    
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/signup", methods=["POST"])
def signup():
    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        username = request.json.get("username", None)
        full_name = request.json.get("full_name", None)
        is_active = request.json.get("is_active", None)
        user = User(email=email, password=password, username=username, full_name=full_name, is_active=is_active)
        db.session.add(user)
        db.session.commit()
        
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)

    except Exception as e:
        print(e)
        return jsonify({"msg": "Complete data correctly"}), 401


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    # Access the identity of the current user with get_jwt_identity
    email = get_jwt_identity()
    profile = db.session.execute(db.select(User).filter_by(email=email)).scalar_one().serialize()
    return jsonify(profile), 200
