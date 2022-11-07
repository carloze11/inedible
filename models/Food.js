const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    foodName: { type: String, required: true },
    foodCategory: { type: String, enum: [Dairy, gluten, nut] },
    ingredients: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Food", FoodSchema);
