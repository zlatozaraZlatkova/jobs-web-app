const router = require("express").Router();
const { body } = require("express-validator");

const { register, login, logout, validateUserToken} = require("../services/authService");
const { hasUser } = require("../middlewares/guards");
const validateRequest = require("../middlewares/validateBodyRequest");

router.post("/register",
  body("name", "Name is required").not().isEmpty(),
  body("name", "Please enter a name with 2 or more character").isLength({ min: 2}),
  body("email", "Email is required").not().isEmpty(),
  body("email", "Please provide a valid email address").isEmail(),
  body("role", "Role is required").not().isEmpty(),
  body("password","Please enter a password with 8 or more characters").isLength({ min: 8 }),
  validateRequest,
  async (req, res, next) => {
    try {
      const { _id, email, accessToken, role } = await register(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.role
      );

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in ms
        secure: false, // true in production
        sameSite: "lax",
      });

      res.status(200).json({ _id, email, role });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login",
  body("email", "Email is required").not().isEmpty(),
  body("email", "Please provide a valid email address").isEmail(),
  body("password", "Password is required").not().isEmpty(),
  validateRequest,
  async (req, res, next) => {
    try {

      const { _id, email, accessToken, role } = await login(
        req.body.email,
        req.body.password
      );

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in ms
        secure: false, // true in production
        sameSite: "lax",
      });

      res.status(200).json({ _id, email, role });

    } catch (error) {
      next(error);
    }
  }
);

router.get("/logout", hasUser(), async (req, res, next) => {
  const token = req.cookies.jwt;
  try {

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    await logout(token);

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});


router.get("/validate", async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    
    const userData = await validateUserToken(token);
    
    res.json({
      _id: userData._id,
      email: userData.email,
      role: userData.role,
    });
    
  } catch (error) {
    console.error("Token validation error:", error.message);
    next(error);
  }
});

module.exports = router;
