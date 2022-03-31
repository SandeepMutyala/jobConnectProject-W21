/* author bijitashya*/

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  isAuthenticatedUser,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
module.exports = router;
