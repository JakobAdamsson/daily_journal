import html2text
import os    
from datetime import datetime
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
USER_ENTRIES_DIR = os.path.join(BASE_DIR, "..", "user_uploads")

def check_user_directory(user_id: int):
    """
    Ensures the full path '../user_uploads/<user_id>' exists.
    """
    user_directory = os.path.join(USER_ENTRIES_DIR, str(user_id))
    os.makedirs(user_directory, exist_ok=True)






def save_user_uploads_locally(user_id, files) -> tuple[bool, list:str] or tuple[bool, str]:
    """
    Saves user entries to a file.
    """


    try:
        # Ensure user folder exists
        check_user_directory(user_id)
        paths = []
        for list_type in files:
            for file in files.getlist(list_type):
                path = os.path.join(USER_ENTRIES_DIR, str(user_id), f"{user_id}_{file.filename}")
                file.save(path)
                paths.append(path)

        return True, paths
    
    except Exception as e:
        print(f"Error saving user uploads: {e}")
        return False, str(e)