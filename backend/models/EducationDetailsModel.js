var mongoose = require('mongoose');

const EDSchema = new mongoose.Schema({
    UserId : String,
    EducationType : String,
    InstituteName : String,
    InstituteLocation : String,
    EducationField : String,
    StartingYear : String,
    CompletionYear : String,
    PercentageAchieved : Number,
    Educationid : Number,
    Educationindex : Number
})

const EducationDetails = mongoose.model('JobEducationDetails', EDSchema);

module.exports = EducationDetails;