/**Author: Geetanjali Bommera */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceschema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  fromdate: { type: Date, required: true },
  todate: { type: Date, required: true },
  description: { type: String },
});

const educationschema = new Schema(
  {
    educationname: { type: String, required: true },
    universityname: { type: String, required: true },
    fromdate: { type: Date, required: true },
    todate: { type: Date, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema(
  { 
    name:{type:String},
    email:{type: String},
    summary: { type: String },
    profileImg: {
           data: Buffer,
      contentType: String
    },
    UserEducation: [educationschema],
    UserExperience: [experienceschema],
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationschema);
const Experience = mongoose.model("Experience", experienceschema);
const User = mongoose.model("ProfileUser", userSchema);

module.exports = { User, Education, Experience, };
