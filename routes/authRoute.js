const express = require("express")
const { signupValidator, loginValidator } = require("../validators/authValidator")
const { signup, login, logoutCtrl, getCurrentUserCtrl } = require("../controllers/authController")
const { authentication } = require("../middlewares/authMiddleware");
const passport = require("passport")
const CLIENT_URL = process.env.CLIENT_URL

const router = express.Router()
router.route("/signup").post(signupValidator, signup)
router.route("/login").post(loginValidator, login)
router.route("/logout").post(logoutCtrl);
router.route("/currentUser").get(authentication, getCurrentUserCtrl);
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    res.redirect(CLIENT_URL)
});

module.exports = router