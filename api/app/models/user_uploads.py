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


def add_user_upload_to_db(user_id, paths, file_names, file_types):
    if not user_id or not paths:
        return False

    db = get_db_connection()
    cursor = db.cursor(buffered=True)
    
    try:
        sql = """
        INSERT INTO user_uploads (id, user_id, file_path, created_at, file_name, file_type)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            file_path = VALUES(file_path),
            created_at = VALUES(created_at);
        """
        for (path, file_name, file_type) in zip(paths, file_names, file_types):
            document_id = random.randint(1, 1000000)
            val = (document_id, user_id, path, datetime.now(), file_name, file_type)
            cursor.execute(sql, val)

        db.commit()
        return True
    finally:
        cursor.close()
        db.close()


def fetch_user_uploads(user_id):
    if not user_id:
        return []

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    
    try:
        sql = "SELECT * FROM user_uploads WHERE user_id = %s"
        cursor.execute(sql, (user_id,))
        uploads = cursor.fetchall()
        return uploads
    finally:
        cursor.close()
        db.close()