const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 
const session = require("express-session");
const { SetUserLogin } = require("../middleware/checkAuth")

/*
 * CREATE NEW user
 */
exports.createUser = async (req, res) => {
 
  try {
    // decode password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Init new user
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: hashedPassword,
    });

    User.findOne({ username: newUser.username })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          "error",
          "Username exists already, please pick a different one."
        );
        return res.redirect("../../views");
      }
    })
    const user = await newUser.save();
    // res.status(200).json("User is created successfully") //For Postman
    // console.log(res.status(200).json(user));
    return res.render("pages/login",{
      title: "Fisrt Login",
      message: req.flash('loginMessage')
    })
  } 
  
  catch (err) {
    console.log(err);
  }
}

/*
 * POST
 * Login in App
 */
exports.loginApp = async (req, res, callback) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json("User not found");
    }
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.render("pages/login",{
        title: "Wrong Password",
        message: req.flash('loginMessage')
      })
    } else {
      // console.log(res.status(200).json(user));
      // console.log(res.status(400));
      // res.status(200).json("You are Logined into app") // For Postman
      req.session.user = user
      req.session.save();
      return res.render("pages/index", 
      {
        title: "Login successfully", 
        loginMessage: req.flash('loginMessage'), 
        isLoggedIn: true,
        user: user
      });
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

/*
 * UPDATE
 * Update a User
 */
exports.updateUser = async (req, res) => {
  if (req.session.user._id === req.params.id || req.session.user.isAdmin) {
    // check password
    try { 
      const salt = await bcrypt.genSalt(10);
      const match = await bcrypt.compare(req.body.oldPassword, req.session.user.password);
      if (match){
        try { 
          const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
          const user = await User.findByIdAndUpdate(req.params.id, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hashedPassword,
            updatedAt: Date.now()
          });
          // res.status(200).json(user)
          req.session.destroy();
          res.redirect("../../../views/login");
          //Maybe we can call this render after using req.session.destroy() cause in this render having req.flash
          // req.flash(
          //   "error",
          //   "Re-initialize"
          // );
          // return res.render("pages/login",{
          //   title: "Update information Successfully",
          //   message: req.flash('loginMessage'),
          //   isUpdated: true,
          // })
        } 
        catch(err) {
          return res.status(500).json(err);
        }
      } else {
        // res.status(200).json("Password is incorrect")
        return res.render('pages/updateAccount', {
          title: "Re-Update Information",
          user: req.session.user,
          isWrongPassword: true,
        }); 
      }
    } catch(err) {
      return res.status(500).json(err);
    }
  } else { 
    return res.status(403).json("You can update only in your permission account")
  }
}

/*
 * DELETE
 * Delete a User
 */
exports.deleteUser = async (req, res) => {
  if (req.session.user._id === req.params.id || req.body.isAdmin) {
    try { 
      await User.findByIdAndDelete(req.params.id);
      // res.status(200).json("Account has been deleted!")
      req.session.destroy()
      return res.render("pages/index", 
      {
        title: "Home page", 
      });
    } catch(err) {
      return res.status(500).json(err);
    }
  } else { 
    return res.status(403).json("You can delete only in your account")
  }
}

/*
 * GET
 * Get a User
 * localhost:3000/user?username=quang or lh:3000/userId=123435 
 */
exports.getUser = async (req, res) => {
  const userId = req.params.id; 
  try {
    // const user = userId 
    //   ? await User.findById(userId)
    //   : await User.findOne({username: username});
    const user = await User.findById(userId)
    // const {firstname, lastname,...other} = user._doc;
    // res.status(200).json(user);
  } catch(err) {
    return res.status(500).json(err)
  }
}

/*
 * GET
 * Get all Users
 */
exports.getAllUser = async (req, res) => {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);  
  });
}
