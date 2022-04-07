 /* Author Sai Sandeep Mutyala */
const mongoose = require("mongoose");

const jobPost = new mongoose.Schema({
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
    type: Date,
    default: Date.now,
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
  employer_id: {
    type:  mongoose.Schema.ObjectId
  }
});

module.exports = mongoose.model("JobPost", jobPost);
