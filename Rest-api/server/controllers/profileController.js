const router = require("express").Router();

const { hasUser } = require("../middlewares/guards");
const { errorParser } = require("../util/errorParser");

const {
  getUserById,
  createItem,
  updateItem,
  getAllProfiles,
  getProfileById,
  deleteById,
  updatedProfileExpOrEduc,
  deleteProfileExpOrEduc
} = require("../services/profileService");


router.get("/", hasUser(), async (req, res) => {
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

router.post("/create", hasUser(), async (req, res) => {
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

router.post("/update", hasUser(), async (req, res) => {
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

router.get("/catalog/:id", hasUser(), async (req, res) => {

  try {
    const userProfile = await getProfileById(req.params.id);

    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(userProfile);

  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message })

  }
})


router.delete("/delete", hasUser(), async (req, res) => {

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

router.put("/experience", hasUser(), async (req, res) => {

  const userId = req.user._id;

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

router.put("/education", hasUser(), async (req, res) => {

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

router.delete("/experience/:exp_id", hasUser(), async (req, res) => {
  try {

    const profile = await getUserById(req.user._id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    const expExists = profile.experience.some(exp => exp._id.toString() === req.params.exp_id);

    if (!expExists) {
      return res.status(404).json({ message: "Experience not found." });
    }

    const deleteExp = await deleteProfileExpOrEduc(req.user._id, "experience", req.params.exp_id);

    res.status(200).json({ message: "The experience has been deleted." })

  } catch (error) {
    console.log(error)
    const message = errorParser(error);
    res.status(400).json({ message })
  }
})

router.delete("/education/:educ_id", hasUser(), async (req, res) => {
  try {

    const profile = await getUserById(req.user._id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    const educExists = profile.education.some(educ => educ._id.toString() === req.params.educ_id);

    if (!educExists) {
      return res.status(404).json({ message: "Education not found." });
    }

    const deleteEduc = await deleteProfileExpOrEduc(req.user._id, "education", req.params.educ_id);

    res.status(200).json({ message: "The education has been deleted." })

  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message })
  }
})



module.exports = router;
