const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { loadItem } = require("../middlewares/preload");
const { hasUser, checkUserRole } = require("../middlewares/guards");
const { errorParser } = require("../util/errorParser");
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

router.get("/search", async (req, res) => {
  try {
      const { skills, experience, education } = req.query;

      const profile = await getSearchEmployee(skills, experience, education);

      if (!profile?.length) {
          return res.status(404).json({ message: "No profile matched your search" });
      }

      res.status(200).json(profile);

  } catch (error) {
    console.log(error)
      const message = errorParser(error);
      res.status(400).json({ message });

  }
});


router.get("/", hasUser(), checkUserRole("employee"), async (req, res) => {
  try {
    const profile = await getUserById(req.user._id);

    if (!profile) {
      return res.status(404).json({ message: "There is no profile for this user" });
    }

    res.status(200).json(profile);

  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
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
  async (req, res) => {
    const userId = req.user._id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errorParser(errors.array());
      return res.status(400).json({ message });
    }

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

    try {
      let userProfile = await getUserById(userId);

      if (userProfile) {
        return res.status(400).json({ message: "Profile already exists." });
      }

      userProfile = Object.assign({ ownerId: req.user._id }, profileInputFields);

      const profile = await createItem(userProfile);

      res.status(201).json(profile);

    } catch (error) {
      const message = errorParser(error);
      res.status(400).json({ message });

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
  async (req, res) => {
    const userId = req.user._id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errorParser(errors.array());
      return res.status(400).json({ message });
    }

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

    try {
      const existingProfile = await getUserById(userId);

      if (!existingProfile) {
        return res.status(404).json({ message: "Profile not found. Create one first." });
      }


      const updatedProfile = await updateItem(userId, profileInputFields);

      return res.status(200).json(updatedProfile);

    } catch (error) {
      const message = errorParser(error);
      return res.status(400).json({ message });
    }
  });

router.get("/catalog", async (req, res) => {
  try {
    const listOfProfiles = await getAllProfiles();

    if (listOfProfiles.length == 0) {
      return res.status(404).json({ message: "There is no profiles yet." });
    }

    return res.status(200).json(listOfProfiles);


  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });

  }
})

router.get("/catalog/:id", hasUser(), loadItem("EmployeeProfile"),
 async (req, res) => {

  try {
    const userProfile = req.item;

    res.status(200).json(userProfile);

  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message })

  }
})


router.delete("/delete", hasUser(), checkUserRole("employee"), async (req, res) => {

  try {
    const existingProfile = await getUserById(req.user._id);

    if (!existingProfile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    const deleteProfile = await deleteById(req.user._id);

    res.status(200).json({ message: "The profile has been deleted." });

  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message })

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

  async (req, res) => {

    const userId = req.user._id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errorParser(errors.array());
      return res.status(400).json({ message });
    }

    const experienceData = {
      ...req.body,
      current: Boolean(req.body.current)
    };


    try {
      const profile = await getUserById(req.user._id);

      if (!profile) {
        return res.status(404).json({ message: "There is no profile for this user" });
      }

      const updatedProfile = await updatedProfileExpOrEduc(userId, "experience", experienceData);

      return res.status(200).json(updatedProfile);


    } catch (error) {
      const message = errorParser(error);
      res.status(400).json({ message })

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

  async (req, res) => {

    const userId = req.user._id;

    const educationData = {
      ...req.body,
      current: Boolean(req.body.current)
    };


    try {
      const profile = await getUserById(req.user._id);

      if (!profile) {
        return res.status(404).json({ message: "There is no profile for this user" });
      }


      const updatedProfile = await updatedProfileExpOrEduc(userId, "education", educationData);

      return res.status(200).json(updatedProfile);


    } catch (error) {
      const message = errorParser(error);
      res.status(400).json({ message })

    }
  })


const createDeleteHandler = (arrayName) => {
  return async (req, res) => {
    try {
      const profile = await getUserById(req.user._id);

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      const itemExists = profile[arrayName].some(item =>
        item._id.toString() === req.params.id.toString()
      );

      if (!itemExists) {
        return res.status(404).json({ message: `No ${arrayName} was found` });
      }

      await deleteProfileExpOrEduc(req.user._id, arrayName, req.params.id,);

      res.status(200).json({ message: `The ${arrayName} has been deleted.` });

    } catch (error) {
      console.log(error);
      const message = errorParser(error);
      res.status(400).json({ message });
    }
  };

}

router.delete("/experience/:id", hasUser(), checkUserRole("employee"), createDeleteHandler("experience"));
router.delete("/education/:id", hasUser(), checkUserRole("employee"), createDeleteHandler("education"));


router.get("/github/:username", async (req, res) => {
  try {
    const repositories = await getGithubRepos(req.params.username);

    res.status(200).json(repositories);

  } catch (error) {

    if (error.response.status === 404) {
      return res.status(404).json({ message: "GitHub profile is not found." });
    }

    const message = errorParser(error);
    res.status(400).json({ message });
  }

});

module.exports = router;
