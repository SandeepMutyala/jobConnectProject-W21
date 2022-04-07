// Author: Akshit Jariwala, B00866255

const express = require("express");
const router = express.Router();

var { fetchAllPosts } = require("../controllers/postFeedController");
var { uploadPost } = require("../controllers/postFeedController");
var {addComment} = require("../controllers/postFeedController");
var {fetchPostComment} = require("../controllers/postFeedController");
var {fetchUserPosts} = require("../controllers/postFeedController");
var {deleteUserPost} = require("../controllers/postFeedController");
var {fetchUserLikes} = require("../controllers/postFeedController");
var {likePost} = require("../controllers/postFeedController");

router.get("/fetchallposts",fetchAllPosts);
router.post("/uploadpost",uploadPost);
router.post("/addcomment",addComment);
router.post("/fetchpostcomment",fetchPostComment);
router.post("/fetchuserposts",fetchUserPosts);
router.put("/deleteuserpost",deleteUserPost);
router.post("/fetchuserlikes",fetchUserLikes);
router.post("/likepost",likePost);

module.exports = router;