/**Author: Geetanjali Bommera */
const UserModel = require("../models/profile.model");
const DIR = "./public/";
const fs = require("fs");
let multer = require("multer"),
  uuidv4 = require("uuid/v4");
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

  // const user = new UserModel.User({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: req.body.name,
  // profileImgf:
  //   url + "/profile/profileimage/" + req.params.id + "/" +
  //   req.file.filename,
  // });
  // console.log(req.file.path);
  var new_Img = {
    data: { data: Buffer, contentType: String },
  };
  // console.log(new_Img);
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
  // .then((result) => {
  //   res.status(200).json({
  //     message: "User registered successfully!",
  //     userCreated: {
  //       _id: result._id,
  //       profileImg: result.profileImg,
  //     },
  //   });
  // })
  // .catch((err) => {
  //   console.log(err),
  //     res.status(401).json({
  //       error: err,
  //     });
  // });
};

exports.getProfileImage = (req, res, next) => {
  // console.log(req)
  UserModel.User.findOne({email:req.params.id}, function (err, docs) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      // var string = JSON.stringify(docs);
      // var objectValue = JSON.parse(string);
      // const profileImg = objectValue["profileImg"];
      // return res.status(200).json({
      //   // message: "Image successfully!",
      //   docs,
      // });
      // console.log(docs);
      res.contentType("json");
      res.send(docs.profileImg);
    }
  });
  // .then(data => {
  //     res.status(200).json({
  //         message: "Image successfully!",
  //         profileImg: profileImg
  //     });
  // });
};

exports.profileDetails = (req, res) => {
  console.log(req.query.email)
  UserModel.User.findOne({email:req.query.email}, function (err, docs) {
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

exports.getAllUsers = (req,res)=>{
  UserModel.User.find({},function (err, docs) {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      // console.log(docs)
      return res.status(200).json({
        docs,
      });
    }
  });
}

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
  // console.log("request received when user created", req.body.user);
  const newheader = new UserModel.User({
    summary: " ",
    profileImg: "",
    name: req.body.user.name,
    email: req.body.user.email,
  });
  console.log("new header",newheader)
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
  // .then(() => res.json("Default profile created successfully",_id))
  // .catch((err) => res.status(400).json("Error: " + err));
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
  console.log(req.params);
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
  console.log(req.params);
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
  console.log(req.params);
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
  console.log(req.params);
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
