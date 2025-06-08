import React from "react";
import {
  Input,
  Typography,
  Button,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { UserApi, UpdateUserApi } from "../helpers/fetchbackend";
import { href, useNavigate } from "react-router-dom";

export function UserSettings({ email, password }) {
    const [newUsername, setNewUsername] = React.useState("");
    const [newEmail, setNewEmail] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const old_email = localStorage.getItem("email");
    const old_password = localStorage.getItem("password"); 
    const navigate = useNavigate();



    const handleSaveChanges = () => {


        if (!newUsername && !newEmail && !newPassword) {
            alert("Please enter at least one field to update.");
            return;
        }
        if (!newEmail && !newPassword) {
            alert("Please enter a valid email address and password, otherwise you cannot change the information.");
            return;
        }

        UpdateUserApi("change_userdata", newUsername, newEmail, newPassword, old_email, old_password)
          .then((response) => {
            console.log("Response from backend:", response);
            if (response.status === 200) {
              alert(response.message);
                // Update local storage with new email and password
                localStorage.setItem("username", newUsername);
                localStorage.setItem("email", newEmail);
                localStorage.setItem("password", newPassword);
                navigate('/');
            } else {
              alert(response.message);
            }
          })
          .catch((error) => {
            console.error("Error saving changes:", error);
            alert("An error occurred while saving changes.");
          });
    };

  return (
    <section className="px-4 py-12 md:px-8 lg:px-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Card className="shadow-lg dark:bg-gray-800">
        <CardBody className="p-8">
          <div className="mb-10">
            <Typography variant="h4" color="blue-gray" className="font-bold dark:text-white">
              Account Settings
            </Typography>
            <Typography variant="paragraph" className="text-gray-600 mt-1 dark:text-gray-300">
              Update your username, email, and password below.
            </Typography>
          </div>

          <div className="space-y-8">
            
            <div className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:bg-gray-800 dark:text-white">
                <div className="mt-2">
                    <label htmlFor="username" />
                        Username
                  <input
                    id="username"
                    name="username"
                    type="username"
                    placeholder={"youmatter"}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600 dark:focus:outline-indigo-400"
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div> 

                <div className="mt-2">
                    <label htmlFor="username" />
                        Email
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={"youmatter@gmail.com"}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600 dark:focus:outline-indigo-400"
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div> 



                <div className="mt-2">
                    <label htmlFor="username" />
                        Password
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder={"*********"}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-600 dark:focus:outline-indigo-400"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div> 

            </div>

            <div className="flex justify-end pt-4">
              <Button
                color="blue"
                size="lg"
                className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
