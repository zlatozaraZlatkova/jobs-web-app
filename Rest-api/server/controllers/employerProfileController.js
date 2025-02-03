const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { hasUser, checkUserRole } = require("../middlewares/guards");
const { errorParser } = require("../util/errorParser");
const { createItem, getUserById, getCompanyByUserId } = require("../services/employerProfileService");

router.post("/create", hasUser(), checkUserRole("employer"),
    body("name", "Name is required").not().isEmpty(),
    body("description", "Please enter a description up to 3000 characters long").isLength({ max: 3000 }),
    body("contactEmail", "Email is required").not().isEmpty(),
    body("contactPhone", "Phone is required").not().isEmpty(),
    async (req, res) => {
        const userId = req.user._id;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const message = errorParser(errors.array());
            return res.status(400).json({ message });
        }


        const { name, description, contactEmail, contactPhone } = req.body;

        const company = {
            name,
            description,
            contactEmail,
            contactPhone,
            ownerId: userId,
        };

        try {
          
            const existingCompany = await getCompanyByUserId(userId);
            if (existingCompany) {
                return res.status(400).json({ message: "Company profile already exists." });
            }
 
            const createCompany = await createItem(userId, company);

            res.status(201).json(createCompany);

        } catch (error) {
            console.log(error);
            const message = errorParser(error);
            res.status(400).json({ message });
        }
    }
);

module.exports = router;
