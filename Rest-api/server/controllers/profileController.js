const router = require("express").Router();

const { getUserById, createItem, updateItem, getAllProfiles, getProfileById } = require("../services/profileService");
const { hasUser } = require("../middlewares/guards");
const { errorParser } = require("../util/errorParser");

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

router.get("/catalog", async(req, res) => {
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

router.get("/catalog/:id", hasUser(), async(req, res) => {
  
  try {
    const userProfile = await getProfileById(req.params.id);

    if(!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(userProfile);
    
  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message })
    
  }
})



module.exports = router;
