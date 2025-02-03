const EmployeeProfile = require("../models/EmployeeProfile");

async function getAllProfiles() {
  return EmployeeProfile.find({}).sort({ date: -1 });
}

async function getProfileById(id) {
  return EmployeeProfile.findById(id);
}

async function getUserById(id) {
  return EmployeeProfile.findOne({ ownerId: id }).populate("ownerId", [
    "name",
    "avatar",
  ]);
}

async function createItem(item) {
  return EmployeeProfile.create(item);
}

async function updateItem(id, item) {
  return EmployeeProfile.findOneAndUpdate(
    { ownerId: id },
    { $set: item, $currentDate: { updatedAt: true } },
    { new: true }
  );
}

async function deleteById(id) {
  return EmployeeProfile.findOneAndDelete({ ownerId: id});

}

async function updatedProfileExpOrEduc(userId, arrayName, newItem){
  return EmployeeProfile.findOneAndUpdate(
    { ownerId: userId },
    { $push: { [arrayName]: newItem } },
    { new: true }
  );
}


async function deleteProfileExpOrEduc(userId, arrayName, paramsId) {
  return EmployeeProfile.findOneAndUpdate(
    { ownerId: userId },
    { $pull: { [arrayName]: { _id: paramsId } } },
    { new: true }
);

  
}

module.exports = {
  getAllProfiles,
  getProfileById,
  getUserById,
  createItem,
  updateItem,
  deleteById, 
  updatedProfileExpOrEduc,
  deleteProfileExpOrEduc
};
