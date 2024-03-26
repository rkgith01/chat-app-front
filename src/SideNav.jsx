/* eslint-disable react/prop-types */
import { Home, LogOut, Settings, User2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

const SideNav = ({
  handleProfileIconClick,
  handleSettingIcon,
  handleLogout,
}) => {
  const { username, id, updateUser } = useContext(UserContext);
  const [image, setImage] = useState();
  const apiEndPoint = import.meta.env.BASE_URL
  
 
  useEffect(() => {
    if (username && !image) {
      axios
        .get(`/getImages`)
        .then((res) => {
          // Make sure the response structure is as expected
          res.data.map(({ sender, image }) => {
            if (sender == id) {
              setImage(image);

              // Update user's image in the context
              updateUser({ image });
            }
          });
        })
        .catch((err) => console.log(err));
    }
  }, [username, id, updateUser, apiEndPoint, image]);

  // useEffect(() => {
  //   if (username) {
  //     axios
  //       .get("http://localhost:3001/getImages")
  //       .then((res) => {
  //         // Make sure the response structure is as expected
  //         res.data.map(({ sender, image }) => {
  //           if (sender == id) {
  //             setImage(image);
  //           }
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [username, id]);

  return (
    <>
      <div>
        <Link href="" className="flex items-center">
          <img
            className="w-auto h-[4rem] rounded-full"
            src="/logo.png"
            alt="chatapp-logo"
          />
        </Link>
      </div>
      <nav className="flex flex-col  items-center flex-1 space-y-8 ">
        <Link
          href="/chat"
          className="mt-[5rem] p-[0.5rem] inline-block text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
        >
          <Home className="w-6 h-6" />
        </Link>

        {/* <a
          // href="#"
          className="p-[0.5rem] inline-block text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
        >
          <Users2 className="w-6 h-6" />
        </a> */}

        <a
          // href=""
          className="p-[0.5rem] inline-block text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100"
          onClick={handleSettingIcon}
        >
          <Settings className="w-6 h-6" />
        </a>
      </nav>
      {/* user image and logout btn */}
      <div className="flex flex-col items-center mt-4 space-y-4 cursor-pointer">
        <div
          className="flex justify-center items-center "
          onClick={handleProfileIconClick}
        >
          {/* {console.log(`${apiEndPoint}localhost:3001/images/${image}`)} */}
          
          {image ? (
            <img
              // src={image ? `${apiEndPoint}/localhost:3001/images/${image}` : ""}
              src={image ? `https://chat-app-backend-7xse.onrender.com/image/${image}` : ""}
              className="object-cover w-8 h-8 rounded-lg"
              alt="avatar"
            />
          ) : (
            <div
              className={
                " bg-green-500 w-[50px] h-[50px] rounded-full flex flex-col items-center justify-center "
              }
            >
              <div className="text-center w-full text-[1rem]">
                {<User2 size={18} className="w-full" />}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          // href="#"
          className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};

export default SideNav;
