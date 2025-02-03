const Job = require("../models/Job");


async function getAll() {
  return Job.find({}).sort({ date: -1 });
}

module.exports = {
    getAll
}