const express = require("express");
const router = express.Router();
const homePageController = require("../controllers/homePage");
const authController = require("../controllers/auth");

router.get("/", homePageController.getHomePage);
router.get("/dashboard", homePageController.getDashboard);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.getLogout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
