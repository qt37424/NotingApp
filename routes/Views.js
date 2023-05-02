const router = require("express").Router();
var flash = require('connect-flash');
const { isLoggedIn, UserLogin } = require('../middleware/checkAuth');
const User = require("../models/User");

// index page 
router.get('/', function(req, res) {
  res.render('pages/index', {
    title: "about page",
    user: UserLogin
  });
});

// about page 
router.get('/about', isLoggedIn, function(req, res) {
  res.render('pages/about', {
    title: 'About Page', 
    user: UserLogin
  });
});

// about page login
router.get('/login', function(req, res, next) { 
  res.render('pages/login', { 
    title: 'Login Page', 
    message: req.flash('loginMessage'),
    user: UserLogin
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
  res.render('pages/logout', {
    title: "Log out"
  }); 
});

router.get('/newPost', function(req, res) {
  res.render('pages/Posts/newPost', {
    title: "Log out",
    user: UserLogin
  }); 
});

module.exports = router