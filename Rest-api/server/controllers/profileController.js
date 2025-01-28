const router = require("express").Router();

const { getUserById, createItem, updateItem } = require("../services/profileService");
const { hasUser } = require("../middlewares/guards");
const { errorParser } = require("../util/errorParser");

router.get("/", hasUser(), async (req, res) => {
  try {
    const profile = await getUserById(req.user._id);
    console.log("request user", req.user._id)
    console.log(profile)

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
      console.error(error); 
      const message = errorParser(error);
      return res.status(400).json({ message }); 
  }
});


module.exports = router;
