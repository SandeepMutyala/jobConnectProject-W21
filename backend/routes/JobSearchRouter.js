/* author Arpreet*/

var express = require('express');
var router = express.Router();
var {
    getJobPost,
    postPersonalDetails,
    postEducationDetails,
    postExperienceDetails
} = require('../controllers/JobSearchController.js')

router.get("", getJobPost)

router.post("/PersonalDetails", postPersonalDetails)

router.post("/EducationDetails", postEducationDetails)
router.post("/ExperienceDetails", postExperienceDetails)

module.exports = router;