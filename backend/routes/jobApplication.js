 /* Author Sai Sandeep Mutyala */
 const express = require("express");
 const router = express.Router();

 const { viewAllJobApplications, viewUserPersonalDetails, viewUserEducationDetails, viewUserExperienceDetails } = require("../controllers/jobApplicationController");
//  const {viewSpecificJobPost} = require("../controllers/jobPostController");

 router.route("/displayjobapplications/:id").get(viewAllJobApplications);
 router.route("/userPersonalDetails/:userid/:jobid").get(viewUserPersonalDetails);
 router.route("/userEducationDetails/:userid/:jobid").get(viewUserEducationDetails);
 router.route("/userExperienceDetails/:userid/:jobid").get(viewUserExperienceDetails);
//  router.route("/displayjobapplication/:id").get(viewSpecificJobPost);

 module.exports = router;