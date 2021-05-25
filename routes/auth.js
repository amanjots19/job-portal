var express = require("express");
var router = express.Router();
var authController = require("../controllers/login");
var passport = require("passport");
/* GET home page. */
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.postLogin
);

router.post("/registration", authController.postSignup);

module.exports = router;
