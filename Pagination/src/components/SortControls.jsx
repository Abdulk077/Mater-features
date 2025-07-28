import React from "react";

const SortControls = ({ setSort }) => {
  return (
    <div className="flex gap-4 p-4">
      <select
        className="select select-bordered w-full max-w-xs"
        value={setSort}
        onChange={(e) => setSort("sortby",e.target.value)}
      >
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="createdAt">Date</option>
      </select>

      <select
        className="select select-bordered w-full max-w-xs"
        value={setSort}
        onChange={(e) => setSort("order", e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortControls;
