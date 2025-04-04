const EmployerProfile = require("../models/EmployerProfile");
const Company = require("../models/Company");

async function getAll(startIndex = 0, limit = 10) {
  const paginatedCompanies = await Company.find({})
    .sort({ date: -1 })
    .skip(startIndex)
    .limit(limit);

  const totalCompanies = await Company.countDocuments();

  return { paginatedCompanies, totalCompanies };
}

async function getUserById(userId) {
  return EmployerProfile.findOne({ ownerId: userId })
    .populate("companyId", [
      "companyName",
      "companyLogo",
      "contactEmail",
      "contactPhone",
      "description",
    ])
    .populate("ownerId", ["name", "avatar", "email"])
    .populate("postedJobs", ["title", "techStack", "location"]);
}

async function getCompanyById(companyId) {
  return Company.findOne({ _id: companyId });
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
}

module.exports = {
  getAll,
  getCompanyById,
  getUserById,
  createItem,
  getCompanyByUserId,
  updateItem,
  deleteCompanyAndProfile,
};
