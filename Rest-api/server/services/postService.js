const Post = require("../models/Post");
const User = require("../models/User");

async function getAll() {
  return Post.find({}).sort({ date: -1 });
}

async function getById(id) {
  return Post.findById(id);
}

async function getByUserId(id) {
  return User.findById(id).populate(["name", "avatar"]);
}

async function createItem(userId, data) {
  const newItem = await Post.create(data);
  await User.findByIdAndUpdate(
    userId,
    { $push: { createdPosts: newItem._id } },
    { new: true }
  );

  return newItem;
}

async function updateItem(id, item) {
  return Post.findOneAndUpdate(
    { _id: id },
    { $set: item, $currentDate: { updatedAt: true } },
    { new: true }
  );
}

async function deleteById(postId, userId) {
  await User.findByIdAndUpdate(userId, { $pull: { createdPosts: postId } }, { new: true });
  await Post.findByIdAndDelete(postId);
};

async function createComment(postId, newItem) {
 
  return Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: newItem } },
    { new: true }
  )
}

async function deleteComment(postId, commentId) {

  await Post.findByIdAndUpdate(
    { _id: postId },
    { $pull: { comments: {_id: commentId } } },
    { new: true }
  )

  
}




module.exports = {
  getAll,
  getById,
  getByUserId,
  createItem,
  updateItem,
  deleteById,
  createComment,
  deleteComment
};
