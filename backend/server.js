const express = require("express");
const cors = require("cors");
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
const fetch = require("node-fetch");
const EventEmitter = require("events");
const myEmiiter = new EventEmitter();
// const ejsLint = require("ejs-lint");

//load config
dotenv.config({ path: "./config/config.env" });

//passport config
require("./config/passport")(passport);

connectDB();
const PORT = process.env.PORT || 5000;
app.use(morgan("dev"));

// Enable CORS
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET, PUT, POST, DELETE",
        credentials: true,
    })
);

// Switching from ejs to jsx
app.set("view engine", "jsx");
// This tells express how to handle jsx :o
app.engine("jsx", require("express-react-views").createEngine());

app.set("views", __dirname + "/views");
// app.set("layout", "layout/layout");
// app.use(expressLayouts);
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

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// method override
app.use(
    methodOverride(function (req, res) {
        if (req.body && typeof req.body === "object" && "_method" in req.body) {
            // look in urlencoded POST bodies and delete it
            let method = req.body._method;
            delete req.body._method;
            return method;
        }
    })
);

//Routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const foodsRouter = require("./routes/foods");
const productsRouter = require("./routes/products");
const recipesRouter = require("./routes/recipes");

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/foods", foodsRouter);
app.use("/products", productsRouter);
// app.use("/recipes", recipesRouter);

app.get("/message", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});
