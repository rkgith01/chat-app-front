import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    id: null,
    username: null,
    email: null,
  });
  const setLoggedinUserName = (newUsername) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      username: newUsername,
    }));
  };

  const setId = (newId) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      id: newId,
    }));
  };
  useEffect(() => {
    axios
      .get("/profile")
      .then((res) => {
        const { id, username, email } = res.data;
        setUserData({ id, username, email });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("/logout")
      .then(() => {
        setUserData({ id: null, username: null, email: null });
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const updateUser = (newUserData) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...newUserData,
    }));
  };

  const { id, username, email } = userData;

  return (
    <UserContext.Provider
      value={{
        setLoggedinUserName,
        setId,
        handleLogout,
        updateUser,
        userData,
        id,
        username,
        email,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
