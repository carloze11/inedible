exports.getAllFood = async (req, res) => {
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
};

exports.getFoodItem = async (req, res) => {
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
};

exports.getUserFood = async (req, res) => {
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
};

exports.getEditFood = async (req, res) => {
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
};

exports.editFood = async (req, res) => {
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
};

exports.deleteFood = async (req, res) => {
    try {
        await Food.remove({ _id: req.params.id });
        res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        res.render("/error/500");
    }
};

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
