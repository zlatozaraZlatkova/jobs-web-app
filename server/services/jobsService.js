const Job = require("../models/Job");
const Company = require("../models/Company");
const EmployerProfile = require("../models/EmployerProfile");
const EmployeeProfile = require("../models/EmployeeProfile");

async function getAll(skip = 0, limit = 3, technology = null) {
  const query = {};

  if (technology) {
    query.technologies = technology;
  }

  const paginatedJobs = await Job.find(query)
    .sort({ createdAt: -1, _id: 1 })
    .skip(skip)
    .limit(limit);


  const totalJobs = await Job.countDocuments(query);

  return { paginatedJobs, totalJobs };
}

async function getJobsList() {

  return await Job.find({}).sort({ createdAt: -1 });

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

async function deleteById(jobId, userId) {
  await Company.findOneAndUpdate(
    { ownerId: userId },
    { $pull: { listOfOpenJobs: jobId } },
    { new: true }
  );

  await EmployerProfile.findOneAndUpdate(
    { ownerId: userId },
    { $pull: { postedJobs: jobId } },
    { new: true }
  );

  await Job.findByIdAndDelete(jobId);
}

async function getSearchItem(title, type, location, salary, skip = 0, limit = 3) {
  const query = {};

  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }
  if (type) {
    query.type = { $regex: type, $options: 'i' };
  }
  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }
  if (salary) {
    query.salary = { $regex: salary, $options: 'i' };
  }
  const paginatedJobs = await Job.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments();

  return { paginatedJobs, totalJobs }

}

async function pinItem(jobId, userId) {

  await EmployeeProfile.findOneAndUpdate(
    { ownerId: userId },
    { $push: { pinnedJobList: jobId } },
    { new: true }
  );

  await Job.findByIdAndUpdate(
    jobId,
    { $push: { pinnedByEmployees: userId } },
    { new: true }
  );

}

async function unpinItem(jobId, userId) {
  await EmployeeProfile.findOneAndUpdate(
    { ownerId: userId },
    { $pull: { pinnedJobList: jobId } },
    { new: true });

  console.log("userId", userId)

  await Job.findByIdAndUpdate(jobId,
    { $pull: { pinnedByEmployees: userId } },
    { new: true })
}





module.exports = {
  getAll,
  getCompanyByUserId,
  createItem,
  updateItem,
  getJobById,
  deleteById,
  getSearchItem,
  getJobsList,
  pinItem,
  unpinItem
}