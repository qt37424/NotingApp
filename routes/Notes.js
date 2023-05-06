const router = require("express").Router();
const Post = require("../controllers/noteController")
const { isLoggedIn } = require('../middleware/checkAuth');

router.get("/", async (req, res) => {
  res.send("hello this is Users routes!")
})

router.post("/newNote", isLoggedIn, Post.newPost);
router.put("/update/:id", isLoggedIn, Post.deletePost);
router.delete("/delete/:id", isLoggedIn, Post.modifiedPost);
router.get("getAllPost", isLoggedIn, Post.getAllPost);
router.get("get/:id", isLoggedIn, Post.getUserTimelinePost);

module.exports = router