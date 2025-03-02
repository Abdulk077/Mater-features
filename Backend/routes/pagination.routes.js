import { Router } from "express";
import User from "../model/user.model.js";

const pagination = Router();

pagination.get("/", async (req, res) => {
  try {
    const { limit = 10, cursor, prevCursor } = req.query;
    const query = {};

    if (cursor) {
      query._id = { $lt: cursor };
    } else if (prevCursor) {
      query._id = { $gt: prevCursor };
    }
    
    const items = await User.find(query)
      .sort({ _id:  -1 })
      .limit(parseInt(limit) + 1);

    let nextCursor = null;
    let prevCursorOut = null;
    if (items.length > limit) {
      if (prevCursor) {
        prevCursorOut = items[0]._id; // Move forward
      } else {
        nextCursor = items[limit - 1]._id; // Move backward
        items.pop(); // Remove last item
      }
    }
    if (!prevCursor && items.length > 0) {
      prevCursorOut = items[0]._id;
    }

    res.json({
      items,
      nextCursor,
      prevCursor: prevCursorOut,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
pagination.get("/posts", async (req, res) => {
  try {
    const { cursor, limit, direction } = req.query;
    const parsedLimit = parseInt(limit) || 10;
    const paginationDirection = direction === "prev" ? "prev" : "next";

    const data = await getPaginatedResults(
      cursor,
      parsedLimit,
      paginationDirection
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default pagination;

const getPaginatedResults = async (cursor, limit = 10, direction = "next") => {
  let query = {};
  let sort = { _id: -1 };

  if (cursor) {
    query._id = direction === "next" ? { $lt: cursor } : { $gt: cursor };
    sort = direction === "next" ? { _id: -1 } : { _id: 1 };
  }

  let results = await User.find(query).sort(sort).limit(limit).exec();

  if (direction === "prev") results.reverse(); // Keep order consistent

  const nextCursor =
    results.length > 0 ? results[results.length - 1]._id : null;
  const prevCursor = results.length > 0 ? results[0]._id : null;

  return { results, nextCursor, prevCursor };
};
