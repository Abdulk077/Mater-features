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

const categoryoptions = [
    "All",
    "Toys",
    "Books",
    "Shoes",
    "Clothing",
    "Health",
    "Games",
    "Music",
];


// searching with fitaration
search.get("/", async (req, res) => {
    try {
        // Extracting query parameters
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let category = req.query.category || "All";
        // Extracting genre from query

        category === "All"
            ? (category = [...categoryoptions])
            : (category = req.query.category.split(","));
        // Constructing the sort
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
        let sortBy = {};
        /*const allowedFields = ["price", "rating", "name", "createdAt"];
        const allowedOrders = ["asc", "desc"];

        for (let i = 0; i < sort.length; i += 2) {
            const field = sort[i];
            const order = allowedOrders.includes(sort[i + 1])
                ? sort[i + 1]
                : "asc";

            if (allowedFields.includes(field)) {
                sortBy[field] = order;
            }

        }
        */
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "desc";
        }
        // caling the database
        const products = await Product.find({ name: { $regex: search, $options: "i" } })
            .where("category")
            .in(category)
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit);

        // Getting the total count of products
        /*const total = await Product.countDocuments({
            category: { $in: category },
            name: { $regex: search, $options: "i" },
        });*/

        // Sending the response
        const response = {
            error: false,
            //total,
            //page: page + 1,
            limit,
            category: categoryoptions,
            Product: products,
        }
        res.status(200).json(response);



    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

// exporting 
export default search;