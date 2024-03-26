/* eslint-disable react/prop-types */
// import React from "react";
import { SearchIcon, UserIcon } from "lucide-react";

const SearchBar = ({
  searchTerm,
  handleSearchInputChange,
  filteredSearch,
  onlineUsers,
}) => {
  return (
    <div>
      <div className="relative">
        <span className="absolute top-2 flex items-center pl-3">
          <SearchIcon
            className="w-5 h-5 text-gray-400 animate-pulse"
            aria-hidden="true"
            alt="search icon"
          />
        </span>

        <input
          type="text"
          className="w-full py-1.5 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
          placeholder="Search users"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        {/* search results  */}
        <div className="flex h-full w-full overflow-y-auto bg-slate-900 ">
          {filteredSearch.map((id) => (
            <div
              className="flex items-center gap-1 justify-center bg-gray-950 w-full h-full"
              key={id}
            >
              <div className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 cursor-default">
                <UserIcon
                  size={18}
                  className="text-gray-400"
                  aria-hidden="true"
                  alt="user icon"
                />
                {onlineUsers[id]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
