const EmployeeProfile = require("../models/EmployeeProfile");

async function getAllProfiles(startIndex = 0, limit = 10) {

  const paginatedProfiles = await EmployeeProfile.find({})
    .sort({ date: -1 })
    .skip(startIndex)
    .limit(limit)

  const totalProfiles = await EmployeeProfile.countDocuments();

  return { paginatedProfiles, totalProfiles };
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
  return EmployeeProfile.findOneAndDelete({ ownerId: id });

}

async function updatedProfileExpOrEduc(userId, arrayName, newItem) {
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


async function getSearchEmployee(skills, experience, education) {
  const query = {};

  if (skills) {
    const data = skills.split(',').map(skill => skill.trim());
    query.skills = { $in: data.map(skill => new RegExp(skill, 'i')) };
  }

  if (experience) {
    query['experience.title'] = { $regex: experience, $options: 'i' };
  }
  if (education) {
    query['education.degree'] = { $regex: experience, $options: 'i' };
  }

  return EmployeeProfile.find(query);
}


module.exports = {
  getAllProfiles,
  getProfileById,
  getUserById,
  createItem,
  updateItem,
  deleteById,
  updatedProfileExpOrEduc,
  deleteProfileExpOrEduc,
  getSearchEmployee
}
