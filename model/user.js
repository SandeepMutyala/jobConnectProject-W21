const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  id: {
    type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
