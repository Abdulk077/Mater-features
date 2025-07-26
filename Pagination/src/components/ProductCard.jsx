import React from "react";

const ProductCard = ({ product }) => {
    return (
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={product.imageUrl || "https://via.placeholder.com/150"}
            alt={product.name || "No name available"}
            className="h-48 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name || "No Name Available"}</h2>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xl font-bold">${product.price || "N/A"}</span>
            <span className="badge badge-secondary">
              {product.category || "Unknown"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐ {product.rating}</span>
            <span className="text-sm text-gray-500">
              ({product.numReviews} reviews)
            </span>
          </div>
        </div>
      </div>
    );

};

export default ProductCard;
