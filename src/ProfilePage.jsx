// import React from 'react'

import axios from "axios";
import { ImagePlus, Pen, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import Avatar from "./Avatar";

// eslint-disable-next-line react/prop-types
const ProfilePage = ({ handleCloseProfilePage }) => {
  const { username, id, email, updateUser } = useContext(UserContext);
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [newUsername, setNewUsername] = useState(username);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  
  const apiEndPoint = import.meta.env.BASE_URL

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Update the uploadDisabled state based on whether a file is selected
    setUploadDisabled(!selectedFile);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      setUploadDisabled(!uploadDisabled);

      // Send a POST request to upload the image
      const response = await axios.post(
        `${apiEndPoint}upload`,
        formData
      );

      // Update the image state with the new image filename
      setImage(response.data.image);

      // Reset the file state after successful upload
      setFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const updateName = async () => {
    try {
      const newUsername = prompt("Enter new username:");

      if (newUsername) {
        const response = await axios.put(`${apiEndPoint}updateName`, {
          newUsername,
        });
        updateUser({ username: response.data.username });
        setNewUsername(response.data.username);
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const updateImage = async () => {
    try {
      console.log("Updating image...");
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.put(
        `${apiEndPoint}updateImage`,
        formData
      );

      // Handle the response as needed
      console.log("Response:", response);
      setImage(response.data.image);
      // Reset the file state after successful update
      setFile(null);
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  useEffect(() => {
    if (username && !image) {
      axios
        .get(`/getImages`)
        .then((res) => {
          // Make sure the response structure is as expected
          res.data.map(({ sender, image }) => {
            if (sender == id) {
              setImage(image);
            }
          });
        })
        .catch((err) => console.log(err));
    }
  }, [username, id, apiEndPoint, image]);

  return (
    <div className="mt-4 px-3 w-full space-y-6 dark:bg-gray-800 h-full rounded ">
      <h1 className="flex justify-between text-xl text-gray-500 uppercase dark:text-gray-400 p-2">
        profile page:
        <span>
          <X
            className="w-6 h-6 mx-3 hover:cursor-pointer hover:text-red-500 text-gray-300 dark:text-gray-500"
            onClick={handleCloseProfilePage}
          />
        </span>
      </h1>

      {/*image of the user to be set  */}
      <div className="flex justify-center items-center ">
        {image ? (
          <img
          // src={image ? `${apiEndPoint}/localhost:3001/images/${image}` : ""}
          src={image ? `https://chat-app-backend-7xse.onrender.com/images/${image}` : ""}
          className="object-cover shadow-xl w-[145px] h-[155px] rounded"
            alt="avatar"
          />
        ) : (
          <Avatar id={id} username={username} />
        )}
      </div>

      {/*uploading user image  */}
      <div className="mx-2 text-sm font-medium flex flex-col items-center ">
        <p
          htmlFor="dropzone-file"
          id="dropzone-file"
          className="text-gray-400 flex flex-col items-center justify-center w-full"
        >
          Add profile picture
        </p>

        <input
          type="file"
          className="items-center text-center sm:px-1 lg:px-3 py-3 h-[50px] text-white m-2 cursor-pointer bg-gray-950 file:hidden dark:text-gray-400 rounded-full"
          onChange={handleFileChange}
        />
        <div className="flex justify-center gap-2">
          {!uploadDisabled ? (
            <button
              type="button"
              className="w-[80px] h-[35px] text-center text-white focus:outline-none focus:ring-blue-300 rounded-full mb-2 px-6 py-3 inline-flex justify-center items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 "
              onClick={handleUpload}
            >
              <Upload size={18} />
            </button>
          ) : null}
          {/* {console.log(uploadDisabled)} */}
          <button
            type="button"
            className="w-[80px] h-[35px] text-center text-white focus:outline-none focus:ring-blue-300 rounded-full mb-2 px-6 py-3 inline-flex justify-center items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 "
            onClick={uploadDisabled ? null : updateImage}
            disabled={uploadDisabled}
          >
            <ImagePlus size={18} alt="Edit Image" />
          </button>
        </div>
      </div>

      <div className="mx-2 text-lg font-mono ">
        <p className="hover:bg-gray-600 rounded p-2 capitalize flex justify-between items-center text-gray-400">
          name: {newUsername}
          <span className="text-gray-400 cursor-pointer selected:border-dashed">
            <Pen size={18} onClick={updateName} />
          </span>
        </p>
        <p className="hover:bg-gray-600 rounded p-2 capitalize flex justify-between items-center text-gray-400">
          email: {email ? email : "No email Provided"}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
