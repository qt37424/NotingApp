const User = require("../models/User");
const Note = require("../models/Note")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 
const session = require("express-session");

/**
 * Create new Note
 */
exports.newNote = async (req, res) => {
  // Init new note
  const newNote = new Note({
    userId: req.session.user._id,
    content: req.body.content,
    title: req.body.title, 
    topic: req.body.topic,
  });
  console.log(newNote);
  try {
    const savedNote = await newNote.save();
    return res.redirect("../../views/index");
  } catch (err) {
    res.status(500).json(err)
  }
} 

/**
 * Update Note Content
 */
exports.modifiedNote = async (req, res) => {
  try {
    const Note = await Note.findById(req.params.id);
    if (Note.userId === req.params.userId) { // chỗ này nếu middleware ổn thì xóa bớt đi
      await Note.updateOne( { $set: req.body } );
      res.status(200).json("The Note have been updated")
    } else {
      res.status(403).json("You can't configure this Note")
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

/**
 * delete Note
 */
exports.deleteNote = async (req, res) => {
  try {
    const Note = await Note.findById(req.params.id);
    if (Note.userId === req.params.userId) { // chỗ này nếu middleware ổn thì xóa bớt đi
      await Note.deleteOne();
      res.status(200).json("The Note have been deleted")
    } else {
      res.status(403).json("You can't delete this Note")
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

/**
 * 
 * gget a Note
 */
exports.getNote = async (req, res) => {
  try {
    const Note = await Note.findById(req.params.id);
  } catch (err) {
    res.status(500).json(err)
  }
}

/**
 * Timeline box in a duration
 */
exports.getUserTimelineNote = async function (req, res) {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userNotes = await Note.find({ userId: currentUser._id });
    const friendNotes = await Promise.all(
      currentUser.followings.map(friendId => { 
        return Note.find({ userId: friendId });
      })
    ) 
    res.status(200).json(userNotes.concat(...friendNotes))
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.getAllNote = async function (req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    const Notes = await Note.find({ userId: user._id });
    res.status(200).json(Notes);
    // đến đây
  } catch (err) {
    res.status(500).json(err);
  }
}