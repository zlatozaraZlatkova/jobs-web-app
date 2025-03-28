const router = require("express").Router();
const { body } = require("express-validator");

const validateRequest = require("../middlewares/validateBodyRequest");
const { loadItem } = require("../middlewares/preload");
const { hasUser, checkUserRole } = require("../middlewares/guards");
const { paginationMiddleware } = require("../middlewares/paginationMiddleware");
const { formatPaginatedResponse } = require("../util/formatPaginatedResponse");
const { getGithubRepos } = require('../services/githubService');
const {
  getUserById,
  createItem,
  updateItem,
  getAllProfiles,
  deleteById,
  updatedProfileExpOrEduc,
  deleteProfileExpOrEduc,
  getSearchEmployee
} = require("../services/employeeProfileService");

// @route GET /api/profile/search?skills=Angular,JavaScript&experience=Senior&degree=professional

router.get("/search", paginationMiddleware(),
   async (req, res, next) => {
  try {
    const { skills, experience, education } = req.query;
    const { page, limit, skip } = req.pagination;

    const { paginatedProfiles, totalProfiles } = await getSearchEmployee(skills, experience, education,
       skip, limit);

    if (paginatedProfiles.length == 0) {
      throw new Error("No profile matched your search.");
    }

    res.status(200).json(formatPaginatedResponse(paginatedProfiles, page, limit, totalProfiles));

  } catch (error) {
    next(error);

  }
});


router.get("/", hasUser(), checkUserRole("employee"), 
async (req, res, next) => {
  try {
    const profile = await getUserById(req.user._id);

    if (!profile) {
      throw new Error("There is no profile for this user.");
    }

    res.status(200).json(profile);

  } catch (error) {
    next(error);
  }
});

router.post("/create", hasUser(), checkUserRole("employee"),
  body("company", "Company name is required").notEmpty(),
  body("company", "Please enter a company name up to 150 characters long").isLength({ max: 150 }),
  body("websiteUrl", "Please provide a valid website URL").optional().isURL(),
  body("location", "Location is required").notEmpty(),
  body("location", "Please enter a location up to 50 characters long").isLength({ max: 50 }),
  body("bio", "Short bio is required").notEmpty(),
  body("bio", "Short description up to 3000 characters long").isLength({ max: 3000 }),
  body("status", "Status is required").notEmpty(),
  body("skills", "Skills is required").notEmpty(),
  validateRequest,
  async (req, res, next) => {

    try {
      const userId = req.user._id;
      const { company, website, location, bio, status, skills, githubUsername, linkedin } = req.body;

      const profileInputFields = {
        company,
        website,
        location,
        bio,
        status,
        skills: skills?.split(",").map(skill => skill.trim()),
        githubUsername,
        socialMedia: {
          linkedin
        },
        ownerId: userId,
      };

      let userProfile = await getUserById(userId);

      if (userProfile) {
        throw new Error("Profile already exists.");
      }

      userProfile = Object.assign({ ownerId: req.user._id }, profileInputFields);

      const profile = await createItem(userProfile);

      res.status(201).json(profile);

    } catch (error) {
      next(error);

    }

  })

router.post("/update", hasUser(), checkUserRole("employee"),
  body("company", "Company name is required").notEmpty(),
  body("company", "Please enter a company name up to 150 characters long").isLength({ max: 150 }),
  body("websiteUrl", "Please provide a valid website URL").optional().isURL(),
  body("location", "Location is required").notEmpty(),
  body("location", "Please enter a location up to 50 characters long").isLength({ max: 50 }),
  body("bio", "Short bio is required").notEmpty(),
  body("bio", "Short description up to 3000 characters long").isLength({ max: 3000 }),
  body("status", "Status is required").notEmpty(),
  body("skills", "Skills is required").notEmpty(),
  validateRequest,
  async (req, res, next) => {

    try {
      const userId = req.user._id;
      const { company, website, location, bio, status, skills, githubUsername, linkedin } = req.body;

      const profileInputFields = {
        company,
        website,
        location,
        bio,
        status,
        skills: skills?.split(",").map(skill => skill.trim()),
        githubUsername,
        socialMedia: {
          linkedin
        },
        ownerId: userId,
      };

      const existingProfile = await getUserById(userId);

      if (!existingProfile) {
        throw new Error("Profile not found. Create one first.");
      }


      const updatedProfile = await updateItem(userId, profileInputFields);

      return res.status(200).json(updatedProfile);

    } catch (error) {
      next(error);
    }
  });

