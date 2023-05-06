const mongoose = require("mongoose");
const shortid = require('shortid');

const PostSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
  },
  title: {
    type: String,
  },
  topic: {
    type: String,
  }
},
{
  timestamps: true,
}); 

module.exports = mongoose.model("Note", PostSchema);