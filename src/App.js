import React, { useState, useEffect } from 'react';
import './App.css';
import { LandingPage } from './pages/landingPage';
import { Background } from './pages/background';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Login } from './pages/login'
import { Features } from './pages/features'

import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import useDarkMode from './useDarkMode';
import { UserSettings } from './pages/settings';
import { Signup } from './pages/signup';
import { ThemeProvider } from "@material-tailwind/react";
import { TextEditorPage } from './pages/textEditorPage';
import { Uploader } from './pages/uploadFiles';
import { TableOfUploadedDocuments } from './pages/uploadedDocuments';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();

  // ONLY LOGIN STUFF
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedEmail = localStorage.getItem("email");

    if (storedLogin === "true" && storedEmail) {
      setIsLoggedIn(true);
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
  const storedLogin = localStorage.getItem("isLoggedIn") === "true";
  setIsLoggedIn(storedLogin);
  }, []);


return (
  <ThemeProvider>
    <Router>
      
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        
        <Routes>
          
          <Route path="/background" element={<Background />} />
          <Route
            path="/login"
            element={
              isLoggedIn
                ? <Navigate to="/" />
                : <Login setIsLoggedIn={setIsLoggedIn} setEmail={setEmail} email={email} setPassword={setPassword} password={password}  />
            }
          />
          <Route path="/features" element={<Features />} />
          <Route path="/uploads" element={<TableOfUploadedDocuments email={email} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/upload_document" element={<Uploader></Uploader>} />
          <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} email={email} />} />
          <Route path="/user_settings" element={<UserSettings email={email} password={password}/>} />
          {isLoggedIn && (<Route path="/Texteditor" element={<TextEditorPage />} />)}
        </Routes>

        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white shadow"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <IoSunny /> : <IoMoon />}
          </button>
        </div>
      </div>
      
  
    </Router>
  </ThemeProvider>
  );
}

export default App;