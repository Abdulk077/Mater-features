import React from "react";

const categories = ["All", "Electronics", "Books", "Clothing", "Home"];
const FilterControls = ({
  setFilterCategory
}) => {
  return (
    <div className="p-4">
      <select
        className="select select-bordered w-full max-w-xs"
        value={setFilterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterControls;
