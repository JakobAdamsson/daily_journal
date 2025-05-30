import html2text
import os    
from datetime import datetime
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
USER_ENTRIES_DIR = os.path.join(BASE_DIR, "..", "user_entries")

def check_user_directory(user_id: int):
    """
    Ensures the full path '../user_entries/<user_id>' exists.
    """
    user_directory = os.path.join(USER_ENTRIES_DIR, str(user_id))
    os.makedirs(user_directory, exist_ok=True)



def save_user_entries_locally(data) -> bool or tuple[bool, str, str]:
    """
    Saves user entries to a file.
    """

    user_id = data["user_id"]
    file_name = data["filename"]
    raw_html = data["data"]
    date =str(datetime.now())
    print("tja")


    text_data = html2text.html2text(raw_html).strip()
    if not text_data:
        return False, "", ""

    # Ensure user folder exists
    check_user_directory(user_id)

    # Save file to the user's folder
    path = os.path.join(USER_ENTRIES_DIR, str(user_id), f"{user_id}_{file_name}.txt")
    with open(path, "w", encoding="utf-8") as file:
        file.write(text_data)

    return True, path, file_name