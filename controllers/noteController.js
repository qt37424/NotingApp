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
  try {
    const savedNote = await newNote.save();
    // res.status(200).json(newNote)
    return res.render("pages/Notes/detail", {
      user: req.session.user,
      note: savedNote
    });
  } catch (err) {
    res.status(500).json(err)
  }
} 

/**
 * Update Note Content
 */
exports.modifiedNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note.userId === req.session.user._id) { // Check user delete note is user created note 
      await note.updateOne( { $set: req.body } );
      const noteUpdate = await Note.findById(req.params.id);
      // res.status(200).json(noteUpdate)
      return res.render("pages/Notes/detail", {
        user: req.session.user,
        note: noteUpdate
      });
    } else {
      // res.status(200).json("There is an error when updating")
      res.render('pages/error', {
        title: 'Error Page', 
        user: req.session.user
      });
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
    const note = await Note.findById(req.params.id);
    if (note.userId === req.session.user._id) { // Check user delete note is user created note 
      await note.deleteOne();
      const noteList = await Note.find({ userId: req.session.user._id })
      // res.status(200).json("This note is delete")
      res.render('pages/about', {
        title: 'About Page', 
        user: req.session.user,
        NoteList: noteList
      });
    } else {
      res.render('pages/error', {
        title: 'Error Page', 
        user: req.session.user
      });
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

/**
 * 
 * get a Note
 */
exports.getNote = async (req, res) => {
  try {
    return Note = await Note.findById(req.session.user._id);
    // res.status(200).json(Note)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.getAllNote = async function (req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    const Notes = await Note.find({ userId: user._id });
    // res.status(200).json(Notes);
    // đến đây
  } catch (err) {
    res.status(500).json(err);
  }
}