import React from 'react';

const availableApis = {
  login_user: 'http://localhost:5000/login_user',
  signup: 'http://localhost:5000/signup',
  get_username: 'http://localhost:5000/get_username',
  change_userdata: 'http://localhost:5000/change_userdata',
  save_text: 'http://localhost:5000/save_text',
  get_user_entries_db: 'http://localhost:5000/get_user_entries_db',
  get_user_entry_by_id_db: 'http://localhost:5000/get_user_entry_by_id_db',
  save_user_upload: 'http://localhost:5000/save_user_upload',
  get_user_uploads_db: 'http://localhost:5000/get_user_uploads_db',
};

function getApi(apiString) {
  return availableApis[apiString] || null;
}

async function postRequest(api, payload, sendFile = false) {
    if (!api) return { status: 500, message: "API not found" };
    let response;
    if (sendFile) {
        response = await fetch(api, {
        method: "POST",
        body: payload,
        });
    } else {
        console.log("Sending payload:", payload, api);
        response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        });
    }

    const status = response.status;
    const result = await response.json();
    return { status, result };
}


export const UserApi = async (apiString, username = null, email, password) => {
  const api = getApi(apiString);
  const { status } = await postRequest(api, { username, email, password });
  return status === 200;
};

export const UpdateUserApi = async (
  apiString,
  new_username = null,
  new_email,
  new_password,
  old_email,
  old_password
) => {
  const api = getApi(apiString);
  const { status, result } = await postRequest(api, {
    new_username,
    new_email,
    new_password,
    old_email,
    old_password,
  });
  return { status, message: result?.message || "Unknown error" };
};

export const GetUsername = async (email) => {
  const api = getApi('get_username');
  const { result } = await postRequest(api, { email });
  return result?.username || null;
};

export const GetUserEntries = async (email) => {
  const api = getApi('get_user_entries_db');
  const { result } = await postRequest(api, { email });
  return result || null;
};

export const GetUserEntryById = async (email, DocumentID) => {
  const api = getApi('get_user_entry_by_id_db');
  const { result } = await postRequest(api, { email, DocumentID });
  return result || null;
};


export const SaveTextToBackend = async (data, filename, email, isEditing) => {
  const api = getApi('save_text');
  const { status, result } = await postRequest(api, {
    data,
    filename,
    email,
    isEditing,
  });
  return { status, message: result?.message || "Unknown error" };
};


export const SaveUserUpload = async (files, email) => {
    const api = getApi('save_user_upload');
    let fileCount = 0;
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("file"+fileCount, file);
        fileCount++;
    })
    formData.append("email", email);
  const { status, result } = await postRequest(api, formData, true);
  return { status, message: result?.message || "Unknown error" };
};


export const GetUserUploads = async (email) => {
  const api = getApi('get_user_uploads_db');
  console.log("Fetching user uploads for email:", email);
  const { result } = await postRequest(api, { email });
  return result || null;
};