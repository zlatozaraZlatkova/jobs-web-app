const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");
const profileController = require("../controllers/profileController");
const postsController = require("../controllers/postsController");
const catalogController = require("../controllers/catalogController");
const defaultController = require("../controllers/defaultController");

module.exports = (app) => {
  app.use("/api/auth", authController);
  app.use("/api/users", usersController);
  app.use("/api/profile", profileController);
  app.use("/api/posts", postsController);
  app.use("/api/catalog", catalogController);

  app.use(defaultController);
};
