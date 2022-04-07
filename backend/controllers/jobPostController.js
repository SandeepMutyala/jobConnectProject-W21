 /* Author Sai Sandeep Mutyala */
const { response } = require("../app");
const JobPost = require("../models/jobPost");

exports.createJobPost = async(req, res) => {
    const { country, language, companyName, jobTitle, jobShortDescription, workLocation, addLocation, hiringCount, lastDateToApply, jobType1, jobType2, schedule, payType, pay, jobDescription, companyLogoUrl, employer_id} = req.body;
    await JobPost.create({
        country, 
        language, 
        companyName, 
        jobTitle, 
        jobShortDescription, 
        workLocation, 
        addLocation, 
        hiringCount, 
        lastDateToApply, 
        jobType1, 
        jobType2, 
        schedule, 
        payType, 
        pay, 
        jobDescription,
        companyLogoUrl,
        employer_id
      })
        .then(jobposting => {
        res.status(200).json({'jobposting': 'jobposting added successfully'});
        })
        .catch(err => {
        res.status(400).send('adding new job post failed');
    });
}

  exports.viewAllJobPost = async (req, res, next) => {
    try{
        const posts = await JobPost.find({employer_id : req.params.id});
        res.status(200).json({
          success: true,
          jobList: posts
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Error"
          })
    }
  };

  exports.viewSpecificJobPost = async (req, res, next) => {
    try{
        const postDetails = await JobPost.findById(req.params.id);
        res.status(200).json({
          success: true,
          jobPostDetails: postDetails
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Error"
          })
    }
  };

  exports.editedJobPost = async (req, res) => {
    try {
      if (!req.params['id']) {
        return res.status(400).json({
          Message: "No id provided!!",
          Status: false
        });
      }
      const updatedJobPost = await JobPost.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        Message: "Job post updated Successfully !!",
        Status: true,
        Data: updatedJobPost,
      })
    }
    catch{
      res.status(500).json({
        Message: "Error occurred while updating the job post!!",
        Status: false
      })
    }
  };

  exports.deleteJobPost = async (req, res) => {
    try{
      await JobPost.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message:"Success"
      })
    }
    catch {
      res.status(500).json({
          success: false,
          message: "Error"
      })
    }
  };