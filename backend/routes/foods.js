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

module.exports = router;
