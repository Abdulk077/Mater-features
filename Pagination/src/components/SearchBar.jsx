import React from "react";

const SearchBar = ({ setSearch }) => {
    // seting serch value here 
  return (
    <div className="form-control w-full max-w-xs">
      <input
        type="text"
        placeholder="Search products..."
        className="input input-bordered w-full"
        onChange={({currentTarget:input}) => setSearch(input.value)}
      />
    </div>
  );
};

export default SearchBar;
