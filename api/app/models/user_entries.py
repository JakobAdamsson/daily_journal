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


def add_user_entry(user_id, file_name, file_path, sentiment, summary, text_data, feeling):
    if not user_id or not file_name or not file_path:
        return False

    db = get_db_connection()
    cursor = db.cursor(buffered=True)
    document_id = random.randint(1, 1000000)

    try:
        sql = """
        INSERT INTO user_files (id, user_id, file_name, file_path, created_at, sentiment, summary, text_data, feeling)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            file_path = VALUES(file_path),
            created_at = VALUES(created_at),
            sentiment = VALUES(sentiment),
            summary = VALUES(summary),
            text_data = VALUES(text_data);
        """
        val = (document_id, user_id, file_name, file_path, datetime.now(), sentiment, summary, text_data, feeling)
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

def get_recent_user_entries(user_id):
    if not user_id:
        return []
    db = get_db_connection()
    cursor = db.cursor(buffered=True)
    try:
        sql = "SELECT file_name, id, sentiment, summary, created_at, feeling FROM user_files WHERE user_id = %s"
        cursor.execute(sql, (user_id,))
        entries = cursor.fetchall()
        return [{"file_name": entry[0], "id": entry[1], "sentiment": entry[2], "summary": entry[3], "created_at": entry[4], "feeling": entry[5]} for entry in entries]
    finally:
        cursor.close()
        db.close()


def get_user_entry_by_id(user_id, entry_id):
    if not user_id or not entry_id:
        return None
    db = get_db_connection()
    cursor = db.cursor(buffered=True)
    try:
        sql = "SELECT file_name, file_path, sentiment, summary, text_data FROM user_files WHERE user_id = %s AND id = %s"
        cursor.execute(sql, (user_id, entry_id))
        entry = cursor.fetchone()
        if entry:
            return {
                "file_name": entry[0],
                "file_path": entry[1],
                "sentiment": entry[2],
                "summary": entry[3],
                "text_data": entry[4]
            }
        return None
    finally:
        cursor.close()
        db.close()

def fetch_user_feelings(user_id):
    if not user_id:
        return []

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    
    try:
        sql = "SELECT feeling, created_at FROM user_files WHERE user_id = %s"
        cursor.execute(sql, (user_id,))
        feelings = cursor.fetchall()
        return feelings
    finally:
        cursor.close()
        db.close()