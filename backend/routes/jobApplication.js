 /* Author Sai Sandeep Mutyala */
 const express = require("express");
 const router = express.Router();

 const { viewAllJobApplications } = require("../controllers/jobApplicationController");
//  const {viewSpecificJobPost} = require("../controllers/jobPostController");

 router.route("/displayjobapplications").get(viewAllJobApplications);
//  router.route("/displayjobapplication/:id").get(viewSpecificJobPost);

 module.exports = router;