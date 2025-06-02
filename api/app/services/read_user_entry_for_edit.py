import html2text
import os    
from datetime import datetime
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
USER_ENTRIES_DIR = os.path.join(BASE_DIR, "..", "user_entries")




def read_user_entry_for_edit(file_path):
    """
    Reads a user entry for editing.
    """
    print(file_path, "file_path")
    if not os.path.exists(file_path):
        return None
    
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()
        print(content, "dsadasdada")
    
    return content