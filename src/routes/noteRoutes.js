const express = require("express");
const router = express.Router();
const {
  CreateNote,
  UpdateNote,
  ViewAlllNotes,
  DeleteNote,
} = require("../controllers/notecontroller");
const auth = require("../middleware/auth");

router.post("/create", auth, CreateNote);
router.get("/viewall", auth, ViewAlllNotes);
router.put("/update/:id", auth, UpdateNote);
router.delete("/delete/:id", auth, DeleteNote);

module.exports = router;
