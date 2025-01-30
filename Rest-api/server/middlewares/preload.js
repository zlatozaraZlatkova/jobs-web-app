const Post = require("../models/Post");

const loadItem = async (req, res, next) => {
  try {
    const item = await Post.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    req.item = item;

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  loadItem,
};
