const passport = require("passport");
const validator = require("validator");
const User = require("../models/users");

exports.getLogin = (req, res) => {
    if (req.user) {
        return res.redirect("/profile");
    }
    res.render("login", {
        title: "Login",
    });
};

exports.postLogin = (req, res, next) => {
    const validationErrors = [];
    if (validator.isEmpty(req.body.username))
        validationErrors.push({ msg: "Please enter a username." });
    if (validator.isEmpty(req.body.password))
        validationErrors.push({ msg: "Please enter a password." });

    if (validationErrors.length) {
        req.flash("errors", validationErrors);
        return res.redirect("/login");
    }

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash("errors", info);
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", { msg: "Success! You are logged in." });
            res.redirect(req.session.returnTo || "/profile");
        });
    })(req, res, next);
};

exports.getLogout = (req, res) => {
    req.logout(() => {
        console.log("User has logged out");
    });
    req.session.destroy((err) => {
        if (err)
            console.log(
                "Error: Failed to destroy the session during logout.",
                err
            );
        req.user = null;
        res.redirect("/");
    });
    res.send("This is the logout page");
};

exports.getSignup = (req, res) => {
    res.render("signup", {
        title: "Signup",
    });
};

exports.postSignup = (req, res) => {
    res.send("This is the signup post page");
};
