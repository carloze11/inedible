const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
    getLogin,
    postLogin,
    getLogout,
    signup,
} = require("../controllers/auth");

router.post("/login", postLogin);

router.post("/signup", signup);

router.get("/logout", getLogout);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

////GOOGLE OAUTH////
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
