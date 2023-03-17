const express = require("express");
const router = express.Router();
const homePageController = require("../controllers/homePage");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", homePageController.getHomePage);

router.get("/dashboard", ensureAuth, homePageController.getDashboard);

module.exports = router;
