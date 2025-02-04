const Job = require("../models/Job");
const Company = require("../models/Company");
const EmployerProfile = require("../models/EmployerProfile");

async function getAll() {
  return Job.find({}).sort({ date: -1 });
}

async function getJobById(jobId) {
  return Job.findOne({ _id: jobId });
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

async function updateItem(id, item) {
  return Job.findOneAndUpdate(
    { _id: id },
    { $set: item, $currentDate: { updatedAt: true } },
    { new: true }
  );
}




module.exports = {
  getAll,
  getCompanyByUserId,
  createItem,
  updateItem,
  getJobById
}