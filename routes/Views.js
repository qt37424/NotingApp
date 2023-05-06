const router = require("express").Router();
var flash = require('connect-flash');
const { requiresLogin } = require('../middleware/checkAuth');
const User = require("../controllers/userController")
const mongoose = require("mongoose");

// index page 
router.get('/', function(req, res) {
  res.render('pages/index', {
    title: "about page",
  });
});

// about page 
router.get('/about', requiresLogin, function(req, res, callback) {
  console.log("Quangtran: " + req.session.user);
  res.render('pages/about', {
    title: 'About Page', 
    user: req.session.user
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

router.get('/newNote', function(req, res) {
  res.render('pages/Notes/newNote', {
    title: "New Post",
    user: req.session.user
  }); 
});

module.exports = router