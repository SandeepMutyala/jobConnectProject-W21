// Author: Akshit Jariwala, B00866255


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    
    postID: {
        type: String,
        required: true
    },
    respondedUserID:{
        type: String,
        required: true
    }
})

const Like = mongoose.model('postlikes', likeSchema);
module.exports = Like;
