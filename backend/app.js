// Co - Author: Akshit Jariwala, B00866255

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

// fetching all the posts from database
app.get("/fetchAllPosts", async (req,res) => {
  
  try{
  let allPosts = await Post.find({})

  // arranging posts to show latest ones first
  allPosts = allPosts.sort(function(a, b) {
    return (b.date) - (a.date);
  });
  return res.status(200).send(allPosts);
  } catch (error) {
    console.log(error)
    return res.status(400).send(allPosts);
  }
})

// upload post to the database
app.post("/uploadPost", async (req,res) => {
  
  try{
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
  } catch (error) {
      console.log(error)
      return res.status(400).send(post);
  }
})

// Adding comment details of a particular post into the commnet schema of the database
app.post("/addComment", async (req,res) => {
  
  try{
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
  } catch (error) {
      console.log(error)
      return res.status(400).send(comment);
  }
})


// fetching comments related to a particular post
app.post("/fetchPostComment", async (req,res) => {
  
  try{
  let commentPostID = req.body.postID;
  let postComments = await Comment.find({postID: commentPostID})

  // Sorting comments on the post to show the latest ones first
    postComments = postComments.sort(function(a, b) {
      return (b.date) - (a.date);
    });
    return res.status(200).send(postComments);
  } catch (error) {
      console.log(error)
      return res.status(400).send(postComments);
  }
})

// fetching posts of a particular user from the database
app.post("/fetchUserPosts", async (req,res) => {
  
  try{
  let userID = req.body.userID;
  let userPosts = await Post.find({userId: userID})
  userPosts = userPosts.sort(function(a, b) {
    return (b.date) - (a.date);
  });
  return res.status(200).send(userPosts);
  } catch (error) {
      console.log(error)
      return res.status(400).send(userPosts);
  }
})

// deleting posts from the database
app.put("/deleteUserPost", async (req,res) => {
  
  try{
    let postID = req.body.postID;
    console.log(postID)
    let data = await Post.deleteOne({_id : postID});
    return res.status(200).send();
  } catch (error) {
      console.log(error)
      return res.status(400).send(data);
  }
})

// fetching the list of post that user have liked
app.post("/fetchUserLikes", async (req,res) => {
  
  try{
    let userID = req.body.userID;
    const userLikes = await Like.find({respondedUserID: userID})
    return res.status(200).send(userLikes);
  } catch (error) {
      console.log(error)
      return res.status(400).send(userLikes);
  }
})

// storing post like data into the database
app.post("/likePost", async (req,res) => {
  
  try{
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
  } catch (error) {
      console.log(error)
      return res.status(400).send();
  }
})

const jobpostroutes = require("./routes/jobPost")
var JobSearchRouter = require("./routes/JobSearchRouter.js")

app.use("/jobpost", jobpostroutes);
app.use("/JobSearch",JobSearchRouter);

module.exports = app;
