import React, { useState } from 'react';
import { Editor } from 'primereact/editor';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'quill/dist/quill.snow.css'; 
import {TableOfDocuments} from './tableOfDocuments.js'

import { SaveTextToBackend } from '../helpers/fetchbackend.js'; // Assuming this function is defined to save text
import { Loader } from './loader.js';






export function TextEditorPage () {
  
  const [text, setText] = useState('');
  const [fileName, setfileName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

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

    setIsDataLoading(true);
     SaveTextToBackend(text, fileName, localStorage.getItem("email"), isEditing)
      .then(response => {
        if (response.status !== 200) {
          alert(response.message, response.status);
          setIsEditing(false);
          setIsDataLoading(false);
        }
        else { 
          alert(response.message, response.status);
          window.location.reload(false);
          setIsEditing(false);
          setIsDataLoading(false);

        }
      })
      .catch(error => {
        
        alert('Error saving text:', error);
        setIsEditing(false);
        setIsDataLoading(false);
      });

  };

  return (
      <div className="p-6">
                <div className="relative lg:row-span-2 lg:-mt-10 -mb-4 -ml-4">

          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://whws.org.au/wp-content/uploads/2021/12/get-on-top-of-mental-health-early.jpg"
              className="h-12 w-auto"
            />
          </a>
        </div>
        {isDataLoading && (
          <div className="flex justify-center mb-4">
            <Loader />
          </div>
        )}

        <label htmlFor="name">Title of the document:</label>
        <input
          type="text"
          id="title-text"
          name="name"
          required
          minLength="4"
          maxLength="100"
          value={fileName}
          onChange={(e) => setfileName(e.target.value)}
          className="mb-4 px-3 py-2 border rounded w-full dark:bg-gray-800 dark:text-white"
        />

        <h2 className="text-xl font-bold mb-4">Document how your day has been</h2>

        <Editor
          value={text}
          onTextChange={(e) => setText(e.htmlValue)}
          style={{ height: '320px' }}
          id="quill-toolbar"
        />

        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isDataLoading}
        >
          {isDataLoading ? 'Saving...' : 'Save Text'}
        </button>

        <TableOfDocuments
          setIsEditing={setIsEditing}
          setText={setText}
          setfileName={setfileName}
        />
      </div>
    );
}
