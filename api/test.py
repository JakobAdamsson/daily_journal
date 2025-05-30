import os


id = 1
name = "test"

os.chdir(f"{os.path.dirname(__file__)}/app/user_entries")

print("Current working directory:", os.listdir())

