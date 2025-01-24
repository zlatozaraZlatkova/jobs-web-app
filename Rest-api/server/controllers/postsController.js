const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");

router.get("/", hasUser(), async (req, res) => {
  res.status(200).json({ message: "Posts route" });
});

module.exports = router;
