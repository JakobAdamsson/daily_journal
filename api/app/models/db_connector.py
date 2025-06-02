import mysql.connector
import os
class DBConnector:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd = "root",
        database="users"
    )

    cursor = db.cursor()