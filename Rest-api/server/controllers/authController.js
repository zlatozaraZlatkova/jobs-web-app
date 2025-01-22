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
      const token = await register(
        req.body.name,
        req.body.email,
        req.body.password
      );

      res.status(200).json(token);

    } catch(err) {
      console.log(err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
