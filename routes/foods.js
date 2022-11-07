const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Food = require("../models/Food");

router.get("/add", ensureAuth, (req, res) => {
    res.render("foods/add");
});

module.exports = router;
