const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
    if (req.user) {
        return res.status(200).json({ email: user.email });
    }
    res.status(400).json({ error: error.message });
};

exports.postLogin = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);
        res.status(200).json({ email: user.email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

    const validationErrors = [];
    if (validator.isEmpty(username))
        validationErrors.push({ msg: "Please enter a username." });
    if (validator.isEmpty(password))
        validationErrors.push({ msg: "Please enter a password." });

    if (validationErrors.length) {
        return res.status(400).json({ errors: validationErrors });
    }

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ errors: [info] });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).json({ message: "Success! You are logged in." });
        });
    })(req, res, next);
};

exports.getLogout = (req, res, next) => {
    req.logout((error) => {
        console.log("User was successfully logged out.");
        if (error) {
            return next(error);
        }
        res.redirect("/");
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

// exports.getSignup = (req, res) => {
//     if (req.user) {
//         return res.redirect("/profile");
//     }
//     res.render("signup", {
//         title: "Signup",
//     });
// };

exports.signup = (req, res, next) => {
    const { username, password } = req.body;

    const validationErrors = [];
    if (!validator.isEmpty(username))
        validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(password, { min: 8 }))
        validationErrors.push({
            msg: "Password must be at least 8 characters long",
        });
    if (password !== confirmPassword)
        validationErrors.push({ msg: "Passwords do not match " });

    if (validationErrors.length) {
        return res.status(400).json({ errors: validationErrors });
    }

    const user = new User({
        username: username,
        password: password,
    });

    User.findOne({ $or: [{ username: username }] }, (err, existingUser) => {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.status(400).json({ error: "User already exists." });
        }
        user.save((err) => {
            if (err) {
                return next(err);
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.status(200).json({ username });
            });
        });
    });
};
