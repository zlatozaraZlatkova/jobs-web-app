const EmployerProfile = require("../models/EmployerProfileSchema");
const Company = require("../models/Company");

async function getUserById(id) {
  return EmployerProfile.findById(id);
}

async function getCompanyByUserId(userId) {
  return Company.findOne({ ownerId: userId });
 }
 

async function createItem(userId, data) {
  const newCompany = await Company.create(data);

  const employerProfile = await EmployerProfile.create({
    companyId: newCompany._id,
    ownerId: userId,
  });

  return { company: newCompany, profile: employerProfile };
}


async function updateItem(id, item) {
  return Company.findOneAndUpdate(
    { _id: id },
    { $set: item, $currentDate: { updatedAt: true } },
    { new: true }
  );
}

async function deleteCompanyAndProfile(userId) {
  const company = await Company.findOneAndDelete({ ownerId: userId });
  const profile = await EmployerProfile.findOneAndDelete({ ownerId: userId });
  return { company, profile };
};




module.exports = {
  getUserById,
  createItem,
  getCompanyByUserId,
  updateItem,
  deleteCompanyAndProfile
};
