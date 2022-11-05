const express = require("express");
const router = express.Router();
const passport = require("passport");
const homePageController = require("../controllers/homePage");
const authController = require("../controllers/auth");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
//google auth callback
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

// Logout user
router.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// router.post("/login", authController.postLogin);
// router.get("/logout", authController.getLogout);
// router.get("/signup", authController.getSignup);
// router.post("/signup", authController.postSignup);

module.exports = router;
