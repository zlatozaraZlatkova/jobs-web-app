const Profile = require("../models/Profile");

async function getUserById(id) {
  return Profile.findOne({ ownerId: id }).populate("ownerId", [
    "name",
    "avatar",
  ]);
}

async function createItem(item) {
  return Profile.create(item);
}

async function updateItem(id, item) {
  return Profile.findOneAndUpdate(
    { ownerId: id },
    { $set: item, $currentDate: { updatedAt: true } },
    { new: true }
  );
}

module.exports = {
  getUserById,
  createItem,
  updateItem,
};
