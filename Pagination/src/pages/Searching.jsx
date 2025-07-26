import React, { useState, useEffect } from "react";
//import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar";
//import SortControls from "../components/SortControls";
//import FilterControls from "../components/FilterControls";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";

const Searching = () => {
    const [loading , setLoading] = useState(false);
    const [obj, setObj] = useState({});
    const [sort,setSort] = useState({sort: "rating", order: "desc"});
    const [search, setSearch] = useState("");
    const [filtercategry, setFilterCategory] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() =>{
        setLoading(true);
        const products = async () => {
            try{
                const url = `http://localhost:3000/search?page=${page}&limit=10&search=${search}&sort=${sort.sort},${sort.order}&category=${filtercategry.join(",")}`;
                const {data} = await axios.get(url);
                setObj(data);
                console.log(data);
                setLoading(false);
            }catch(err){
                console.error("Error fetching products:", err);
            }
        };
        products();
    }, [sort, search, filtercategry, page]);
    return (
      <div className="container mx-auto p-4">
        <div>
          <SearchBar setSearch={setSearch} />
        </div>
        <div className="grid justify-between items my-4">
          <ProductList Product={obj.Product || []}  loading={loading}/>
        </div>

      </div>
    );
};

export default Searching;
