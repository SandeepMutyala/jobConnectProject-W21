/**Author: Geetanjali Bommera */ /* Co-Author : Raja Harshini Kasibhotla (Adding the course) */
const CourseModel = require("../models/courses.model");

exports.getAllCourses = (req, res) => {
    CourseModel.Course.find({}, function (err, docs) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        return res.status(200).json({
          docs,
        });
      }
    });
  };

  
  exports.saveCourse = (req, res) => {
    console.log("inside save course");
    console.log(req.body);
    const coursename = req.body.coursename;
    const description = req.body.description;
    const instructor = req.body.instructor;
    const price = req.body.price;
    const newCourse = new CourseModel.Course({
     coursename,
     description,
     instructor,
     price
    });
    newCourse.save(function (err, docs) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        var string = JSON.stringify(docs);
        var objectValue = JSON.parse(string);
        const id = objectValue["_id"];
        return res.status(200).json({
          id,
        });
      }
    });
  };

  exports.addRating = (req, res) => {
    const user = req.body.user;
    const rating = req.body.rating;
    const comments = req.body.comments;
    const newRating = new CourseModel.Ratings({
      user,
      rating,
      comments,
    });
    CourseModel.Course.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { Ratings: [newRating] } },
      function (err, docs) {
        if (err) {
          return res.status(400).json({
            error: "unable to add rating",
            err,
          });
        } else {
          return res.status(200).json({
            Message: "Updated rating",
          });
        }
      }
    );
  };  

  exports.updateRating = (req, res) => {
    const user = req.body.user;
    const rating = req.body.rating;
    const comments = req.body.comments;

    const rid = req.params.ratingid;
    CourseModel.Course.findOneAndUpdate(
      { Ratings: { $elemMatch: { _id: rid } } },
      {
        $set: {
          "Ratings.$.user": user,
          "Ratings.$.rating": rating,
          "Ratings.$.rating": rating,
        },
      },
      function (err, docs) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          return res.status(200).json({
            Message: "Updated rating",
          });
        }
      }
    );
  };

  exports.deleteRating = (req, res) => {
    const rid = req.params.ratingid;
    CourseModel.Course.updateOne(
      { Ratings: { $elemMatch: { _id: rid } } },
      {
        $pull: { Ratings: { _id: rid } },
      },
      function (err, docs) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          return res.status(200).json({
            Message: "Deleted rating",
          });
        }
      }
    );
  };

  exports.getRatings = (req, res) => {
    CourseModel.Course.findById(req.params.id, function (err, docs) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        var string = JSON.stringify(docs);
        var objectValue = JSON.parse(string);
        const ratings = objectValue["Ratings"];
        return res.status(200).json({
          ratings,
        });
      }
    });
  };