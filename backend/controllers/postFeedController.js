// Author: Akshit Jariwala, B00866255

const { response } = require("../app");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

// fetching all the posts from database
exports.fetchAllPosts = async (req, res, next) => {
    try {
        let allPosts = await Post.find({});
    
        // arranging posts to show latest ones first
        allPosts = allPosts.sort(function (a, b) {
          return b.date - a.date;
        });
        return res.status(200).send(allPosts);
      } catch (error) {
        console.log(error);
        return res.status(400).send(allPosts);
      }
};

// upload post to the database
exports.uploadPost = async (req, res, next) => {
    try {
        const { userId, userName, postMessage } = req.body;
        const date = new Date();
        const post = await Post.create({
          userId,
          userName,
          postMessage,
          date,
        });
    
        return res.status(200).json({
          success: true,
          message: `Post upload successful`,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send(post);
      }
};

// Adding comment details of a particular post into the commnet schema of the database
exports.addComment = async (req, res, next) => {
    try {
        const { postID, respondedUserID, respondedUserName, commentMessage } =
          req.body;
        const date = new Date();
    
        const comment = await Comment.create({
          postID,
          respondedUserID,
          respondedUserName,
          commentMessage,
          date,
        });
    
        return res.status(200).json({
          success: true,
          message: `Comment upload successful`,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send(comment);
      }    
};

// fetching comments related to a particular post
exports.fetchPostComment = async (req, res, next) => {
    try {
        let commentPostID = req.body.postID;
        let postComments = await Comment.find({ postID: commentPostID });
    
        // Sorting comments on the post to show the latest ones first
        postComments = postComments.sort(function (a, b) {
          return b.date - a.date;
        });
        return res.status(200).send(postComments);
      } catch (error) {
        console.log(error);
        return res.status(400).send(postComments);
      }    
};

// fetching posts of a particular user from the database
exports.fetchUserPosts = async (req, res, next) => {
    try {
        let userID = req.body.userID;
        let userPosts = await Post.find({ userId: userID });
        userPosts = userPosts.sort(function (a, b) {
          return b.date - a.date;
        });
        return res.status(200).send(userPosts);
      } catch (error) {
        console.log(error);
        return res.status(400).send(userPosts);
      }
};

// deleting posts from the database
exports.deleteUserPost = async (req, res, next) => {
    try {
        let postID = req.body.postID;
        console.log(postID);
        let data = await Post.deleteOne({ _id: postID });
        return res.status(200).send();
      } catch (error) {
        console.log(error);
        return res.status(400).send(data);
      }
};

// fetching the list of post that user have liked
exports.fetchUserLikes = async (req, res, next) => {
    try {
        let userID = req.body.userID;
        const userLikes = await Like.find({ respondedUserID: userID });
        return res.status(200).send(userLikes);
      } catch (error) {
        console.log(error);
        return res.status(400).send(userLikes);
      }
};

// storing post like data into the database
exports.likePost = async (req, res, next) => {
    try {
        let postID = req.body.payload.postID;
        let respondedUserID = req.body.payload.respondedUserID;
    
        let userLike = await Like.find({
          postID: postID,
          respondedUserID: respondedUserID,
        });
    
        if (userLike.length > 0) {
          let data = await Like.deleteOne({
            postID: postID,
            respondedUserID: respondedUserID,
          });
          return res.status(200).send(data);
        } else {
          const postLike = await Like.create({
            postID: postID,
            respondedUserID: respondedUserID,
          });
          return res.status(200).send(postLike);
        }
      } catch (error) {
        console.log(error);
        return res.status(400).send();
      }    
};