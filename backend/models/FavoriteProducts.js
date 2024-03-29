const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteProductSchema = new Schema({
    productId: { type: String, required: true },
    productName: { type: String },
    productDescription: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FavoriteProduct", FavoriteProductSchema);
