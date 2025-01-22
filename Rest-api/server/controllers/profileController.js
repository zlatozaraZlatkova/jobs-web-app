const router = require("express").Router();

router.get("/", async (req, res) => {
  res.status(200).json({ message: "User profile route" });
});

module.exports = router;
