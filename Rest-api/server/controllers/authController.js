const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { register } = require("../services/authService");

router.post("/register",
  body("name", "Name is required").not().isEmpty(),
  body("name", "Please enter a name with 2 or more character").isLength({ min: 2 }),
  body("email", "Email is required").not().isEmpty(),
  body("email", "Please provide a valid email address").isEmail(),
  body("password", "Please enter a password with 8 or more characters").isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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

    } catch(err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
