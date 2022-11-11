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

router.get("/search", ensureAuth, async (req, res) => {
    res.render("foods/search");
});

// Spoonacular API
router.post("/results", ensureAuth, async (req, res) => {
    try {
        let productSearch = req.body.productSearch;
        let showMore = req.body.showMore || 0;
        console.log(`This is ${showMore}`);
        const api_url = `https://api.spoonacular.com/food/products/search?query=${productSearch}&apiKey=${process.env.SPOON_API_KEY}`;
        const data = await fetch(api_url);
        const json = await data.json();
        res.render("foods/results", {
            productSearch: productSearch,
            items: json.products,
            total: json.totalProducts,
            number: json.number + showMore,
        });
    } catch (err) {
        console.error(err);
        res.render("/error/404");
    }
});

// Show specific
router.get("/results/:id", ensureAuth, async (req, res) => {
    try {
        let itemId = req.params.id;
        const api_url = `https://api.spoonacular.com/food/products/${itemId}?apiKey=${process.env.SPOON_API_KEY}`;
        const data = await fetch(api_url);
        const json = await data.json();
        console.log(json);
        res.render("foods/showapi", {
            title: json.title,
            ingredients: json.ingredientList,
            image: json.image,
        });
    } catch (err) {
        console.error(err);
        res.render("error/404");
    }
});

router.get("/:id", ensureAuth, async (req, res) => {
    try {
        let food = await Food.findById(req.params.id).populate("user").lean();

        if (!food) {
            return res.render("error/404");
        }

        const currUser = req.user;
        res.render("foods/show", {
            food,
            currUser: currUser,
            truncate: truncate,
            removeTags: removeTags,
            editIcon: editIcon,
        });
    } catch (err) {
        console.error(err);
        res.render("error/404");
    }
});

router.get("/user/:userid", ensureAuth, async (req, res) => {
    try {
        const foods = await Food.find({
            user: req.params.userid,
            status: "public",
        })
            .populate("user")
            .lean();
        const currUser = req.user;
        res.render("foods/index", {
            foods,
            currUser: currUser,
            truncate: truncate,
            removeTags: removeTags,
            editIcon: editIcon,
        });
    } catch {
        console.error(err);
        res.render("/errors/500");
    }
});

router.get("/edit/:id", ensureAuth, async (req, res) => {
    try {
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
    } catch (err) {
        console.error(err);
        res.render("/error/505");
    }
});

router.put("/:id", ensureAuth, async (req, res) => {
    try {
        let food = await Food.findById(req.params.id).lean();
        if (!food) {
            return res.render("error/404");
        }
        if (food.user != req.user.id) {
            res.redirect("/foods");
        } else {
            food = await Food.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                {
                    new: true,
                    runValidatory: true,
                }
            );
            res.redirect("/dashboard");
        }
    } catch (err) {
        console.error(err);
        res.render("/error/500");
    }
});

router.delete("/:id", ensureAuth, async (req, res) => {
    try {
        await Food.remove({ _id: req.params.id });
        res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        res.render("/error/500");
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
            return `<a href="/foods/edit/${foodId}"><i class="fas fa-edit"></i></a>`;
        }
    } else {
        return "";
    }
};

module.exports = router;
