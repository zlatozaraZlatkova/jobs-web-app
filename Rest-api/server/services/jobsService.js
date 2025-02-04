const Job = require("../models/Job");
const Company = require("../models/Company");
const EmployerProfile = require("../models/EmployerProfile");

async function getAll() {
  return Job.find({}).sort({ date: -1 });
}

async function getCompanyByUserId(userId) {
  return Company.findOne({ ownerId: userId });
}


async function createItem(userId, jobData) {

  const job = await Job.create(jobData);

  await Company.findOneAndUpdate(
    { ownerId: userId },
    { $push: { listOfOpenJobs: job._id } },
    { new: true }
  );

  await EmployerProfile.findOneAndUpdate(
    { ownerId: userId },
    { $push: { postedJobs: job._id } },
    { new: true }
  )

  return job;
}

module.exports = {
  getAll,
  getCompanyByUserId,
  createItem
}