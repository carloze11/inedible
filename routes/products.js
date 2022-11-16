const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const productsController = require("../controllers/products");

router.get("/search", ensureAuth, productsController.getSearch);
router.post("/results", ensureAuth, productsController.postResults);
router.get("/results/:id", ensureAuth, productsController.getProduct);

module.exports = router;
