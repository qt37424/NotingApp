const router = require("express").Router();
const Note = require("../controllers/noteController")
const { requiresLogin } = require('../middleware/checkAuth');

router.get("/", async (req, res) => {
  res.send("hello this is Users routes!")
})

router.post("/newNote", requiresLogin, Note.newNote);
router.put("/update/:id", requiresLogin, Note.deleteNote);
router.delete("/delete/:id", requiresLogin, Note.modifiedNote);
router.get("getAllNote", requiresLogin, Note.getAllNote);
router.get("get/:id", requiresLogin, Note.getUserTimelineNote);

module.exports = router