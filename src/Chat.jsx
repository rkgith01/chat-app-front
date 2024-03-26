import { MessageSquareTextIcon } from "lucide-react";
// import ChatBox from "./ChatBox";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./UserContext";
import _ from "lodash";
import axios from "axios";
import ChatBox from "./ChatBox";
import ProfilePage from "./ProfilePage";
import SideNav from "./SideNav";
import ChatUsers from "./ChatUsers";
import SearchBar from "./SearchBar";
import Settings from "./Settings";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";

const Chat = () => {
  const { username, id, handleLogout } = useContext(UserContext);
  const messageBoxref = useRef();

  const [ws, setWs] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const [image, setImage] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);
  const [offlineUsers, showOffLineUsers] = useState({});

  const [showChatBox, setShowChatBox] = useState(true); // New state variable
  const isSmallScreen = window.innerWidth <= 640;

  const appName = "Let's Chat";

  // const apiEndPoint = import.meta.env.BASE_URL
  // for small screen sizes

  const handleCloseChatBox = () => {
    setSelectedUser(null);
    setShowChatBox(true);
  };

  const userLogout = () => {
    setWs(null);
    handleLogout();
    // user should show offline once logged out

    // setSelectedUser(null);
  };

  const handleSearchInputChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter users based on the search term
    const filtered = Object.keys(mainUser).filter((id) =>
      onlineUsers[id].toLowerCase().includes(term)
    );

    // Filter messages based on the search term
    // todo
    setFilteredSearch(filtered);

    if (term === "") {
      setSearchTerm("");
      setFilteredSearch([]);
    }
  };

  const handleProfileIconClick = () => {
    setShowProfile(true);
  };

  const handleSettingIcon = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleCloseProfilePage = () => {
    setShowProfile(false);
  };

  const handleMessage = (e) => {
    const message = JSON.parse(e.data);
    if ("online" in message) {
      showOnlineusers(message.online);
    } else if ("text" in message || "file" in message) {
      if (message.sender === selectedUser) {
        setChatMessages((prev) => [
          ...prev,
          {
            ...message,
          },
        ]);
      }
    }
  };

  const connetTows = () => {
    // const ws = new WebSocket("ws://localhost:3001");
    const ws = new WebSocket(`wss://chat-app-backend-7xse.onrender.com`);
    // const ws = new WebSocket(`${apiEndPoint.replace(/^http/, 'ws:')}/https://chat-app-backend-7xse.onrender.com`);
    // const ws = new WebSocket(`${apiEndPoint.replace(/^http/, 'ws')}/`);
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      setTimeout(() => {
        console.log("Disconneted, Trying to reconnect...");
        connetTows();
      }, 1000);
    });
  };

  const showOnlineusers = (onlineusers) => {
    const users = {};
    onlineusers.forEach(({ id, username }) => {
      users[id] = username;
    });
    setOnlineUsers(users);
    // console.log(users)
  };

  // const sendMessage = (e, file = null) => {
  //   // let file = null
  //   if (e && e.preventDefault()) {e.preventDefault()}

  //      const message = { to: selectedUser, text: newMessage, file };

  //   if (file) {
  //     // Handle file messages immediately
  //     const fileName = file.name; // Save the original file name
  //     setChatMessages((prev) => [
  //       ...prev,
  //       {
  //        // Display the original file name along with the file
  //         sender: id,
  //         to: selectedUser,
  //         createdAt: new Date().toISOString(),
  //         _id: Date.now(),
  //         file: fileName, // Save the original file name in the state
  //       },
  //     ]);
  //   } else if (newMessage.trim()) {
  //     // Handle text messages immediately
  //     setNewMessage("");
  //     setChatMessages((prev) => [
  //       ...prev,
  //       {
  //         text: newMessage,
  //         sender: id,
  //         to: selectedUser,
  //         createdAt: new Date().toISOString(),
  //         _id: Date.now(),
  //       },
  //     ]);
  //   }
  //   if (!newMessage.trim() && !file) {
  //     toast.warn('Please enter a message before sending.',
  //      {
  //       position: "bottom-right",
  //     });
  //     return;
  // }

  // ws.send(JSON.stringify(message));

  // };
  const sendMessage = (e, file = null) => {
    if (e) e.preventDefault();

    const message = { to: selectedUser, text: newMessage, file };
    ws.send(JSON.stringify(message));

    if (file) {
      const fileName = file.name;
      setChatMessages((prev) => [
        ...prev,
        {
          sender: id,
          to: selectedUser,
          createdAt: new Date().toISOString(),
          _id: Date.now(),
          file: fileName,
        },
      ]);
    } else if (newMessage.trim()) {
      setNewMessage("");
      setChatMessages((prev) => [
        ...prev,
        {
          text: newMessage,
          sender: id,
          _id: Date.now(),
          createdAt: new Date().toISOString(),
          // file: file ? file.name : null,
          file: null,
        },
      ]);
    }

    if (!newMessage.trim() && !file) {
      toast.warn("Please enter a message before sending.", {
        position: "bottom-right",
      });
      return;
    }
  };

  const uploadChatfiles = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        name: e.target.files[0].name,
        data: reader.result,
      });
    };
  };

  useEffect(() => {
    axios.get("/users").then((res) => {
      const offLineUsersarr = res.data
        .filter((user) => user._id !== id)
        // .filter((user) => Object.keys(onlineUsers).includes(user._id));
        .filter((user) => !onlineUsers[user._id]);
      const offlineUsers = {};
      offLineUsersarr.forEach((u) => {
        offlineUsers[u._id] = u;
      });
      showOffLineUsers(offlineUsers);
      // console.log({offLineUsersarr, offlineUsers})
    });
  }, [id, onlineUsers]);

  useEffect(() => {
    connetTows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let div = messageBoxref.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chatMessages]);

  useEffect(() => {
    if (selectedUser) {
      axios.get(`/messages/${selectedUser}`).then((res) => {
        setChatMessages(res.data);
      });
    }
  }, [selectedUser]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mainUser = { ...onlineUsers };
  delete mainUser[id];

  useEffect(() => {
    if (username) {
      axios
        .get(`/getImages`)
        .then((res) => {
          // Make sure the response structure is as expected
          const userImagesData = {};

          res.data.map(({ sender, image }) => {
            // if (sender == id) {
            //   setImage(image);
            // }
            userImagesData[sender] = image;
          });
          // Object.keys(mainUser).map((id) => {
          // });
          setImage(userImagesData);
        })
        .catch((err) => console.log(err));
    }
  }, [username]);

  const checkMessages = _.uniqBy(chatMessages, "_id");

  return (
    <div className="flex flex-col sm:flex-row h-screen w-full overflow-hidden  bg-gray-100 dark:bg-gray-900">
      <aside className="flex">
        {/* side nav */}
        <div className="flex flex-col items-center w-[7rem] h-screen py-8 bg-white dark:bg-gray-900 dark:border-gray-700">
          <SideNav
            handleProfileIconClick={handleProfileIconClick}
            handleSettingIcon={handleSettingIcon}
            handleLogout={userLogout}
          />
        </div>

        <div className="lg:h-screen sm:h-full px-5 py-8  bg-white border-l border-r w-full md:w-[25rem] dark:bg-gray-900 dark:border-gray-700">
          {/* header name */}
          <div className="flex items-center p-3 border-2 border-gray-500 rounded-lg">
            <h2 className="flex gap-2 items-center text-[1.5rem] font-semibold text-gray-700 dark:text-gray-400 ">
              {appName}

              <span>
                <MessageSquareTextIcon
                  size={25}
                  className="text-gray-400 animate-pulse"
                  aria-hidden="true"
                  alt="message icon"
                />
              </span>
            </h2>
          </div>

          {/* nav */}
          <nav
            className={
              showProfile || showSettings
                ? `mt-4 -mx-3 space-y-6 h-full `
                : `mt-4 -mx-3 space-y-6  ${
                    isSmallScreen ? "flex flex-col h-[100vh]" : null
                  }`
            }
          >
            {/* search input field */}
            <SearchBar
              searchTerm={searchTerm}
              handleSearchInputChange={handleSearchInputChange}
              filteredSearch={filteredSearch}
              setFilteredSearch={setFilteredSearch}
              onlineUsers={onlineUsers}
            />

            {/*profile page or online users list */}
            {showProfile ? (
              <div className="h-full">
                {/* <Settings/> */}
                <ProfilePage handleCloseProfilePage={handleCloseProfilePage} />
              </div>
            ) : showSettings ? (
              <div className="h-full">
                <Settings handleCloseSettings={handleCloseSettings} />
              </div>
            ) : isSmallScreen && showChatBox && selectedUser ? (
              <ChatBox
                selectedUser={selectedUser}
                id={id}
                messageBoxref={messageBoxref}
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                newMessage={newMessage}
                sendMessage={sendMessage}
                checkMessages={checkMessages}
                username={username}
                setNewMessage={setNewMessage}
                handleCloseChatBox={handleCloseChatBox}
                sendFile={uploadChatfiles}
              />
            ) : (
              <div className="space-y-3 ">
                <label className="px-3 text-xl text-gray-500 uppercase dark:text-gray-400">
                  users:
                </label>

                {Object.keys(mainUser).map((id) => (
                  <ChatUsers
                    key={id}
                    id={id}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    image={image}
                    username={onlineUsers[id]}
                    online={true}
                  />
                ))}
                {Object.keys(offlineUsers).map((id) => (
                  <ChatUsers
                    key={id}
                    id={id}
                    online={false}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    image={image}
                    username={offlineUsers[id].username}
                  />
                ))}
              </div>
            )}
          </nav>
        </div>
      </aside>
      {/* chatbox  */}
      {!isSmallScreen && showChatBox && (
        <div className="flex-grow p-2">
          <ChatBox
            selectedUser={selectedUser}
            id={id}
            messageBoxref={messageBoxref}
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            newMessage={newMessage}
            sendMessage={sendMessage}
            checkMessages={checkMessages}
            username={username}
            setNewMessage={setNewMessage}
            sendFile={uploadChatfiles}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
