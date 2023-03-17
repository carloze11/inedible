const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// env var
const SECRET = keys.secret;

// jwt token
const createToken = (_id) => {
    return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
};

// login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // use static login method
        const user = await User.login(email, password);

        //create token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// signup user
exports.signupUser = async (req, res) => {
    // get email and password from params
    const { email, password, confirmPassword } = req.body;

    try {
        // create user using model static method
        const user = await User.signup(email, password, confirmPassword);

        // create token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE user :(
exports.deleteUser = async (req, res) => {
    try {
        const user_id = req.user._id;

        await User.findByIdAndDelete({ _id: user_id });
        res.status(200);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
