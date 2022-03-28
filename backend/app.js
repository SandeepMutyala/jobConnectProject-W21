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
const profile = require("./routes/profile.route")

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("/api/v1", auth);
app.use("/profile",profile);

module.exports = app;
