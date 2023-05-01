const router = require("express").Router();
var flash = require('connect-flash');
const { isLoggedIn, UserIdLogin } = require('../middleware/checkAuth');

// index page 
router.get('/', function(req, res) {
  res.render('pages/index', {
    title: "about page",
    user: function () { 
      return localStorage.getItem("user") 
    }
  });
});

// about page 
router.get('/about', isLoggedIn, function(req, res) {
  res.render('pages/about', {
    title: 'About Page', 
    user: function () { 
      return localStorage.getItem("user") 
    }
  });
});

// about page login
router.get('/login', function(req, res, next) { 
  res.render('pages/login', { 
    title: 'Login Page', 
    message: req.flash('loginMessage'),
    user: UserIdLogin
  }); 
});

// GET Signup
router.get('/signup', function(req, res) { 
  res.render('pages/signup', { 
    title: 'Signup Page', 
    message: req.flash('signupMessage'), 
    user: function () { return localStorage.getItem("user") = null ? null : localStorage.getItem("user") }
    // user: req.user
  });   
});

// Logout
router.get('/logout', function(req, res) {
  res.render('pages/logout', {
    title: "Log out",
    user: function () { return localStorage.removeItem("user") }
    // user: sessionStorage.getItem("user") = undefined ? "null" : sessionStorage.getItem("user") 
  }); 
});


module.exports = router