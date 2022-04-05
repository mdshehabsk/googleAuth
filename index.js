require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require('./checkAuth')
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const cookieSession = require("cookie-session");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require('cookie-parser')
const User = require("./userSchema");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json());
// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: ["mdshehabsk"],
//   })
// );
app.use(
  session({
    secret: "shehab",
    resave:false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
mongoose
  .connect("mongodb://localhost:27017/google")
  .then(() => console.log(`db running successfull`))
  .catch((err) => console.log(err));

passport.serializeUser(function (user, cb) {
  // console.log(`serailize ${user} `);
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id).then((userFind) => {
    cb(null, userFind);
  });
  // console.log(`deserialize  ${id} `);
});
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:4000/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((currentUser) => {
          // console.log(profile)
          if (currentUser) {
            done(null, currentUser);
          } else {
            new User({
              username: profile.displayName,
              googleId: profile.id,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              })
              .catch((err) => console.log(err));
          }
        });
      }
    )
  );

app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
app.use(morgan("dev"));

app.get("/",checkAuth, (req, res) => {
  res.render("index");
  // res.send(req.user)
});
app.get("/register", (req, res) => {

  res.render("register",{username:'shehab'});
});
// find the lowest number of an array

app.get('/logout', (req, res) => {
  req.logout()  
  res.redirect('/')
})


app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),

  (req, res) => {
    res.redirect("/");
  }
);

app.get('/about',checkAuth,(req,res)=>{
  res.send('nice')
})
//tesla car price api call




const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("server running successfull");
});
