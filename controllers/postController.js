const User = require("../models/User");
const Post = require("../models/Post")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 
const session = require("express-session");

/**
 * Create new POST
 */
exports.newPost = async function (req, res) {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err)
  }
} 

/**
 * Update Post Content
 */
exports.modifiedPost = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (Post.userId === req.params.userId) { // chỗ này nếu middleware ổn thì xóa bớt đi
      await post.updateOne( { $set: req.body } );
      res.status(200).json("The post have been updated")
    } else {
      res.status(403).json("You can't configure this post")
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

/**
 * delete post
 */
exports.deletePost = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (Post.userId === req.params.userId) { // chỗ này nếu middleware ổn thì xóa bớt đi
      await post.deleteOne();
      res.status(200).json("The post have been deleted")
    } else {
      res.status(403).json("You can't delete this post")
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

/**
 * 
 * gget a Post
 */
exports.getPost = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
  } catch (err) {
    res.status(500).json(err)
  }
}

/**
 * Timeline box in a duration
 */
exports.getUserTimelinePost = async function (req, res) {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map(friendId => { 
        return Post.find({ userId: friendId });
      })
    ) 
    res.status(200).json(userPosts.concat(...friendPosts))
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.getAllPost = async function (req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
    // đến đây
  } catch (err) {
    res.status(500).json(err);
  }
}