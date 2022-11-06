const Food = require("../models/Food");

exports.getHomePage = (req, res) => {
    res.render("login");
};

exports.getDashboard = async (req, res) => {
    try {
        const foods = await Food.find({ user: req.user.id }).lean();
        res.render("dashboard", {
            name: req.user.displayName.split(" ")[0],
            foods,
        });
    } catch (err) {
        console.error(err);
    }
};
