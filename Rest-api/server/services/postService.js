const Post = require("../models/Post");

async function getAll() {
    return Post.find({}).sort({ date: -1 });
}

async function getById(id) {
    return Post.findById(id);
}


module.exports = {
    getAll,
    getById
}    