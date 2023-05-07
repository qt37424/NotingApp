const router = require("express").Router();
var flash = require('connect-flash');
const { requiresLogin } = require('../middleware/checkAuth');
const Note = require("../models/Note")
const mongoose = require("mongoose");

// index page 
router.get('/', function(req, res) {
  res.render('pages/index', {
    title: "about page",
  });
});

// about page 
router.get('/about', requiresLogin, async function(req, res) {
  const noteList = await Note.find({ userId: req.session.user._id })
  res.render('pages/about', {
    title: 'About Page', 
    user: req.session.user,
    NoteList: noteList
  });
});

// about page login
router.get('/login', function(req, res, next) { 
  res.render('pages/login', { 
    title: 'Login Page', 
    message: req.flash('loginMessage')
  }); 
});

// GET Signup
router.get('/signup', function(req, res) { 
  res.render('pages/signup', { 
    title: 'Signup Page', 
    message: req.flash('signupMessage')
  });   
});

// Logout
router.get('/logout', function(req, res) {
  req.session.destroy();
  res.render('pages/logout', {
    title: "Log out"
  }); 
});

router.get('/update-account', requiresLogin, function(req, res) {
  res.render('pages/updateAccount', {
    title: "Update Information",
    user: req.session.user
  }); 
});

router.get('/newNote', function(req, res) {
  res.render('pages/Notes/newNote', {
    title: "New Post",
    user: req.session.user
  }); 
});

router.get('/detailNote/:id', requiresLogin, async function(req, res){
  const note = await Note.findById(req.params.id); 
  res.render('pages/Notes/detail', {
    title: "New Post",
    user: req.session.user,
    note: note
  });
});

router.get('/delete/:id', requiresLogin, async function(req, res){
  await Note.deleteOne(req.params.id).where({ user: req.session.user._id }); 
  const noteList = await Note.find({ userId: req.session.user._id })
  res.render('pages/about', {
    title: "New Post",
    user: req.session.user,
    NoteList: noteList
  });
});

module.exports = router