const router = require("express").Router();


const { hasUser, checkUserRole } = require("../middlewares/guards");
const { errorParser } = require("../util/errorParser");
const { getUserById } = require("../services/employerProfileService");

router.post("/create", hasUser(), checkUserRole("employer"),
  
    async (req, res) => {
        const userId = req.user._id;
 
        try {
            let userProfile = await getUserById(userId);

            res.status(201).json(userProfile);

        } catch (error) {
            console.log(error);
            const message = errorParser(error);
            res.status(400).json({ message });
        }
    }
);

module.exports = router;
