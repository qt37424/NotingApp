const router = require("express").Router();
const User = require("../controllers/userController")
const { isAdmin, requiresLogin } = require('../middleware/checkAuth');

router.get("/", async (req, res) => {
  res.send("hello this is Users routes!")
})

router.post("/register", User.createUser)
router.post("/login", User.loginApp)
router.put("/update/:id", requiresLogin, User.updateUser)
router.delete("/:id", User.deleteUser)
router.get("/", User.getUser) // syntax for this api localhost:3000/user?username=quang or lh:3000/userId=123435
// router.get("/getAll", isAdmin, User.getAllUser) // It's for admin

module.exports = router