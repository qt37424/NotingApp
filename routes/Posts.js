const router = require("express").Router();
const Post = require("../controllers/postController")
const { isLoggedIn } = require('../middleware/checkAuth');

router.get("/", async (req, res) => {
  res.send("hello this is Users routes!")
})

router.post("/newPost", isLoggedIn, Post.newPost);
router.put("/update/:id", isLoggedIn, Post.deletePost);
router.delete("/update/:id", isLoggedIn, Post.modifiedPost);
router.get("getAllPost", isLoggedIn, Post.getAllPost);
router.get("get/:id", isLoggedIn, Post.getUserTimelinePost);

module.exports = router