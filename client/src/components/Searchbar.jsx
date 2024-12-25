import React, { useState } from "react";

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value); // Trigger search on every input change
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex border rounded-lg w-full max-w-md">
        <input
          type="text"
          className="w-full px-4 py-2 text-gray-700 bg-white border-none rounded-l-lg focus:outline-none"
          placeholder="Search by name..."
          value={query}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Searchbar;

