/* author Arpreet*/

var mongoose = require('mongoose');

const PDSchema = new mongoose.Schema({
    UserID : String,
    FirstName: String,
    MiddleName : String,
    LastName : String,
    DOB : String,
    Email : String,
    PhoneNumber : String,
    Address : String,
    jobID : String,
    userID: String
})

const PersonalDetails = mongoose.model('JobPersonalDetails', PDSchema);

module.exports = PersonalDetails;