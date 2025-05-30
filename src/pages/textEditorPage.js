import React, { useState } from 'react';
import { Editor } from 'primereact/editor';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'quill/dist/quill.snow.css'; 

import { SaveTextToBackend } from '../helpers/fetchbackend.js'; // Assuming this function is defined to save text

export function TextEditorPage () {
  const [text, setText] = useState('');
  const [fileName, setfileName] = useState('');

  const handleSave = () => {
    if (!fileName || !text) {
        alert("Please enter a title and some text before saving.");
        return;
    }
    if (!fileName) {
        alert("Please enter a title for your document.");
        return;
    }
    if (!text) {
        alert("Please enter some text to save.");
        return;
    }
     SaveTextToBackend(text, fileName, localStorage.getItem("email"))
      .then(response => {
        if (response.status !== 200) {
          alert(response.message, response.status);
        }
        else alert(response.message, response.status);
      })
      .catch(error => {
        
        alert('Error saving text:', error);
      });

  };

  return (
    
    <div className="p-6">
        <label for="name">Title of the document:</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        minLength="4"
        maxLength="8"
        size="10"
        value={fileName}
        onChange={(e) => setfileName(e.target.value)}
        className="mb-4 px-3 py-2 border rounded w-full dark:bg-gray-800 dark:text-white"
      />
      <h2 className="text-xl font-bold mb-4">Document how your day has been</h2>
        
      <Editor
        value={text}
        onTextChange={(e) => setText(e.htmlValue)}
        style={{ height: '320px' }}
      />

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Text
      </button>
      
    </div>
    
  );
}
