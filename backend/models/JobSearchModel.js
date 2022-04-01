/* author Arpreet*/

var mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    _id : String,
    country: String,
    language:String,
    companyName: String,
    jobTitle: String,
    jobShortDescription: String,
    workLocation:String,
    addLocation: String,
    hiringCount : Number,
    lastDateToApply : String,
    jobType1 : String,
    jobType2 : String,
    schedule : String,
    payType : String,
    pay : Number,
    jobDescription : String,
    companyLogoUrl: String,
    jobPostDate: Date,
    __v : Number,
})

const Jobs = mongoose.model('jobposts', JobSchema);

module.exports = Jobs;