const Profile = require("../models/Profile");

async function getProfileById(id) {
    return Profile.findById(id).populate("ownerId", ["name", "avatar"]);
}



module.exports = {
    getProfileById,
};
