from app.models.users import get_full_user_credentials, update_user_data


def validate_user_login(email, password) -> bool:
    user = get_full_user_credentials(email) # returns user data or None if not found
    if user and user['password'] == password:
        return True
    return False


def validate_information_change(data) -> bool:
    def filter_empty_values(data):
        tmp = [(key, value) for key, value in data.items() if value != ""]
        filtered_data = {}
        for item in tmp:
            filtered_data[item[0]] = item[1]
        return filtered_data

    data = filter_empty_values(data)
    print("========här?=========2")
    success, message = update_user_data(data)
    print("Update user data success:", success, "Message:", message)
    if not success:
        return False, message
    return True, message
