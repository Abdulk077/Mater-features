import { Router } from "express";

import User from "../model/user.model.js";
import Product from "../model/products.model.js";
const search = Router();

// normal searching
search.get("/s", async (req, res) => {
    const { query } = req.query;

    try {
        if (query && query.trim() !== "") {
            const Products = await Product.find({
                name: { $regex: query, $options: "i" },
            }).limit(10);
            return res.json(Products);
        } else {
            const Products = await Product.find({}).limit(20);
            return res.json(Products);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// searching with fitaration
search.get("/", async (req, res) => {
    try {
        const { search, category, brand } = req.query;

        const query = {};

        const andConditions = [];

        // 🔍 Search using regex on name, brand, or description
        if (search) {
            const regex = new RegExp(search, "i"); // case-insensitive
            andConditions.push({
                $or: [{ name: regex }, { brand: regex }, { description: regex }],
            });
        }

        // 🏷️ Filter by category (exact match)
        if (category) {
            andConditions.push({ category });
        }

        // 🏷️ Filter by brand (case-insensitive exact match using regex)
        if (brand) {
            const brandRegex = new RegExp(brand.trim(), "i");
            andConditions.push({ brand: brandRegex });

        }

        if (andConditions.length > 0) {
            query.$and = andConditions;
        }

        const products = await Product.find(query).limit(10);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }

});

// exporting 
export default search;