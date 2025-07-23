import express from "express";
import mongoose from "mongoose";
import User from "./model/user.model.js";
import pagination from "./routes/pagination.routes.js";
import connectDB from "./db/db.js";
import cors from "cors"; // added
import search from "./routes/searching.routes.js";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // added

// Create an item
// Get paginated items
app.use("/pagination", pagination);
app.use("/search",search);
// Delete an item by ID
app.get("/", async (req, res) => {
  res.send("Testing api");
});
app.listen(PORT, async () => {
  console.log(
    `Subscription Tracker API is running on http://localhost:${PORT}`
  );

  await connectDB();
});

export default app;
