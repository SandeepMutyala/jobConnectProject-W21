/**Author: Raja Harshini Kasibhotla */


const PostFeed = require("../models/post");
const JobPosts = require("../models/jobPost");
const User = require("../models/user");
const PostComment = require("../models/comment");
const { subDays } = require("date-fns");

exports.displayPosts = async (req, res, next) => {
  const posts = await PostFeed.find({});
  PostFeed.find((err, posts) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, posts: posts });
  });
};

exports.displayComments = async (req, res, next) => {
  const comments = await PostComment.find({});
  PostComment.find((err, posts) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, comments: comments });
  });
};

exports.deleteComments = async (req, res, next) => {
  const { id } = req.body;
  const result = await PostComment.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
};

exports.deletePosts = async (req, res, next) => {
  const { id } = req.body;
  const result = await PostFeed.findByIdAndRemove(id, (err) => {
    deleteCommentsUsingPostId(id);
    if (err) return res.send(err);
    return res.json({ success: true });
  });
};

async function deleteCommentsUsingPostId(postId) {
  const result = await PostComment.deleteMany({ postID: postId }, (err) => {
    if (err) return res.send(err);
  });
}
exports.listPosts = async (req, res, next) => {
  const posts = await JobPosts.find({});
  JobPosts.find((err, posts) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, posts: posts });
  });
};

exports.deleteJobPosts = async (req, res, next) => {
  const { id } = req.body;
  const result = await JobPosts.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
};

exports.listEmployers = async (req, res, next) => {
  const employers = await User.find({ role: "employer", verified: false });
  User.find((err, posts) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, employers: employers });
  });
};

exports.listApprovedEmployers = async (req, res, next) => {
  const employers = await User.find({ role: "employer", verified: true });
  User.find((err, posts) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, employers: employers });
  });
};

exports.listExpiredPostings = async (req, res, next) => {
  const posts = await JobPosts.find({});
  JobPosts.find((err, posts) => {
    if (err) return res.json({ success: false, error: err });
    let filteredPosts = [];
    for (let post of posts) {
      var lasteDate = new Date(post.lastDateToApply);
      let today = new Date();
      let dateToCompare = subDays(today, 30);
      if(lasteDate <= dateToCompare ){
      filteredPosts.push(post);
      }
    }
    return res.json({ success: true, expiredPosts: filteredPosts });
  });
};

exports.deleteRejectedEmployers = async (req, res, next) => {
  const { id } = req.body;
  console.log("id : " + id);
  const result = await User.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
};

exports.updateEmployerStatus = async (req, res, next) => {
  const { id } = req.body;
  console.log("body : " + req.body);
  console.log("id : " + id);
  const updatedResult = await User.findByIdAndUpdate(
    id,
    { verified: true },
    (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    }
  );
};


