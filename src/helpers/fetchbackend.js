import React, { useEffect, useState } from 'react'; //1 

const availableApis = {
  login_user: 'http://localhost:5000/login_user',
  signup: 'http://localhost:5000/signup',
  get_username: 'http://localhost:5000/get_username',
  change_userdata: 'http://localhost:5000/change_userdata',
  save_text: 'http://localhost:5000/save_text',
};

function getApi(apiString) {
  if (availableApis.hasOwnProperty(apiString)) {
    return availableApis[apiString];
  }
  return null;
}

// For POST requests to the backend API
export  const UserApi = async (apiString, username = null, email, password) => {
    const api = getApi(apiString);
    if (api) {
        const response =  await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
        // …
        });
        const result = await response.json();
        const status = await response.status
        if (status === 200) {
            return true;
        }
        return false;
    }
  };

export  const UpdateUserApi = async (apiString, new_username = null, new_email, new_password, old_email, old_password) => {
    const api = getApi(apiString);
    if (api) {
        const response =  await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            new_username: new_username,
            new_email: new_email,
            new_password: new_password,
            old_email: old_email,
            old_password: old_password

        })
        // …
        });
        const result = await response.json();
        const status = await response.status
        if (status === 200) {
            return { status: status, message: result.message };
        }
        return { status: status, message: result.message };
    }
    return { status: 500, message: "API not found" };
  };

export const GetUsername = async (email) => {
    const api = 'http://localhost:5000/get_username';
    if (api) {
        const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email })
        });
        const result = await response.json();
        if (result && result.username) {
        return result.username;
        }
    }
    return null;

}

export const GetUserEntries = async (email) => {
    const api = 'http://localhost:5000/get_user_entries_db';
    if (api) {
        const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email })
        });
        const result = await response.json();
        if (result) {
        return result;
        }
    }
    return null;

}


export const SaveTextToBackend = async (data , filename, email, isEditing) => {
    const api = getApi('save_text');
    if (api) {
        const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data, filename: filename ,email: email, isEditing: isEditing })
        });
        const result = await response.json();
        const status = await response.status
        if (status === 200) {
            return { status: status, message: result.message };
        }
        return { status: status, message: result.message };
    }
    return { status: 500, message: "API not found" };
    

}


export const GetUserEntryById = async (email, DocumentID) => {
    const api = 'http://localhost:5000/get_user_entry_by_id_db';
    if (api) {
        const response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, DocumentID: DocumentID })
        });
        const result = await response.json();
        if (result) {
            
        return result;
        
        }
    }
}

  