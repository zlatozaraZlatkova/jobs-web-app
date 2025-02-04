const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { hasUser, checkUserRole } = require("../middlewares/guards");
const { errorParser } = require("../util/errorParser");
const { getAll, getCompanyByUserId, createItem } = require("../services/jobsService");

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

router.post("/create", hasUser(), checkUserRole("employer"),
  body("title", "Title is required").not().isEmpty(),
  body("title", "Please enter a title up to 150 characters long").isLength({ max: 150 }),
  body("type", "Type is required").not().isEmpty(),
  body("type", "Please enter a type up to 150 characters long").isLength({ max: 150 }),
  body("description", "Job description is required").not().isEmpty(),
  body("description", "Please enter a description up to 3000 characters long").isLength({ max: 3000 }),
  body("location", "Location is required").not().isEmpty(),
  body("location", "Please enter a location up to 50 characters long").isLength({ max: 50 }),
  body("salary", "Salary is required").not().isEmpty(),
  body("salary", "Please enter a salary up to 50 characters long").isLength({ max: 50 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errorParser(errors.array());
      return res.status(400).json({ message });
    }

    try {
      const company = await getCompanyByUserId(req.user._id);

      if (!company) {
        res.status(400).json({ message: "Company not found" })
      }

      const newJob = {
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        location: req.body.location,
        salary: req.body.salary,
        ownerId: req.user._id,
        company: company._id
      }

      const createJob = await createItem(req.user._id, newJob);

      res.status(200).json(createJob);

    } catch (error) {
      console.log(error)
      const message = errorParser(error);
      res.status(400).json({ message });
    }

  })


module.exports = router;
