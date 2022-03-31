const mongoose = require("mongoose");

const postFeedSchema = new mongoose.Schema({
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

module.exports = mongoose.model("PostFeed", postFeedSchema);
