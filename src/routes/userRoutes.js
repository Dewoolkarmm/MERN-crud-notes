const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  RegisterUser,
  LoginUser,
  ShowAllUser,
  SingleUser,
  UpadateUser,
  DeleteUser,
} = require("../controllers/userController");

router.get("/test", (req, res) => {
  res.send("helo");
});

//Register user route
router.post("/register", RegisterUser);

//Login User
router.post("/login", LoginUser);

//Show All User
router.get("/user", auth, ShowAllUser);

//Show Single User
router.get("/user/:id", auth, SingleUser);

//Update User
router.put("/user/:id", auth, UpadateUser);

//Delete User
router.delete("/user/:id", auth, DeleteUser);

module.exports = router;
