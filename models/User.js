const mongoose = require("mongoose");
const shortid = require('shortid');

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  username: {
    type: String, 
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  }, 
  isAdmin: { 
    type: Boolean,
    default: false,
  }
},
{
  timestamps: true,
}); 


module.exports = mongoose.model("User", UserSchema);