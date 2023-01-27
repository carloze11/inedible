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
        res.setHeader("Content-Type", "application/json");
        res.send(
            JSON.stringify({ success: true, message: "Logged in successfully" })
        );
    }
);

// Logout user
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/login");
    });
});

// router.post("/login", authController.postLogin);
// router.get("/logout", authController.getLogout);
// router.get("/signup", authController.getSignup);
// router.post("/signup", authController.postSignup);

module.exports = router;
