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

//load config
dotenv.config({ path: "./config/config.env" });

//passport config
require("./config/passport")(passport);

connectDB();
const PORT = process.env.PORT || 5000;
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layout/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));

// Sessions
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require("./routes/index");

app.use("/", indexRouter);
app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
