/* eslint-disable react/prop-types */
import { ChevronDown, Trash2, X } from "lucide-react";
import Modal from "react-modal";
import { UserContext } from "./UserContext";
import { useContext, useState } from "react";
import axios from "axios";

Modal.setAppElement("#root"); // Replace '#root' with the ID of your root element

const DeleteAccountModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Account Modal"
      className="m-5 h-[50%] p-4 flex justify-center bg-gray-900 rounded-lg"
    >
      <div className="p-4 flex flex-col items-center justify-center bg-gray-900">
        <div className="flex items-center">
          <p className="text-red-500 p-2">
            Are you sure you want to delete your account?
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 text-green-500 bg-green-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="p-2 text-red-500 bg-red-300 rounded"
            onClick={onConfirm}
          >
            Delete Account
          </button>
        </div>

        <div className="fixed bottom-[32rem]">
          <p className="text-gray-500">
            Once account is deleted all data will be lost
          </p>
        </div>
      </div>
    </Modal>
  );
};

const Settings = ({ handleCloseSettings }) => {
  const { handleLogout } = useContext(UserContext);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteAccount = async () => {
    try {
      const response = await axios.delete("/deleteAccount");
      if (response.status === 200) {
        setDeleteModalOpen(false);
        handleLogout();
      } else {
        console.error("Failed to delete account");
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Error during account deletion:", error.message);
      setDeleteModalOpen(false);
    }
  };

  return (
    <div className="mt-4 px-3 w-full space-y-6 dark:bg-gray-800 h-full rounded cur">
      <h1 className="flex justify-between text-xl text-gray-500 uppercase dark:text-gray-400 p-2">
        Settings page:
        <span>
          <X
            className="w-6 h-6 mx-3 hover:cursor-pointer hover:text-red-500 text-gray-300 dark:text-gray-500"
            onClick={handleCloseSettings}
          />
        </span>
      </h1>

      <div className="flex justify-center items-center">
        <div>
          <img
            className="w-full h-[150px] rounded-full"
            src="/chat-logo.png"
            alt="chatapp-logo"
          />
        </div>
      </div>

      {/* Themes */}
      <div className="bg-gray-500 justify-center flex w-full p-2 my-2 rounded ">
        <h1 className="text-teal-300 "> Theme : </h1>
        <div className="flex gap-2 items-center">
          <p className="flex items-center ml-3 text-gray-400">
            Select Theme
            <span>
              <ChevronDown className="pt-1" />
            </span>
          </p>
          coming soon...
        </div>
      </div>

      {/* Delete a/c */}
      <div className="bg-gray-950 justify-center flex w-full p-2 my-2 rounded ">
        <h1 className="text-red-300 "> Danger : </h1>
        <div className="flex gap-2 items-center">
          {" "}
          <button
            className="flex items-center ml-3 text-gray-400"
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete Account
            <span>
              <Trash2 color="red" />
            </span>
          </button>
          {/* Delete Account Modal */}
          <DeleteAccountModal
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={deleteAccount}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
