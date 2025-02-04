const Post = require("../models/Post");
const Job = require("../models/Job");
const { errorParser } = require("../util/errorParser");

const modelsMap = {
  'Post': Post,
  'Job': Job,

};

const loadItem = (modelName) => async (req, res, next) => {
  try {
    const Model = modelsMap[modelName];

    const item = await Model.findById(req.params.id);
    console.log(item)

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    req.item = item;

    next();
    
  } catch (error) {
    console.log(error)
    const message = errorParser(error);
    res.status(400).json({ message });
  }
};

module.exports = {
  loadItem,
};
