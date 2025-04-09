const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");
const employeeProfileController = require("../controllers/employeeProfileController");
const employerProfileController = require("../controllers/employerProfileController");
const postsController = require("../controllers/postsController");
const jobsController = require("../controllers/jobsController");
const defaultController = require("../controllers/defaultController");

module.exports = (app) => {
  app.use("/api/auth", authController);
  app.use("/api/users", usersController);
  app.use('/api/profile', employeeProfileController);
  app.use('/api/company', employerProfileController);
  app.use("/api/posts", postsController);
  app.use("/api/jobs", jobsController);

  app.use(defaultController);
};
