const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/database");
const app = express();
const expressLayouts = require("express-layouts");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// const ejsLint = require("ejs-lint");

//load config
dotenv.config({ path: "./config/config.env" });

//passport config
require("./config/passport")(passport);

connectDB();
const PORT = process.env.PORT || 5000;
app.use(morgan("dev"));

// Helper functions
const { truncate, removeTags } = require("./helpers/helper");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layout/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));
//body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const foodsRouter = require("./routes/foods");

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/foods", foodsRouter);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
