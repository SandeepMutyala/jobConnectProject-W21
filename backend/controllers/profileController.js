/**Author: Geetanjali Bommera */
const UserModel = require("../models/profile.model");
const DIR = "./public/";
const fs = require("fs");
let multer = require("multer");
uuidv4 = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

exports.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
let mongoose = require("mongoose");

exports.updateProfileImage = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  var new_Img = {
    data: { data: Buffer, contentType: String },
  };
  new_Img.data = fs.readFileSync(req.file.path);
  new_Img.contentType = "image/jpeg";

  UserModel.User.findByIdAndUpdate(
    req.params.id,
    { profileImg: new_Img },
    function (err, docs) {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this action",
        });
      } else {
        return res.status(200).json({
          Message: "Image Updated",
        });
      }
    }
  );
};

exports.getProfileImage = (req, res, next) => {
  UserModel.User.findOne({ email: req.params.id }, function (err, docs) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      res.contentType("json");
      res.send(docs.profileImg);
    }
  });
};

exports.profileDetails = (req, res) => {
  UserModel.User.findOne({ email: req.query.email }, function (err, docs) {
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

exports.getAllUsers = (req, res) => {
  UserModel.User.find({}, function (err, docs) {
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

exports.updateSummary = (req, res) => {
  const id = req.params.id;
  const summary_input = req.body.summary;
  UserModel.User.findByIdAndUpdate(
    id,
    { summary: summary_input },
    function (err, docs) {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this action",
        });
      } else {
        return res.status(200).json({
          Message: "Summary Updated",
        });
      }
    }
  );
};

exports.defaultProfile = (req, res) => {
  const newheader = new UserModel.User({
    summary: " ",
    profileImg: { data: "", contentType: " " },
    name: req.body.user.name,
    email: req.body.user.email,
  });
  newheader.save(function (err, docs) {
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

exports.getSummary = (req, res) => {
  UserModel.User.findById(req.params.id, function (err, docs) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      var string = JSON.stringify(docs);
      var objectValue = JSON.parse(string);
      const summary = objectValue["summary"];
      return res.status(200).json({
        summary,
      });
    }
  });
};

exports.getEducation = (req, res) => {
  UserModel.User.findById(req.params.id, function (err, docs) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      var string = JSON.stringify(docs);
      var objectValue = JSON.parse(string);
      const EducationDetails = objectValue["UserEducation"];
      return res.status(200).json({
        EducationDetails,
      });
    }
  });
};

exports.updateEducation = (req, res) => {
  const educationname = req.body.educationname;
  const universityname = req.body.universityname;
  const fromdate = req.body.fromdate;
  const todate = req.body.todate;
  const description = req.body.description;
  const eduid = req.params.educationid;
  UserModel.User.findOneAndUpdate(
    { UserEducation: { $elemMatch: { _id: eduid } } },
    {
      $set: {
        "UserEducation.$.universityname": universityname,
        "UserEducation.$.educationname": educationname,
        "UserEducation.$.fromdate": fromdate,
        "UserEducation.$.todate": todate,
        "UserEducation.$.description": description,
      },
    },
    function (err, docs) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        return res.status(200).json({
          Message: "Updated",
        });
      }
    }
  );
};

exports.deleteEducation = (req, res) => {
  const eid = req.params.id;
  UserModel.User.updateOne(
    { UserEducation: { $elemMatch: { _id: eid } } },
    {
      $pull: { UserEducation: { _id: eid } },
    },
    function (err, docs) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        return res.status(200).json({
          Message: "Deleted",
        });
      }
    }
  );
};

exports.addEducation = (req, res) => {
  const educationname = req.body.educationname;
  const universityname = req.body.universityname;
  const fromdate = Date.parse(req.body.fromdate);
  const todate = Date.parse(req.body.todate);
  const description = req.body.description;
  const newEducation = new UserModel.Education({
    educationname,
    universityname,
    fromdate,
    todate,
    description,
  });

  UserModel.User.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { UserEducation: [newEducation] } },
    function (err, docs) {
      if (err) {
        return res.status(400).json({
          error: "unable to add",
          err,
        });
      } else {
        return res.status(200).json({
          Message: "Updated",
        });
      }
    }
  );
};

exports.getExperience = (req, res) => {
  UserModel.User.findById(req.params.id, function (err, docs) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      var string = JSON.stringify(docs);
      var objectValue = JSON.parse(string);
      const experienceDetails = objectValue["UserExperience"];
      return res.status(200).json({
        experienceDetails,
      });
    }
  });
};

exports.updateExperience = (req, res) => {
  const role = req.body.role;
  const company = req.body.company;
  const fromdate = req.body.fromdate;
  const todate = req.body.todate;
  const description = req.body.description;
  const eduid = req.params.experienceid;
  UserModel.User.findOneAndUpdate(
    { UserExperience: { $elemMatch: { _id: eduid } } },
    {
      $set: {
        "UserExperience.$.company": company,
        "UserExperience.$.role": role,
        "UserExperience.$.fromdate": fromdate,
        "UserExperience.$.todate": todate,
        "UserExperience.$.description": description,
      },
    },
    function (err, docs) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        return res.status(200).json({
          Message: "Updated",
        });
      }
    }
  );
};

exports.addExperience = (req, res) => {
  const role = req.body.role;
  const company = req.body.company;
  const fromdate = Date.parse(req.body.fromdate);
  const todate = Date.parse(req.body.todate);
  const description = req.body.description;
  const newexperience = new UserModel.Experience({
    role,
    company,
    fromdate,
    todate,
    description,
  });

  UserModel.User.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { UserExperience: [newexperience] } },
    function (err, docs) {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this action",
        });
      } else {
        return res.status(200).json({
          Message: "Updated",
        });
      }
    }
  );
};

exports.updateExperience = (req, res) => {
  const role = req.body.role;
  const company = req.body.company;
  const fromdate = req.body.fromdate;
  const todate = req.body.todate;
  const description = req.body.description;
  const eduid = req.params.experienceid;
  UserModel.User.findOneAndUpdate(
    { UserExperience: { $elemMatch: { _id: eduid } } },
    {
      $set: {
        "UserExperience.$.company": company,
        "UserExperience.$.role": role,
        "UserExperience.$.fromdate": fromdate,
        "UserExperience.$.todate": todate,
        "UserExperience.$.description": description,
      },
    },
    function (err, docs) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        return res.status(200).json({
          Message: "Updated",
        });
      }
    }
  );
};
exports.deleteExperience = (req, res) => {
  const eid = req.params.id;
  UserModel.User.updateOne(
    { UserExperience: { $elemMatch: { _id: eid } } },
    {
      $pull: { UserExperience: { _id: eid } },
    },
    function (err, docs) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        return res.status(200).json({
          Message: "Deleted",
        });
      }
    }
  );
};
