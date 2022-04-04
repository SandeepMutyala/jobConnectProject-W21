/**Author: Raja Harshini Kasibhotla */


const express = require("express");
const router = express.Router();

const {
 displayPosts,
 deletePosts,
 listPosts,
 deleteJobPosts,
 listEmployers,
 deleteRejectedEmployers,
 updateEmployerStatus,
 displayComments,
 deleteComments,
 listApprovedEmployers,
 listExpiredPostings
} = require("../controllers/adminController");

router.route("/admin/displayPosts").get(displayPosts);
router.route("/admin/displayComments").get(displayComments);
router.route("/admin/deleteComments").delete(deleteComments);
router.route("/admin/deletePosts").delete(deletePosts);
router.route("/admin/listPosts").get(listPosts);
router.route("/admin/deleteJobPosts").delete(deleteJobPosts);
router.route("/admin/listEmployers").get(listEmployers);
router.route("/admin/deleteRejectedEmployers").delete(deleteRejectedEmployers);
router.route("/admin/updateEmployerVerificationStatus").post(updateEmployerStatus);
router.route("/admin/listApprovedEmployers").get(listApprovedEmployers);
router.route("/admin/listExpiredPostings").get(listExpiredPostings);
module.exports = router;
