const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

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
    if (req.user) {
        return res.redirect("/profile");
    }
    res.render("signup", {
        title: "Signup",
    });
};

exports.postSignup = (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmpty(req.body.username))
        validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(req.body.password, { min: 8 }))
        validationErrors.push({
            msg: "Password must be at least 8 characters long",
        });
    if (req.body.password !== req.body.confirmPassword)
        validationErrors.push({ msg: "Passwords do not match " });

    if (validationErrors.length) {
        req.flash("errors", validationErrors);
        return res.redirect("../signup");
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    User.findOne(
        { $or: [{ username: req.body.username }] },
        (err, existingUser) => {
            if (err) {
                return next(err);
            }
            if (existingUser) {
                req.flash("errors", {
                    msg: "Account with that username already exists.",
                });
                return res.redirect("../signup");
            }
            user.save((err) => {
                if (err) {
                    return next(err);
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect("/profile");
                });
            });
        }
    );
};
