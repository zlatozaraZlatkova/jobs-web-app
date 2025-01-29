const Profile = require("../models/Profile");

async function getAllProfiles() {
  return Profile.find({}).sort({ date: -1 });
}

async function getProfileById(id) {
  return Profile.findById(id);
}

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

async function updateExperience(id, item) {
  return Profile.findOneAndUpdate(
    { ownerId: id },
    { $push: { experience: item } },
    { new: true }
  );
}

async function updateEducation(id, item) {
  return Profile.findOneAndUpdate(
    { ownerId: id },
    { $push: { education: item } },
    { new: true }
  );
}



async function deleteById(id) {
  return Profile.findOneAndDelete({ ownerId: id});

}

module.exports = {
  getAllProfiles,
  getProfileById,
  getUserById,
  createItem,
  updateItem,
  deleteById, 
  updateExperience,
  updateEducation
};
