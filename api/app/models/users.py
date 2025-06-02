import random
import mysql.connector
import random
from datetime import datetime

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="users"
    )

def add_user(username, email, password):
    db = get_db_connection()
    cursor = db.cursor(buffered=True)
    try:
        sql = "INSERT INTO user_data (id, username, email, passwd) VALUES (%s, %s, %s, %s)"
        val = (random.randint(1, 100), username, email, password)
        cursor.execute(sql, val)
        db.commit()
    finally:
        cursor.close()
        db.close()

def get_full_user_credentials(email):
    db = get_db_connection()
    cursor = db.cursor(buffered=True)
    try:
        sql = "SELECT id, username, email, passwd FROM user_data WHERE email = %s"
        cursor.execute(sql, (email,))
        result = cursor.fetchone()
        if result:
            return {
                "id": result[0],
                "username": result[1],
                "email": result[2],
                "password": result[3],
            }
        return None
    finally:
        cursor.close()
        db.close()

def get_user_name(email):
    db = get_db_connection()
    cursor = db.cursor(buffered=True)
    try:
        sql = "SELECT username FROM user_data WHERE email = %s"
        cursor.execute(sql, (email,))
        result = cursor.fetchone()
        if result:
            return result[0]  # only one column selected
        return None
    finally:
        cursor.close()
        db.close()

def get_user_email(username):
    db = get_db_connection()
    cursor = db.cursor(buffered=True)
    try:
        sql = "SELECT email FROM user_data WHERE username = %s"
        cursor.execute(sql, (username,))
        result = cursor.fetchone()
        if result:
            return result[0]  # only one column selected
        return None
    finally:
        cursor.close()
        db.close()


def get_user_id(email):
    db = get_db_connection()
    cursor = db.cursor(buffered=True)
    try:
        sql = "SELECT id FROM user_data WHERE email = %s"
        cursor.execute(sql, (email,))
        result = cursor.fetchone()
        if result:
            return result[0] 
        return None
    finally:
        cursor.close()
        db.close()

def check_user_exists(email):
    db = get_db_connection()
    cursor = db.cursor(buffered=True)
    try:
        sql = "SELECT COUNT(*) FROM users.user_data WHERE email = %s"
        cursor.execute(sql, (email,))
        result = cursor.fetchone()
        return result[0] > 0  # Returns True if user exists, False otherwise
    finally:
        cursor.close()
        db.close()

def update_user_data(data)->bool:
    db = get_db_connection()
    cursor = db.cursor()
    new_username = data.get("new_username") if "new_username" in data else None
    new_email = data.get("new_email")
    new_password = data.get("new_password")
    old_email = data.get("old_email")

    user_id = get_user_id(old_email)
    try:
        if user_id is None:
            return False, "User not found"
        if check_user_exists(new_email):
            return False, "Email already exists, please choose another one"
        sql = ""
        if new_username:
            sql = "UPDATE user_data SET email = %s, `passwd` = %s, username = %s WHERE id = %s"
            params = (new_email, new_password, new_username, user_id)
            cursor.execute(sql, params)

        else:
            sql = sql = "UPDATE user_data SET email = %s, `passwd` = %s WHERE id = %s"
            params = (new_email, new_password, user_id)
            cursor.execute(sql, params)

        db.commit()
        return True, "User updated successfully"
    finally:
        cursor.close()
        db.close()


def add_user_entry(user_id, file_path, file_name):
    tmp = random.randint(1, 100)
    date = datetime.today().strftime('%Y-%m-%d')
    db = get_db_connection()
    cursor = db.cursor()
    try:
        sql = "INSERT INTO users.user_entries (tmp,user_id, file_name, file_path, date) VALUES (%s, %s, %s, %s, %s)"
        val = (tmp, user_id, file_name, file_path, date)
        cursor.execute(sql, val)
        db.commit()
    finally:
        cursor.close()
        db.close()