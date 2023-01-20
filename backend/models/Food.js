const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    foodName: { type: String, required: true },
    foodCategory: { type: String, enum: ["Dairy", "Gluten", "Nut"] },
    ingredients: { type: String, required: true },
    image: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Food", FoodSchema);
