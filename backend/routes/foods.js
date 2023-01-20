const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Food = require("../models/Food");
const User = require("../models/User");
const foodsController = require("../controllers/foodsController");

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
router.get("/", ensureAuth, foodsController.getAllFood);

// Get single food item
router.get("/:id", ensureAuth, foodsController.getFoodItem);

// Get single user's food
router.get("/user/:userid", ensureAuth, foodsController.getUserFood);

// Get user food item to edit
router.get("/edit/:id", ensureAuth, foodsController.getEditFood);

// Edit user food item
router.put("/:id", ensureAuth, foodsController.editFood);

// Delete user food item
router.delete("/:id", ensureAuth, foodsController.eleteFood);

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
            return "<a href={`/foods/edit/${foodId}`} class='btn-floating halfway-fab green'><i class='fas fa-edit fa-small'></i></a>";
        } else {
            return "<a href={`/foods/edit/${foodId}`}><i class='fas fa-edit'></i></a>";
        }
    } else {
        return "";
    }
};

module.exports = router;
