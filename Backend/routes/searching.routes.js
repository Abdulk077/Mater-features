import { Router } from "express";

import User from "../model/user.model.js";
import Product from "../model/products.model.js";
const search = Router();

// normal searching
search.get("/", async (req, res) => {
    const { query } = req.query;

    try {
        if(query && query.trim() !== "") {
            const Products = await Product.find({
                name: { $regex: query, $options: "i" },
            }).limit(10);
            return res.json(Products);
        }else{
            const Products = await Product.find({}).limit(20);
            return res.json(Products);
        }
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// exporting 
export default search;