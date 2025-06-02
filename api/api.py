import time
from flask import Flask, jsonify, request
from flask_cors import CORS
from app.models.users import add_user, get_user_name, get_user_id
from app.services.auth_service import validate_user_login, validate_information_change
from app.services.save_user_entries import save_user_entries_locally
from app.models.user_entries import add_user_entry, get_user_entries, get_recent_user_entries, get_user_entry_by_id
from app.gpt_model.inference import run_prediction
from app.services.read_user_entry_for_edit import read_user_entry_for_edit
import sys
import html2text


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config['DEBUG'] = True

@app.route('/signup', methods=["POST", "OPTIONS"])
def signup():
    if request.method == 'OPTIONS':
        return '', 200 
        
    data = request.get_json()
    add_user(data["username"], data["email"], data["password"])
    return jsonify({"message": "user created"}), 200


@app.route('/login_user', methods=["POST", "OPTIONS"])
def login_user():
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.status_code = 200
        return response

    data = request.get_json()
    if validate_user_login(data["email"], data["password"]):
        return jsonify({"message": "login successful"}), 200
    
    return jsonify({"message": "login not successfull"}), 400


@app.route('/get_username', methods=["POST", "OPTIONS"])
def get_username():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data = request.get_json()

    username = get_user_name(data["email"])

    if username:
        return jsonify({"username": username}), 200

    return jsonify({"message": "User not found"}), 404


@app.route('/change_userdata', methods=["POST", "OPTIONS"])
def change_userdata():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data = request.get_json()
    
    success, message = validate_information_change(data)
    if not success:
        return jsonify({"message": message}), 400
    
    return jsonify({"message": message}), 200


@app.route('/save_text', methods=["POST", "OPTIONS"])
def save_text():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data = request.get_json()
    user_id = get_user_id(data["email"])
    if user_id is None:
        return jsonify({"message": "User not found"}), 404
    
    current_user_entries = get_user_entries(user_id)
    current_file_names = [entry["file_name"] for entry in current_user_entries]
    edit_mode = data["isEditing"]
    if not edit_mode and data["filename"] in current_file_names:
        return jsonify({"message": "File with this name already exists"}), 400
    
    # First save it locally
    data["user_id"] = user_id
    success, file_path, file_name = save_user_entries_locally(data)
    raw_html = data["data"]
    text_data = html2text.html2text(raw_html)

    results_dict = run_prediction(file_path)

    sentiment = results_dict["Sentiment"]
    summary = results_dict["Summary"]
    if not success:
        return jsonify({"message": "Failed to save text"}), 400
    if not add_user_entry(user_id, file_name, file_path, sentiment, summary, text_data):
        return jsonify({"message": "Failed to add entry to database"}), 500

    
    return jsonify({"message": "Entry saved successfully"}), 200


@app.route('/get_user_entries_db', methods=["POST", "OPTIONS"])
def get_user_entries_db():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data = request.get_json()
    user_id = get_user_id(data["email"])
    if user_id is None:
        return jsonify({"message": "User not found"}), 404
    
    entries = get_recent_user_entries(user_id)
    if not entries:
        return jsonify({"message": "No entries found"}), 404
    
    return jsonify({"entries": entries}), 200


@app.route('/get_user_entry_by_id_db', methods=["POST", "OPTIONS"])
def get_user_entry_by_id_db():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data = request.get_json()
    user_id = get_user_id(data["email"])
    if user_id is None:
        return jsonify({"message": "User not found"}), 404
    
    entry = get_user_entry_by_id(user_id, data["DocumentID"])
    
    user_file_path = entry["file_path"]
    text_content = read_user_entry_for_edit(user_file_path)
    entry["text_content"] = text_content
    if not entry:
        return jsonify({"message": "Entry not found"}), 404
    
    return jsonify({"entry": entry}), 200