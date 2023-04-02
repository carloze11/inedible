const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const {
    productResults,
    productInfo,
    updateFavoriteProducts,
} = require("../controllers/products");

router.post("/results", productResults);
router.post("/results/:id", productInfo);
router.get("/get-favorite-products", getFavoriteProducts);

module.exports = router;
