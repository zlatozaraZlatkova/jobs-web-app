const router = require("express").Router();
const { body } = require("express-validator");
const validateRequest = require("../middlewares/validateBodyRequest");

const { loadItem } = require("../middlewares/preload");
const { hasUser, checkUserRole, isOwner } = require("../middlewares/guards");
const { paginationMiddleware } = require("../middlewares/paginationMiddleware");
const { formatPaginatedResponse } = require("../util/formatPaginatedResponse");
const { getAll, getCompanyByUserId, createItem, updateItem, deleteById, getSearchItem, getJobsList, pinItem, unpinItem } = require("../services/jobsService");

// @route GET /api/jobs/search?title=Java
// @route GET /api/jobs/search?title=React&type=Full-time&location=Brooklyn&salary=70

router.get("/search", paginationMiddleware(), 
  async (req, res, next) => {
  try {
   
    const { title, type, location, salary } = req.query;
    const { page, limit, skip } = req.pagination;

    const { paginatedJobs, totalJobs } = await getSearchItem(title, type, location, salary,
      skip, limit);

    if (paginatedJobs.length == 0) {
      throw new Error("No jobs matched your search.");
    }

    res.status(200).json(formatPaginatedResponse(paginatedJobs, page, limit, totalJobs));

  } catch (error) {
    next(error);

  }
});

router.get("/", paginationMiddleware(), async (req, res, next) => {
  try {
    const { page, limit, skip } = req.pagination;
    const technology = req.query.technology || null;

    const { paginatedJobs, totalJobs } = await getAll(skip, limit, technology);

    if (paginatedJobs.length === 0) {
      throw new Error("No jobs available yet.");
    }

    res.status(200).json(formatPaginatedResponse(paginatedJobs, page, limit, totalJobs, technology));

  } catch (error) {
    next(error);
  }
});

router.get("/list", async (req, res, next) => {
  try {
   
    const jobsList = await getJobsList();

    if (jobsList.length == 0) {
      throw new Error("Jobs not found.");
    }

    res.status(200).json(jobsList);

  } catch (error) {
    next(error);
  }
});

router.get("/:id", loadItem("Job"), async (req, res, next) => {
  try {
    const job = req.item;
    await job.populate("company");

    res.status(200).json(job);

  } catch (error) {
    next(error);
  }

});


router.post("/create", hasUser(), checkUserRole("employer"),
  body("title", "Title is required").not().isEmpty(),
  body("techStack","Title is required").not().isEmpty(),
  body("type", "Type is required").not().isEmpty(),
  body("technologies", "Type is required").not().isEmpty(),
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
        techStack: req.body.techStack,
        type: req.body.type,
        technologies: req.body.technologies,
        description: req.body.description,
        location: req.body.location,
        salary: req.body.salary,
        ownerId: req.user._id,
        company: company._id
      }
      console.log(newJob)

      const createJob = await createItem(req.user._id, newJob);

      res.status(200).json(createJob);

    } catch (error) {
      next(error);
    }

  })


router.put("/update/:id", hasUser(), checkUserRole("employer"), loadItem('Job'),
  body("title", "Title is required").not().isEmpty(),
  body("techStack","Title is required").not().isEmpty(),
  body("type", "Type is required").not().isEmpty(),
  body("technologies", "Type is required").not().isEmpty(),
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

      const jobData = { title,techStack, type, technologies, description, location, salary } = req.body;

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


  router.post("/pin/:id", hasUser(), loadItem("Job"),
    async (req, res, next) => {
      try {
        const userId = req.user._id;
        const jobId = req.params.id;
        const job = req.item;
  
        if (job.ownerId.toString() == userId.toString()) {
          throw new Error("You cannot pin your own job.");
        }
  
        if (job.pinnedByEmployees.map((j) => j.toString()).includes(userId.toString()) == true) {
          throw new Error("This job is already pinned.");
        }
  
        if (job.ownerId._id.toString() !== req.user._id.toString() && 
          job.pinnedByEmployees.some(user => user._id.equals(req.user._id)) == false) {
          await pinItem(jobId, userId);

          return res.status(200).json({ message: "Pinned!" });
        }
  
      } catch (error) {
        next(error);
      }
  
    })
  
  
  router.post("/unpin/:id", hasUser(), loadItem("Job"),
    async (req, res, next) => {
  
      try {
        const userId = req.user._id;
        const jobId = req.params.id;
        const job = req.item;


        if (job.ownerId.toString() == userId.toString()) {
          throw new Error("You cannot unpin your own job.");
        }
        
        if (job.pinnedByEmployees.some(user => user._id.equals(req.user._id)) == false) {
          throw new Error("Job has not been pinned yet.");
        }
  
        if (job.ownerId._id.toString() !== req.user._id.toString() && job.pinnedByEmployees.some(user => user._id.equals(req.user._id)) == true) {
  
          await unpinItem(jobId, userId);
  
          return res.status(200).json({ message: "Unpinned!" });
        }
  
  
      } catch (error) {
        next(error);
      }
  
    })
  






module.exports = router;
