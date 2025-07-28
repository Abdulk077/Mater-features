import React, { useState, useEffect } from "react";
//import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";
import FilterControls from "../components/FilterControls";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";

const Searching = () => {
  const [loading, setLoading] = useState(false);
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sortby: "rating", order: "desc" });
  const [search, setSearch] = useState("");
  const [filtercategry, setFilterCategor] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Fetch products based on search, sort, filter, and pagination
    setLoading(true);
    const products = async () => {
      try {
        const url = `http://localhost:3000/search?page=${page}&limit=10&search=${search}&sort=${sort.sortby},${sort.order}&category=${filtercategry}`;
        const { data } = await axios.get(url);
        setObj(data);
        console.log(data);
        setLoading(false);
        console.log(sort);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    products();
  }, [sort, search, filtercategry, page]);
  return (
    <div className="container mx-auto p-4">
      <div className="flex  items-center">
        <SearchBar setSearch={setSearch} />
        <SortControls setSort={setSort} />
        <FilterControls setFilterCategory={setFilterCategor} />
      </div>
      <div className="grid-3 justify-between items my-4">
        <ProductList Product={obj.Product || []} loading={loading} />
      </div>
    </div>
  );
};

export default Searching;
