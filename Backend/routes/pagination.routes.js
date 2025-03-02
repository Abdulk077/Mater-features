
import { Router} from "express";
import User from "../model/user.model.js";



const pagination = Router();

pagination.get("/", async (req, res) => {
  try {
    const { limit = 10, cursor } = req.query;
    const query = {};

    if (cursor) {
      query._id = { $lt: cursor };
    }
    


    const items = await User.find(query)
      .sort({ _id: -1 })
      .limit(parseInt(limit) + 1);

    let nextCursor = null;
    if (items.length > limit) {
      nextCursor = items[limit-1]._id;
      items.pop();
    }

    res.json({ items, nextCursor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default pagination;


