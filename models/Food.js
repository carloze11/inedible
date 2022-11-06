const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: { type: String, required: true },
    ingredients: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Food", FoodSchema);
