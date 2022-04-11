/**Author: Geetanjali Bommera */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingschema = new Schema({
    user: { type: String },
    rating: { type: Number },
    comments: { type: String },
});

const courseSchema = new Schema(
    {
        coursename: { type: String },
        description: { type: String },
        price: { type: Number },
        instructor : { type: String },
        Ratings: [ratingschema],

    },
    { timestamps: true }
);
const Ratings = mongoose.model("Ratings", ratingschema);
const Course = mongoose.model("Courses", courseSchema);

module.exports = { Course,Ratings };
