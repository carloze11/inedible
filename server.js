const express = require("express");
const dotenv = require("dotenv");
const app = express();
const expressLayouts = require("express-layouts");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

//load config
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layout/layout");
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.static("public"));

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
