const express = require("express");
const router = express.Router();
const passport = require("passport");
const homePageController = require("../controllers/homePage");
const authController = require("../controllers/auth");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// // Successful Login
// router.get("/login/successful", (req, res) => {
//     if (req.user) {
//         res.status(200).json({
//             error: false,
//             message: "Successful",
//             user: req.user,
//         });
//     } else {
//         res.status(403).json({ error: true, message: "Not authorized." });
//     }
// });

// // Failed login
// router.get("/login/failed", (req, res) => {
//     res.status(401).json({
//         error: true,
//         message: "Login failed.",
//     });
// });

// google auth callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000",
    }),
    (req, res) => {
        // Successful authentication, redirect secrets.
        res.redirect("http://localhost:3000/");
    }
);

// Logout user
app.get("/logout", function (req, res) {
    res.redirect("http://localhost:3000/");
});

module.exports = router;
