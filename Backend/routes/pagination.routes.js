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
      .sort({ _id: prevCursor ? 1 : -1 })
      .limit(parseInt(limit) + 1);

    let nextCursor = null;
    let prevCursorOut = null;
    if (items.length > limit) {
      if (prevCursor) {
        prevCursorOut = items[0]._id; // Move forward
        items.shift(); // Remove first item
      } else {
        nextCursor = items[limit - 1]._id; // Move backward
        items.pop(); // Remove last item
      }
    }
    if (!prevCursor && items.length > 0) {
      prevCursorOut = items[0]._id.toString();
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

export default pagination;
