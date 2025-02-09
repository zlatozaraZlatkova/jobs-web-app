const router = require("express").Router();
const { body } = require("express-validator");
const validateRequest = require("../middlewares/validateBodyRequest");

const { loadItem } = require("../middlewares/preload");
const { hasUser, checkUserRole, isOwner } = require("../middlewares/guards");
const { getAll, getCompanyByUserId, createItem, updateItem, deleteById, getSearchItem } = require("../services/jobsService");

// @route GET /api/jobs/search?title=Java
// @route GET /api/jobs/search?title=React&type=Full-time&location=Brooklyn&salary=70

router.get("/search", async (req, res, next) => {
  try {
    const { title, type, location, salary } = req.query;

    const jobs = await getSearchItem(title, type, location, salary);

    if (!jobs?.length) {
      throw new Error("No jobs matched your search.");
    }

    res.status(200).json(jobs);

  } catch (error) {
    next(error);

  }
});

router.get("/", hasUser(), async (req, res, next) => {
  try {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;


    const { paginatedJobs, totalJobs } = await getAll(startIndex, limit);

    const totalPages = Math.ceil(totalJobs / limit);

    if (paginatedJobs.length === 0) {
      throw new Error("No jobs available yet.");
    }

    res.status(200).json({
      success: true,
      paginatedJobs,
      pagination: {
        currentPage: page,
        totalPages,
        totalJobs,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    next(error);
  }
});


router.get("/:id", hasUser(), loadItem("Job"), async (req, res, next) => {
  try {
    const job = req.item;

    res.status(200).json(job);

  } catch (error) {
    next(error);
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
  validateRequest,
  async (req, res, next) => {

    try {
      const company = await getCompanyByUserId(req.user._id);

      if (!company) {
        throw new Error("Company not found.")
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
      next(error);
    }

  })


router.put("/update/:id", hasUser(), checkUserRole("employer"), loadItem('Job'),
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
  validateRequest,
  async (req, res, next) => {

    try {
      const job = req.item;


      if (job.ownerId.toString() !== req.user._id.toString()) {
        throw new Error("Not authorized.");
      }

      const jobData = { title, type, description, location, salary } = req.body;

      const updatedJob = await updateItem(req.params.id, jobData);

      res.status(200).json(updatedJob);

    } catch (error) {
      next(error);
    }

  })


router.delete("/delete/:id", loadItem("Job"), isOwner(),
  async (req, res, next) => {
    try {

      await deleteById(req.params.id, req.user._id);

      res.status(200).json({ message: "Job deleted." });

    } catch (error) {
      next(error);
    }
  })

module.exports = router;
