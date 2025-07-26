import React from "react";

const FilterControls = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="p-4">
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
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
