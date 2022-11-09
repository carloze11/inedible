const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Food = require("../models/Food");
const User = require("../models/User");

router.get("/add", ensureAuth, (req, res) => {
    res.render("foods/add");
});

router.post("/", ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Food.create({
            foodName: req.body.foodName,
            foodCategory: req.body.foodCategory,
            ingredients: req.body.ingredients,
            user: req.body.user,
            image: req.body.image,
        });
        console.log("Food created successfully.");
        res.redirect("/dashboard");
    } catch (err) {
        console.log(err);
        res.render("error/500");
    }
});

// Show food by everyone
router.get("/", ensureAuth, async (req, res) => {
    try {
        const foods = await Food.find()
            .populate("user")
            .sort({ foodName: "asc" })
            .lean();
        console.log(foods);
        res.render("foods/index", {
            foods,
            truncate: truncate,
            removeTags: removeTags,
        });
    } catch (err) {
        console.log(err);
        res.render("error/500");
    }
});

// helper functions to be moved to controller along with cbs
const truncate = (str, len) => {
    if (str.length > len && str.length > 0) {
        let newStr = str + " ";
        newStr = str.substr(0, len);
        newStr = str.substr(0, newStr.lastIndexOf(" "));
        newStr = newStr.length > 0 ? newStr : str.substr(0, len);
        return newStr + "...";
    }
    return str;
};

const removeTags = (input) => {
    return input.replace(/<(?:.|\n)*?>/gm, "");
};

module.exports = router;
