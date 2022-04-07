/* author Arpreet*/

var mongoose = require('mongoose');

const ExDSchema = new mongoose.Schema({
            UserId : String,
            CompanyName : String,
            CompanyLocation : String,
            ExperienceField : String,
            DateofJoining : String,
            DateofLeaving : String,
            LeavingReason : String,
            ExpereinceYears : Number,
            ExpereinceDetails : String,
            Experienceid : Number,
            Experienceindex : Number,
            jobID : String,
            userID: String
})

const ExperienceDetails = mongoose.model('JobExperienceDetails', ExDSchema);

module.exports = ExperienceDetails;