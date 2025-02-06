const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { hasUser, checkUserRole } = require("../middlewares/guards");
const { errorParser } = require("../util/errorParser");
const { getAll, createItem, getCompanyByUserId, updateItem, deleteCompanyAndProfile, getUserById, getCompanyById } = require("../services/employerProfileService");

router.get("/list", async(req, res) => {
    try {

        const companies = await getAll();

        if (companies.length == 0) {
            return res.status(404).json({ message: "At this time, there are no companies listed." });
        }

        res.status(200).json(companies);
        
    } catch (error) {
        const message = errorParser(error);
        res.status(400).json({ message });
    }
})

router.get("/list/:id",
    async (req, res) => {
        try {
            const companyProfile = await getCompanyById(req.params.id);

            if (!companyProfile) {
                return res.status(404).json({ message: "Company not found" });
            }

            res.status(200).json(companyProfile);

        } catch (error) {
            const message = errorParser(error);
            res.status(400).json({ message });
        }
    });

router.get("/profile/employer", hasUser(), checkUserRole("employer"),
    async (req, res) => {
        try {
            const employerProfile = await getUserById(req.user._id);

            if (!employerProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }

            if (employerProfile.ownerId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Access denied" });
            }


            res.status(200).json(employerProfile);

        } catch (error) {
            const message = errorParser(error);
            res.status(400).json({ message });
        }
    });

    
router.post("/profile/create", hasUser(), checkUserRole("employer"),
    body("companyName", "Company name is required").not().isEmpty(),
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


        const { companyName, description, contactEmail, contactPhone } = req.body;

        const company = {
            companyName,
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

router.put("/profile/update/:id", hasUser(), checkUserRole("employer"),
    body("companyName", "Company name is required").not().isEmpty(),
    body("description", "Please enter a description up to 3000 characters long").isLength({ max: 3000 }),
    body("contactEmail", "Email is required").not().isEmpty(),
    body("contactPhone", "Phone is required").not().isEmpty(),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const message = errorParser(errors.array());
            return res.status(400).json({ message });
        }

        try {
            const companyProfileId = req.params.id;

            const companyData = { companyName, description, contactEmail, contactPhone } = req.body;

            const updateCompanyData = await updateItem(companyProfileId, companyData);

            res.status(200).json(updateCompanyData);

        } catch (error) {
            console.log(error)
            const message = errorParser(error);
            res.status(400).json({ message });
        }

    })

router.delete("/profile/delete/:id", hasUser(), checkUserRole("employer"), async (req, res) => {

    try {

        const existingCompany = await getCompanyByUserId(req.user._id);
        if (!existingCompany) {
            return res.status(404).json({ message: "Company not found" });
        }

        await deleteCompanyAndProfile(req.user._id);
        res.status(200).json({ message: "Company deleted successfully" });


    } catch (error) {
        console.log(error)
        const message = errorParser(error);
        res.status(400).json({ message });
    }
})


module.exports = router;
