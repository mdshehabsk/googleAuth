require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cors = require("cors");
const connect = require("./db/connection");
const googleLogin = require("./router/googleLogin");
const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
require("./passport.js");
const sessionStore = MongoStore.create({
    mongoUrl:process.env.MONGO_URI,
    collectionName: "session",
  });
  app.use(
      session({
    secret: "shehab",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60,
    },
})
);
app.get("/", (req, res) => {
  res.send("home route");
});
app.use("/auth", googleLogin);

connect();

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
