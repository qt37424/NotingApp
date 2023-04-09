const router = require("express").Router();
var flash = require('connect-flash');
const { isLoggedIn } = require('../middleware/checkAuth');

// index page 
router.get('/', function(req, res) {
  res.render('pages/index', {
    title: "about page",
    user: req.user
    // user: sessionStorage.getItem("user") = undefined ? "null" : sessionStorage.getItem("user") 
  });
});

// about page 
router.get('/about', isLoggedIn, function(req, res) {
  res.render('pages/about', {
    title: 'About Page', 
    user: localStorage.getItem("user") = undefined ? "null" : localStorage.getItem("user")
    // user: req.user
  });
});

// about page 
router.get('/login', function(req, res, next) { 
  res.render('pages/login', { 
      title: 'Login Page', 
      message: req.flash('loginMessage'),
      user: function () { return localStorage.getItem("user") = null ? null : localStorage.getItem("user") }
      // user: req.user
    }); 
});

// GET Signup
router.get('/signup', function(req, res) { 
  res.render('pages/signup', 
    { 
      title: 'Signup Page', 
      message: req.flash('signupMessage'), 
      // user: sessionStorage.getItem("user") = undefined ? "null" : sessionStorage.getItem("user") 
      user: req.user
    }); 
});

// Logout
router.get('/logout', function(req, res) {
  // sessionStorage.removeItem("user")
  res.render('pages/logout', {
    title: "Log out",
    // user: sessionStorage.getItem("user") = undefined ? "null" : sessionStorage.getItem("user") 
    user: null
  }); 
});


module.exports = router