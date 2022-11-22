const express = require("express");
const router = express.Router();
const {signUp, logIn, googleLogin, getUsers, getUser} = require("../controllers/auth");

router.get("/users", getUsers)
router.get("/user/:id", getUser)
router.post("/signup", signUp)
router.post("/login", logIn)
router.post("/google", googleLogin)

module.exports = router;
