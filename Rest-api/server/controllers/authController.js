const router = require("express").Router();
const { body, validationResult } = require("express-validator");

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

    res.status(200).json({ message: "Registered user" })
  });



module.exports = router;
