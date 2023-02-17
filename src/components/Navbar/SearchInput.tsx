import React from "react";

const SearchInput: React.FC = () => {
  return (
    <div className="flex flex-grow mr-2 items-center">
      <input
        type="text"
        className="h-9 w-full bg-gray-100 rounded-xl px-2 py-2 placeholder:text-sm border-2 hover:border-blue-500 focus:outline-none focus:border-blue-500"
        name="search-key"
        placeholder="search pureddit"
      />
    </div>
  );
};

export default SearchInput;
