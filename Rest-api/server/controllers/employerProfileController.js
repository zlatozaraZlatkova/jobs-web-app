const router = require("express").Router();
const { body } = require("express-validator");
const validateRequest = require("../middlewares/validateBodyRequest");

const { hasUser, checkUserRole } = require("../middlewares/guards");
const { getAll, createItem, getCompanyByUserId, updateItem, deleteCompanyAndProfile, getUserById, getCompanyById } = require("../services/employerProfileService");

router.get("/list", async (req, res, next) => {
    try {

        const companies = await getAll();

        if (companies.length == 0) {
            throw new Error("At this time, there are no companies listed.");
        }

        res.status(200).json(companies);

    } catch (error) {
        next(error);
    }
})

router.get("/list/:id",
    async (req, res, next) => {
        try {
            const companyProfile = await getCompanyById(req.params.id);

            if (!companyProfile) {
                throw new Error("Company not found.");
            }

            res.status(200).json(companyProfile);

        } catch (error) {
            next(error);
        }
    });

router.get("/profile/employer", hasUser(), checkUserRole("employer"),
    async (req, res, next) => {
        try {
            const employerProfile = await getUserById(req.user._id);

            if (!employerProfile) {
                throw new Error("Profile not found.");
            }

            if (employerProfile.ownerId.toString() !== req.user._id.toString()) {
                throw new Error("Access denied.");
            }


            res.status(200).json(employerProfile);

        } catch (error) {
            next(error);
        }
    });


router.post("/profile/create", hasUser(), checkUserRole("employer"),
    body("companyName", "Company name is required").not().isEmpty(),
    body("description", "Please enter a description up to 3000 characters long").isLength({ max: 3000 }),
    body("contactEmail", "Email is required").not().isEmpty(),
    body("contactPhone", "Phone is required").not().isEmpty(),
    validateRequest,
    async (req, res, next) => {

        try {
            const userId = req.user._id;
            const { companyName, description, contactEmail, contactPhone } = req.body;
            
            const company = {
                companyName,
                description,
                contactEmail,
                contactPhone,
                ownerId: userId,
            };

            const existingCompany = await getCompanyByUserId(userId);

            if (existingCompany) {
                throw new Error("Company profile already exists.");
            }

            const createCompany = await createItem(userId, company);

            res.status(201).json(createCompany);

        } catch (error) {
            next(error);
        }
    }
);

router.put("/profile/update/:id", hasUser(), checkUserRole("employer"),
    body("companyName", "Company name is required").not().isEmpty(),
    body("description", "Please enter a description up to 3000 characters long").isLength({ max: 3000 }),
    body("contactEmail", "Email is required").not().isEmpty(),
    body("contactPhone", "Phone is required").not().isEmpty(),
    validateRequest,
    async (req, res, next) => {

        try {
            const companyProfileId = req.params.id;

            const companyData = { companyName, description, contactEmail, contactPhone } = req.body;

            const updateCompanyData = await updateItem(companyProfileId, companyData);

            res.status(200).json(updateCompanyData);

        } catch (error) {
            next(error);
        }

    })

router.delete("/profile/delete/:id", hasUser(), checkUserRole("employer"),
    async (req, res, next) => {

        try {
            const existingCompany = await getCompanyByUserId(req.user._id);

            if (!existingCompany) {
                throw new Error("Company not found");
            }

            await deleteCompanyAndProfile(req.user._id);
            res.status(200).json({ message: "Company deleted successfully" });


        } catch (error) {
            next(error);
        }
    })


module.exports = router;
