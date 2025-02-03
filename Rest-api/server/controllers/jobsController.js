const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { errorParser } = require("../util/errorParser");
const { getAll } = require("../services/jobsService");

router.get("/", hasUser(), async (req, res) => {
  try {
    const jobsCatalog = await getAll();

    if (jobsCatalog.length == 0) {
      return res.status(404).json({ message: "No jobs available yet" });
    }

    res.status(200).json(jobsCatalog);

  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }
});


module.exports = router;
