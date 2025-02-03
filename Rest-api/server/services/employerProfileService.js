const EmployerProfile = require("../models/EmployerProfileSchema");


async function getUserById(id) {
  return EmployerProfile.findById(id);
}





module.exports = {
  getUserById,
  
};
