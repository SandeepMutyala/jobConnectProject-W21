// Author: Akshit Jariwala, B00866255


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    
    respondedUserID: {
        type: String,
        required: true
    },

    postID: {
        type: String,
        required: true
    },

    respondedUserName:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        required: true
    },

    commentMessage:{
        type: String,
        required: true
    }
})

const Comment = mongoose.model('postComments', commentSchema);
module.exports = Comment;
