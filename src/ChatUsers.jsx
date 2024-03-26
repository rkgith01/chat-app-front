/* eslint-disable react/prop-types */

const ChatUsers = ({
  id,
  selectedUser,
  setSelectedUser,
  image,
  username,
  online,
}) => {
  // const { username, id } = useContext(UserContext);
  const apiEndPoint = import.meta.env.BASE_URL

  return (
    <div className="mx-2 text-sm font-medium" key={id}>
      <a
        className={
          "flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" +
          (id === selectedUser
            ? "  border-l-[5px] border-blue-500 dark:bg-gray-800 dark:text-gray-200 text-gray-700"
            : "")
        }
        // href="#"
        onClick={() => setSelectedUser(id)}
      >
        {online && image?.[id] ? (
          <img
            src={`${apiEndPoint}images/${image[id]}`}
            className="object-cover w-[50px] h-[50px] rounded-full"
            alt="avatar"
          />
        ) : (
          <span className="inline-flex items-center justify-center w-[50px] h-[50px] p-3 ml-2 text-sm font-medium text-blue-500 bg-blue-100 rounded-full capitalize">
            {username ? username[0] + username[1] : "NA"}
            {/* {username[0] + username[1]} */}
          </span>
        )}

        {online ? (
          <span className="absolute bottom-[0.7rem] left-[2.8rem] w-[5px] h-[5px] p-[5px] ml-2 text-sm  bg-green-500 rounded-full border-2 border-gray-100"></span>
        ) : (
          <span
            className="absolute bottom-[0.7rem] 
          left-[2.8rem] w-[5px] h-[5px] p-[5px] ml-2 text-sm  bg-gray-500 rounded-full border-2 border-gray-100"
          ></span>
        )}

        <p className="ml-2 capitalize cursor-default">{username}</p>
      </a>
      {/* {username.length <= 0 ? "No users available" : null} */}
    </div>
  );
};

export default ChatUsers;
