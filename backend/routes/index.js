const express = require("express");
const router = express.Router();
const homePageController = require("../controllers/homePage");
const authController = require("../controllers/auth");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureGuest, homePageController.getHomePage);
router.get("/dashboard", ensureAuth, homePageController.getDashboard);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.getLogout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
