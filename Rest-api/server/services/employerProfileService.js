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

module.exports = {
  getUserById,
  createItem,
  getCompanyByUserId
};
