 /* Author Sai Sandeep Mutyala */
const express = require("express");
const router = express.Router();
const { createJobPost } = require("../controllers/jobPostController");
const { viewAllJobPost } = require("../controllers/jobPostController");
const {viewSpecificJobPost} = require("../controllers/jobPostController");
const {editedJobPost} = require("../controllers/jobPostController");
const {deleteJobPost} = require("../controllers/jobPostController");

router.route("/createpost").post(createJobPost);
router.route("/displayjobposts/:id").get(viewAllJobPost);
router.route("/displayjobpost/:id").get(viewSpecificJobPost);
router.route("/updatejobpost/:id").put(editedJobPost);
router.route("/deletejobpost/:id").delete(deleteJobPost);
module.exports = router;