const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const Post = require("./models/post");
const Comment = require("./models/comment");

app.use(cors());
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const auth = require("./routes/auth");



app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("/api/v1", auth);

app.get("/FetchAllPosts", async (req,res) => {
  
  const allPosts = await Post.find({})
  return res.status(200).send(allPosts);

})

app.post("/UploadPost", async (req,res) => {
  
  const { userId, userName, postMessage } = req.body;
  const date = new Date();
  const post = await Post.create({
        userId,
        userName,
        postMessage,
        date
      });
  
  return res.status(200).json({
    success: true,
    message: `Post upload successful`,
  });
})

app.post("/AddComment", async (req,res) => {
  
  const { postID, respondedUserID, respondedUserName, commentMessage } = req.body;
  const date = new Date();

  const comment = await Comment.create({
        postID,
        respondedUserID,
        respondedUserName,
        commentMessage,
        date
  });
  
  return res.status(200).json({
    success: true,
    message: `Comment upload successful`,
  });
})

app.post("/FetchPostComment", async (req,res) => {
  
  let commentPostID = req.body.postID;
  console.log(commentPostID);
  const postComments = await Comment.find({postID: commentPostID})
  console.log(postComments);
  return res.status(200).send(postComments);
})

module.exports = app;
