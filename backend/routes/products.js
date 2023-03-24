const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const { productResults, productInfo } = require("../controllers/products");

router.post("/results", productResults);
router.post("/results/:id", productInfo);

module.exports = router;
