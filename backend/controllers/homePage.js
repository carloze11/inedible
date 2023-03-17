const Food = require("../models/Food");

exports.getHomePage = (req, res) => {
    console.log("hi /");
    res.redirect("/");
};

exports.getDashboard = async (req, res) => {
    try {
        const foods = await Food.find({ user: req.user.id }).lean();

        res.send({
            name: req.user.displayName.split(" ")[0],
            foods,
        });
    } catch (err) {
        console.error(err);
        res.redirect("error/500");
    }
};
