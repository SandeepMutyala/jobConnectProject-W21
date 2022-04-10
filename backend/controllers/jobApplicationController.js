 /* Author Sai Sandeep Mutyala */
 const { response } = require("../app");
 const JobApplicationPersonalDetails = require("../models/PersonalDetailsModel");
 const JobApplicationEducationDetails = require("../models/EducationDetailsModel");
 const JobApplicationExperienceDetails = require("../models/ExperienceDetailsModel");
 
 
exports.viewAllJobApplications = async (req, res, next) => {
    try{
        const userDetails = await JobApplicationPersonalDetails.find({jobID : req.params.id});
        // const userDetails = {...personalDetails,...educationDetails,...experienceDetails};
    
        res.status(200).json({
            success: true,
            userDetails: userDetails
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

exports.viewUserPersonalDetails = async (req,res,next) => {

    console.log("entering viewalluserdetails");
    try{
        const personalUserDetails = await JobApplicationPersonalDetails.find({jobID : req.params.jobid, userID :req.params.userid });
        //console.log(personalUserDetails);

        res.status(200).json({
            success: true,
            allUserPersonalDetails: personalUserDetails[0]
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }

}

exports.viewUserEducationDetails = async (req,res,next) => {

    console.log("entering viewalluserdetails");
    try{
        const educationUserDetails = await JobApplicationEducationDetails.find({jobID : req.params.jobid, userID :req.params.userid });
        //console.log(educationUserDetails);

        res.status(200).json({
            success: true,
            allUserEducationDetails: educationUserDetails
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }

}

exports.viewUserExperienceDetails = async (req,res,next) => {

    console.log("entering viewalluserdetails");
    try{
        const experienceUserDetails = await JobApplicationExperienceDetails.find({jobID : req.params.jobid, userID :req.params.userid });
        //console.log(experienceUserDetails);

        res.status(200).json({
            success: true,
            allUserExperienceDetails: experienceUserDetails
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }

}
// exports.viewAllJobApplications = async (req, res, next) => {
//     try{
        
//         const educationDetails = await JobApplicationEducationDetails.find(req.params.id);
//         res.status(200).json({
//         success: true,
//         educationDetails: educationDetails
//         })
//     }
//     catch {
//         res.status(500).json({
//             success: false,
//             message: "Error"
//         })
//     }
// };