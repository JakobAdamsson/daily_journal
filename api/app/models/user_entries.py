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


def add_user_entry(user_id, file_name, file_path):
    if not user_id or not file_name or not file_path:
        return False
    db = get_db_connection()
    cursor = db.cursor(buffered=True)
    document_id = random.randint(1, 1000000)  # Generate a random document ID
    try:
        sql = "INSERT INTO user_files (id, user_id, file_name, file_path, created_at) VALUES (%s, %s, %s, %s, %s)"
        val = (document_id, user_id, file_name, file_path, datetime.now())
        cursor.execute(sql, val)
        db.commit()
        return True
    finally:
        cursor.close()
        db.close()


def get_user_entries(user_id):
    if not user_id:
        return []
    db = get_db_connection()
    cursor = db.cursor(buffered=True)
    try:
        sql = "SELECT file_name, file_path FROM user_files WHERE user_id = %s"
        cursor.execute(sql, (user_id,))
        entries = cursor.fetchall()
        return [{"file_name": entry[0], "file_path": entry[1]} for entry in entries]
    finally:
        cursor.close()
        db.close()