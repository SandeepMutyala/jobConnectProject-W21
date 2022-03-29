/**Author: Geetanjali Bommera */
const express = require("express");
const router = express.Router();
 
const {
    updateSummary,
    defaultProfile,
    getSummary,
    getEducation,
    updateEducation,
    addEducation,
    deleteEducation,
    getExperience,
    updateExperience,
    addExperience,
    deleteExperience,
    profileDetails,
    updateProfileImage,
    upload,
    getProfileImage,
    getAllUsers
  } = require("../controllers/profileController");

  
  
 
router.route("/").get(profileDetails);
router.route("/users").get(getAllUsers);
router.route("/profileimage/:id").post(upload.single("profileImg"),updateProfileImage);
router.route("/getprofileimage/:id").get(getProfileImage);
router.route("/userheader/update/:id").post(updateSummary);
router.route("/userheader/update").post(defaultProfile);
router.route("/userheader/:id").get(getSummary);
router.route("/educationroute/:id").get(getEducation);
router.route("/educationroute/update/:educationid").post(updateEducation);
router.route("/educationroute/add/:id").post(addEducation);
router.route("/educationroute/delete/:id").delete(deleteEducation);

router.route("/experienceroute/:id").get(getExperience);
router.route("/experienceroute/update/:experienceid").post(updateExperience);
router.route("/experienceroute/add/:id").post(addExperience);
router.route("/experienceroute/delete/:id").delete(deleteExperience);





module.exports = router;