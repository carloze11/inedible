const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// environment variables
require("dotenv").config();
const PORT = process.env.PORT;
const DB = process.env.MONGO_URI;

// MIDDLEWARE
//passport config
require("./middleware/passport")(passport);

// Log HTTP requests and errors
app.use(morgan("dev"));

// Enable CORS
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET, PUT, POST, DELETE",
        credentials: true,
    })
);

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
// const indexRouter = require("./routes/index");
// const authRouter = require("./routes/auth");
// const foodsRouter = require("./routes/foods");
// const productsRouter = require("./routes/products");
// const recipesRouter = require("./routes/recipes");

// app.use("/", indexRouter);
// app.use("/auth", authRouter);
// app.use("/foods", foodsRouter);
// app.use("/products", productsRouter);
// app.use("/recipes", recipesRouter);

app.use("/", (req, res) => {
    res.json("Hello Cold, Dark World!");
});

// connect to db
mongoose
    .set("strictQuery", false)
    .connect(DB)
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                `Server is listening on port ${PORT} and connected to the database.`
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });
