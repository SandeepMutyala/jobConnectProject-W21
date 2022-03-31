const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobPostSchema = new Schema({
  country: {
    type: String,
  },
  language: {
    type: String,
  },
  companyName: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  jobPostDate: {
    type: String,
  },
  jobShortDescription: {
    type: String,
  },
  workLocation: {
    type: String,
  },
  addLocation: {
    type: String,
  },
  hiringCount: {
    type: Number,
  },
  lastDateToApply: {
    type: String,
  },
  jobType1: {
    type: String,
  },
  jobType2: {
    type: String,
  },
  schedule: {
    type: String,
  },
  payType: {
    type: String,
  },
  pay: {
    type: Number,
  },
  jobDescription: {
    type: String,
  },
  companyLogoUrl: {
    type: String,
  },
  
});

module.exports = mongoose.model("jobposts", jobPostSchema);
