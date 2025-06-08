import React, { useState } from "react";
import { SaveUserUpload } from "../helpers/fetchbackend.js"; // Assuming this function is defined to save files


export const Uploader = () => {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({ isUploading: false, success: false });

  const handleFileChange = (e) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    if (selected.length > 0) {
      setFiles(selected);
      setUploadStatus({ isUploading: false, success: false });
    }
  };

  const handleUpload =  async () => {
    if (files.length === 0) return;
    setUploadStatus({ isUploading: true, success: false });

    setTimeout(() => {
      setUploadStatus({ isUploading: false, success: true });
      const response =  SaveUserUpload(files, localStorage.getItem("email"));
      setFiles([]);
      setTimeout(() => {
        window.location.reload(false);
      }, 2000); 
    }, 2000);
  };

  const handleRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <div style={{ position: 'absolute', marginTop: '-250px', marginBottom: '600px', marginRight: '1775px' }}>



          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://whws.org.au/wp-content/uploads/2021/12/get-on-top-of-mental-health-early.jpg"
              className="h-12 w-auto"
            />
          </a>
        </div>
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        
        <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-white mb-4">Upload Files</h2>

        {files.length === 0 && !uploadStatus.success && (
          <div className="text-center">
            <input
              type="file"
              multiple
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Select Files
            </button>
          </div>
        )}

        {files.length > 0 && (
          <div className="space-y-4">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 mt-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between py-2">
                  <span className="text-gray-700 dark:text-gray-200 truncate">{file.name}</span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemove(index)}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={handleUpload}
              className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              disabled={uploadStatus.isUploading}
            >
              {uploadStatus.isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}

        {uploadStatus.success && (
          <div className="mt-6 text-green-600 dark:text-green-400 text-center font-medium">
            ✅ Files uploaded successfully!
          </div>
        )}
        
      </div>
    </div>
  );
};
