 /* Author Sai Sandeep Mutyala */
 const { response } = require("../app");
 const JobApplicationPersonalDetails = require("../models/PersonalDetailsModel");
 const JobApplicationEducationDetails = require("../models/EducationDetailsModel");
 const JobApplicationExperienceDetails = require("../models/ExperienceDetailsModel");
 
 
exports.viewAllJobApplications = async (req, res, next) => {
    try{
        const userDetails = await JobApplicationPersonalDetails.find(req.params.id);
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