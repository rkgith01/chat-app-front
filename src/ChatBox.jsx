/* eslint-disable react/prop-types */
import axios from "axios";
import {
  ArrowLeft,
  Check,
  CheckCheck,
  MessageCircle,
  Paperclip,
  Send,
} from "lucide-react";
// import { useEffect } from "react";
import InputEmoji from "react-input-emoji";
import { ToastContainer } from "react-toastify";

const ChatBox = ({
  selectedUser,
  username,
  checkMessages,
  id,
  sendMessage,
  setNewMessage,
  newMessage,
  messageBoxref,
  handleCloseChatBox,
  sendFile,
}) => {
  const isSmallScreen = window.innerWidth <= 640;

  return (
    <div
      className={
        isSmallScreen
          ? " flex flex-col justify-end  h-[82vh]"
          : "flex flex-col h-full justify-end"
      }
    >
      <div
        className={
          selectedUser
            ? "hidden"
            : "flex w-full justify-center items-center p-2 h-full"
        }
      >
        {!selectedUser && (
          <div className="flex-grow my-4">
            <div className="flex flex-col items-center">
              {/* <h1 className="text-3xl capitalize text-gray-500 font-bold px-1 mb-[1rem]"> Chat app </h1> */}

              <img
                src="/logo.png"
                alt="logo"
                className="w-40 h-40 rounded-full p-2 mb-5"
              />

              <h2 className="text-3xl capitalize text-gray-500 font-bold px-1">
                Welcome, {username}
              </h2>

              <br />
              <p className="text-gray-100 flex gap-1">
                Select a user to start messaging
                <MessageCircle />
              </p>
            </div>
          </div>
        )}
      </div>

      <div className=" p-2 overflow-y-scroll">
        {!!selectedUser && (
          <>
            <span className="cursor-pointer absolute top-[12rem] xs:top-[10rem] lg:hidden md:hidden text-gray-600 bg-gray-950 rounded">
              <ArrowLeft
                onClick={() => {
                  handleCloseChatBox();
                }}
              />
            </span>
            <div className="inline-flex-col-reverse mb-4 ml-auto">
              {checkMessages.map((message, index) => (
                <div
                  className={`flex items-end mb-2 ${
                    message.sender === id ? "justify-end" : "justify-start"
                  }`}
                  key={index}
                >
                  <div
                    className={`p-2 ${
                      message.sender === id
                        ? "bg-blue-500  ml-auto"
                        : "bg-gray-500 mr-auto"
                    } rounded-lg max-w-[80%]`}
                  >
                    {/* <div className="text-gray-200 text-sm">
                      {message.sender === id ? "You" : username}
                    </div> */}

                    {/* {console.log(axios.defaults.baseURL)} */}
                    {message.text}
                    {/* {console.log(message.file)} */}
                    {message.file && (
                      <div>
                        <a
                          href={
                            axios.defaults.baseURL + "/uploads/" + message.file
                          }
                          target="_blank"
                        >
                          {message.file}
                        </a>
                      </div>
                    )}

                    {/* message time */}
                    <div className="flex justify-between gap-2 items-center text-gray-400 text-xs mt-1">
                      {new Date(message.createdAt).toLocaleTimeString()}
                      <div className="text-gray-400 text-xs">
                        {message.to === selectedUser ? (
                          <CheckCheck size={15} />
                        ) : message.sender === id ? (
                          <Check size={15} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messageBoxref}></div>
            </div>
          </>
        )}
      </div>

      {/* Input Message form */}
      {!!selectedUser && (
        <form className="p-2 flex items-center justify-center">
          <label htmlFor="chat" className="sr-only">
            Message
          </label>

          <InputEmoji
            value={newMessage}
            onChange={(newText) => setNewMessage(newText)}
            placeholder="Type a message"
            id="chat"
            onEnter={() => sendMessage(null)}
          />

          <label className="p-1 m-1 cursor-pointer">
            <input type="file" className="hidden" onChange={sendFile} />
            <Paperclip
              size={35}
              className="rounded p-1 bg-blue-500 text-white"
            />
          </label>

          <button type="button" className="p-1 m-1" onClick={sendMessage}>
            <Send size={35} className="rounded p-1 bg-blue-500 text-white" />
          </button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default ChatBox;
