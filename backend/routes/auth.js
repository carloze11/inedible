const express = require("express");
const router = express.Router();
const passport = require("passport");

const { loginUser, signupUser, deleteUser } = require("../controllers/auth");

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/delete-user", deleteUser);

////GOOGLE OAUTH////

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// google auth callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
    }),
    (req, res) => {
        // Successful authentication, redirect secrets.
        res.redirect("/dashboard");
    }
);

// Logout user
router.post("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.redirect("/");
    });
    console.log("logged out");
});

module.exports = router;
