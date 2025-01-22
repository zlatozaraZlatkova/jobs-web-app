const router = require("express").Router();

router.get("/", async (req, res) => {
  res.status(200).json({ message: "Auth route" });
});

module.exports = router;
