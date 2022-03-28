// Author: Akshit Jariwala, B00866255


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    
    postMessage: {
        type: String,
        required: true
    },

    userId:{
        type: String,
        required: true
    },

    date:{
        type: Date,
        required: true
    },

    comments:{
        type: Array
    },

    userName:{
        type: String,
        required: true
    }
})

const Post = mongoose.model('postfeed', postSchema);
module.exports = Post;
