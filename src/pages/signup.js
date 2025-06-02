import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import React, { useState } from 'react';
import { UserApi } from '../helpers/fetchbackend';



export function Signup({ getIsLoggedIn, setIsLoggedIn }) {
    const [goToLoginPage, setGoLoginPage] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



  return (
    <div className="p-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      {getIsLoggedIn ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
            You're logged in!
          </h2>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => setIsLoggedIn(false)}
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">

            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600 dark:focus:outline-indigo-400"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600 dark:focus:outline-indigo-400"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600 dark:focus:outline-indigo-400"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>




              <div>
                <button
                  type="button"
                  className="w-full rounded-md bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 px-3 py-1.5 text-white font-semibold"
                    onClick={async () => {
                    const success = await UserApi("signup", username, email, password);
                    if (success) {
                        alert('Account created successfully!');
                        localStorage.setItem("username", username); 
                        localStorage.setItem("email", email);
                        localStorage.setItem("password", password); // optional and only if you're using it later
                        //setIsLoggedIn(true); // make sure to log in after signup
                        navigate("/login");
                    } else {
                        alert("Signup failed. Try again.");
                    }
                    }}
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
