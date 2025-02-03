const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");
const profileController = require("../controllers/profileController");
const postsController = require("../controllers/postsController");
const jobsController = require("../controllers/jobsController");
const defaultController = require("../controllers/defaultController");

module.exports = (app) => {
  app.use("/api/auth", authController);
  app.use("/api/users", usersController);
  app.use("/api/profile", profileController);
  app.use("/api/posts", postsController);
  app.use("/api/jobs", jobsController);

  app.use(defaultController);
};
