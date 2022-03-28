const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const Post = require("./models/post");
const Comment = require("./models/comment");
const Like = require("./models/like");

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
  
  let allPosts = await Post.find({})
  allPosts = allPosts.sort(function(a, b) {
    return (b.date) - (a.date);
  });
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
  let postComments = await Comment.find({postID: commentPostID})
  postComments = postComments.sort(function(a, b) {
    return (b.date) - (a.date);
  });
  return res.status(200).send(postComments);
})

app.post("/FetchUserPosts", async (req,res) => {
  
  let userID = req.body.userID;
  let userPosts = await Post.find({userId: userID})
  userPosts = userPosts.sort(function(a, b) {
    return (b.date) - (a.date);
  });
  return res.status(200).send(userPosts);
})

app.put("/DeleteUserPost", async (req,res) => {
  
  let postID = req.body.postID;
  console.log(postID)
  let data = await Post.deleteOne({_id : postID});
  return res.status(200).send();
})

app.post("/FetchUserLikes", async (req,res) => {
  
  let userID = req.body.userID;
  const userLikes = await Like.find({respondedUserID: userID})
  return res.status(200).send(userLikes);
})

app.post("/LikePost", async (req,res) => {
  
  let postID = req.body.payload.postID;
  let respondedUserID = req.body.payload.respondedUserID;

  let userLike = await Like.find({
    postID : postID,
    respondedUserID : respondedUserID
  })

  if(userLike.length > 0){
    let data = await Like.deleteOne(
      { 
        postID: postID,
        respondedUserID: respondedUserID
      }
    )
    return res.status(200).send(data);
  } else {
    const postLike = await Like.create(
      { 
        postID: postID,
        respondedUserID: respondedUserID
      })
    return res.status(200).send(postLike);
  }
})

module.exports = app;
