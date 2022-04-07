/**Author: Geetanjali Bommera */
const express = require("express");
const router = express.Router();
 
const {
    getAllCourses,
    saveCourse,
    addRating,
    updateRating,
    deleteRating,
    getRatings
  } = require("../controllers/coursesController");

  

 
router.route("/getallcourses").get(getAllCourses);
router.route("/savecourse").post(saveCourse);
router.route("/addrating/:id").post(addRating);
router.route("/updaterating/:ratingid").post(updateRating);
router.route("/deleterating/:ratingid").delete(deleteRating);
router.route("/getratings/:id").get(getRatings);




module.exports = router;