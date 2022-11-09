const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Food = require("../models/Food");
const User = require("../models/User");

// MOVE CBs TO A CONTROLLER FILE!!!
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
        const currUser = req.user;
        res.render("foods/index", {
            foods,
            currUser: currUser,
            truncate: truncate,
            removeTags: removeTags,
            editIcon: editIcon,
        });
    } catch (err) {
        console.log(err);
        res.render("error/500");
    }
});

router.get("/edit/:id", ensureAuth, async (req, res) => {
    const food = await Food.findOne({ _id: req.params.id }).lean();

    if (!food) {
        return res.render("error/404");
    }

    if (food.user != req.user.id) {
        res.redirect("/foods");
    } else {
        res.render("foods/edit", {
            food,
        });
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

const editIcon = (foodUser, loggedUser, foodId, floating = true) => {
    if (foodUser._id.toString() === loggedUser._id.toString()) {
        if (floating) {
            return `<a href="/foods/edit/${foodId}" class="btn-floating halfway-fab green"><i class="fas fa-edit fa-small"></i></a>`;
        } else {
            return `<a href="/foods/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
        }
    } else {
        return "";
    }
};

module.exports = router;
