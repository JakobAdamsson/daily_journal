import time
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from app.models.users import add_user, get_user_name, get_user_id
from app.services.auth_service import validate_user_login, validate_information_change
from app.services.save_user_entries import save_user_entries_locally
from app.models.user_entries import add_user_entry, get_user_entries, get_recent_user_entries, get_user_entry_by_id,  fetch_user_feelings
from app.gpt_model.inference import run_prediction
from app.services.read_user_entry_for_edit import read_user_entry_for_edit
import sys
import html2text
import os
from app.services.save_user_uploads import save_user_uploads_locally
from app.models.user_uploads import add_user_upload_to_db, fetch_user_uploads
from app.utils.split_paths_into_filenames import split_paths_into_filenames, format_paths, get_file_type

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

    results = run_prediction(file_path)
    sentiment = results.sentiment
    summary = results.summary
    feeling = results.feeling
    print(sentiment, summary, feeling)
    if not success:
        return jsonify({"message": "Failed to save text"}), 400
    if not add_user_entry(user_id, file_name, file_path, sentiment, summary, text_data, feeling):
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


@app.route('/save_user_upload', methods=["POST", "OPTIONS"])
def save_user_upload():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    files = request.files
    email = request.form.get("email")
    user_id = get_user_id(email)

    # paths could be list of paths(path) or the error message
    success, paths = save_user_uploads_locally(user_id, files)
    
    file_names = split_paths_into_filenames(paths)

    formatted_paths = format_paths(paths)

    file_types = get_file_type(paths)
    print(file_types)

    if not success:
        return jsonify({"message": "Failed to save uploads", "error": paths}), 500
    
    # fioxa till paths så att de enbart innehåller user_entries/etc
    if not add_user_upload_to_db(user_id, formatted_paths, file_names, file_types):
        return jsonify({"message": "Failed to add upload entry to database"}), 500

    
    return jsonify({"message": "File uploaded and entry saved successfully"}), 200


@app.route('/get_user_uploads_db', methods=["POST", "OPTIONS"])
def get_user_uploads_db():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    email = request.get_json().get("email")
    # call db function to get user id
    user_id = get_user_id(email)

    # call db function to get user uploads
    uploads = fetch_user_uploads(user_id)
    
    return jsonify({"uploads": uploads}), 200



@app.route('/user_uploads/<path:filename>')
def serve_uploaded_file(filename):
    UPLOAD_FOLDER = r'C:\daily_journal\api\app\user_uploads'  # hardcoded absolute path
    full_path = os.path.join(UPLOAD_FOLDER, filename)
    return send_from_directory(UPLOAD_FOLDER, filename)



@app.route('/get_user_feelings_db', methods=["POST", "OPTIONS"])
def get_user_feelings_db():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    email = request.get_json().get("email")
    # call db function to get user id
    user_id = get_user_id(email)

    # call db function to get user uploads
    feelings = fetch_user_feelings(user_id)
    print(feelings)
    return jsonify({"feelings": feelings}), 200


@app.route('/get_all_user_data_db', methods=["POST", "OPTIONS"])
def get_all_user_data_db():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    
    email = request.get_json().get("email")
    # call db function to get user id
    user_id = get_user_id(email)
    print(user_id)

    return jsonify({"feelings": user_id}), 200