const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { register, login, logout } = require("../services/authService");
const { hasUser } = require("../middlewares/guards");
const { errorParser } = require("../util/errorParser");

router.post("/register",
  body("name", "Name is required").not().isEmpty(),
  body("name", "Please enter a name with 2 or more character").isLength({ min: 2 }),
  body("email", "Email is required").not().isEmpty(),
  body("email", "Please provide a valid email address").isEmail(),
  body("password", "Please enter a password with 8 or more characters").isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errorParser(errors.array());
      return res.status(400).json({ message });
    }  

    try {
      const { _id, email, accessToken } = await register(
        req.body.name,
        req.body.email,
        req.body.password
      );

      res.cookie('jwt', accessToken, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in ms
        secure: false, // true in production
        sameSite: 'lax'
      });

      res.status(200).json({ _id, email });

    } catch (error) {
      const message = errorParser(error);
      res.status(400).json({ message });
    }
  });

router.post("/login",
  body("email", "Email is required").not().isEmpty(),
  body("email", "Please provide a valid email address").isEmail(),
  body("password", "Password is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errorParser(errors.array());
      return res.status(400).json({ message });
    }

    try {
      const { _id, email, accessToken } = await login(
        req.body.email,
        req.body.password
      );

      res.cookie('jwt', accessToken, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in ms
        secure: false, // true in production
        sameSite: 'lax'
      });

      res.status(200).json({ _id, email });

    } catch (error) {
      const message = errorParser(error);
      res.status(400).json({ message });

    }

  })


router.get("/logout", hasUser(), async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    await logout(token);

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'lax'
    });

    res.status(204).end();

  } catch (error) {
    const message = errorParser(error);
    res.status(500).json({ message });
  }
})



module.exports = router;

