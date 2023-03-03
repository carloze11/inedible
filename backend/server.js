const express = require("express");
const morgan = require("morgan");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const keys = require("./config/keys");

// environment variables
const PORT = process.env.PORT || 4000;
const DB = keys.mongoURI;

// MIDDLEWARE
//passport config
require("./middleware/passport")(passport);

// Log HTTP requests and errors
app.use(morgan("dev"));

app.use(methodOverride("_method"));
app.use(express.static("public"));

//body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Sessions;
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: DB }),
    })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// // method override
// app.use(
//     methodOverride(function (req, res) {
//         if (req.body && typeof req.body === "object" && "_method" in req.body) {
//             // look in urlencoded POST bodies and delete it
//             let method = req.body._method;
//             delete req.body._method;
//             return method;
//         }
//     })
// );

//Routes
// const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
// const foodsRouter = require("./routes/foods");
// const productsRouter = require("./routes/products");
// const recipesRouter = require("./routes/recipes");

// app.use("/", indexRouter);
// app.use("/auth", authRouter);
// app.use("/foods", foodsRouter);
// app.use("/products", productsRouter);
// app.use("/recipes", recipesRouter);

app.use("/", (req, res) => {
    res.send({ hi: "Hello Cold, Dark World!" });
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
