const router = require("express").Router();

const { getProfileById } = require("../services/profileService");
const { hasUser } = require("../middlewares/guards");
const { errorParser } = require("../util/errorParser");

router.get("/", hasUser(), async (req, res) => {
  try {
    const profile = await getProfileById(req.user._id);
    console.log(req.user._id)

    if (!profile) {
      return res.status(404).json({ message: "There is no profile for this user" });
    }

    res.status(200).json(profile);

  } catch (error) {
    console.log(error);
    const message = errorParser(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
