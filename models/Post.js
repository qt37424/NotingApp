const mongoose = require("mongoose");
const shortid = require('shortid');

const NoteSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  img: { 
    type: String
  }
},
{
  timestamps: true,
}); 

module.exports = mongoose.model("Note", NoteSchema);