router.get("/catalog", paginationMiddleware(), async (req, res, next) => {
  try {
    const { page, limit, skip } = req.pagination;

    const { paginatedProfiles, totalProfiles } = await getAllProfiles(skip, limit);


    if (paginatedProfiles.length == 0) {
      throw new Error("There is no profiles yet.")
    }

    return res.status(200).json(formatPaginatedResponse(paginatedProfiles, page, limit, totalProfiles));


  } catch (error) {
    next(error);

  }
})

router.get("/catalog/:id", hasUser(), loadItem("EmployeeProfile"),
  async (req, res, next) => {

    try {
      const userProfile = req.item;

      if (userProfile) {
        await userProfile.populate("ownerId", ["name", "avatar"]);
      }

      res.status(200).json(userProfile);

    } catch (error) {
      next(error);

    }
  })


router.delete("/delete", hasUser(), checkUserRole("employee"),
 async (req, res, next) => {
  try {
    const existingProfile = await getUserById(req.user._id);

    if (!existingProfile) {
      throw new Error("Profile not found.");
    }

    const deleteProfile = await deleteById(req.user._id);

    res.status(200).json({ message: "The profile has been deleted." });

  } catch (error) {
    next(error);

  }
})

router.put("/experience", hasUser(), checkUserRole("employee"),
  body("title", "Job position is required").notEmpty(),
  body("title", "Please enter a position up to 50 characters long").isLength({ max: 50 }),
  body("company", "Company is required").notEmpty(),
  body("company", "Please enter a company name up to 150 characters long").isLength({ max: 150 }),
  body("location", "Location is required").notEmpty(),
  body("location", "Please enter a location up to 50 characters long").isLength({ max: 50 }),
  body("from", "From date is required and needs to be from the past").notEmpty(),
  body("to", "To date is required and needs to be up to now").notEmpty(),
  body("current", "Current employment is required and needs to be selected"),
  body("description", "Please enter a description up to 3000 characters long").isLength({ max: 3000 }),
  validateRequest,
  async (req, res, next) => {

    try {
      const userId = req.user._id;

      const experienceData = {
        ...req.body,
        current: Boolean(req.body.current)
      };
      const profile = await getUserById(req.user._id);

      if (!profile) {
        throw new Error("There is no profile for this user.");
      }

      const updatedProfile = await updatedProfileExpOrEduc(userId, "experience", experienceData);

      return res.status(200).json(updatedProfile);


    } catch (error) {
      next(error);

    }
  })

router.put("/education", hasUser(), checkUserRole("employee"),
  body("school", "School is required").notEmpty(),
  body("school", "Please enter a school name up to 50 characters long").isLength({ max: 50 }),
  body("degree", "Degree is required").notEmpty(),
  body("degree", "Please enter a degree up to 150 characters long").isLength({ max: 150 }),
  body("from", "From date is required and needs to be from the past").notEmpty(),
  body("to", "To date is required and needs to be up to now").notEmpty(),
  body("current", "Current education is required and must be selected"),
  body("description", "Please enter a description up to 3000 characters long").isLength({ max: 3000 }),
  validateRequest,
  async (req, res, next) => {

    try {
      const userId = req.user._id;

      const educationData = {
        ...req.body,
        current: Boolean(req.body.current)
      };

      const profile = await getUserById(req.user._id);

      if (!profile) {
        throw new Error("There is no profile for this user.")
      }


      const updatedProfile = await updatedProfileExpOrEduc(userId, "education", educationData);

      return res.status(200).json(updatedProfile);


    } catch (error) {
      next(error);

    }
  })


const createDeleteHandler = (arrayName) => {
  return async (req, res, next) => {
    try {
      const profile = await getUserById(req.user._id);

      if (!profile) {
        throw new Error("Profile not found.");
      }

      const itemExists = profile[arrayName].some(item => item._id.toString() === req.params.id.toString());

      if (!itemExists) {
        throw new Error(`No ${arrayName} was found.`);
      }

      await deleteProfileExpOrEduc(req.user._id, arrayName, req.params.id,);

      res.status(200).json({ message: `The ${arrayName} has been deleted.` });

    } catch (error) {
      next(error)
    }
  };

}

router.delete("/experience/:id", hasUser(), checkUserRole("employee"), createDeleteHandler("experience"));
router.delete("/education/:id", hasUser(), checkUserRole("employee"), createDeleteHandler("education"));


router.get("/github/:username", async (req, res, next) => {
  try {
    const repositories = await getGithubRepos(req.params.username);

    res.status(200).json(repositories);

  } catch (error) {
    next(error)
  }

});

module.exports = router;
