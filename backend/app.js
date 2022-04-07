// Co - Author: Akshit Jariwala, B00866255
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
app.use(cors());
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const auth = require("./routes/auth");
const profile = require("./routes/profile.route");
const courses = require("./routes/courses.route")
const admin = require("./routes/admin");
const postroute = require("./routes/postfeed.route");
app.use("/api/v1", admin);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("/api/v1", auth);
app.use("/profile", profile);
app.use("/courses",courses);
app.use("/api/v1", admin);

app.use("/post",postroute);

const jobpostroutes = require("./routes/jobPost");
var JobSearchRouter = require("./routes/JobSearchRouter.js");
const jobapplicationroutes = require("./routes/jobApplication");

app.use("/jobpost", jobpostroutes);
app.use("/JobSearch", JobSearchRouter);
app.use("/jobapplication", jobapplicationroutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app;
