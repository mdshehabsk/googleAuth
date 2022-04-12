const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./db/userScheam');



passport.serializeUser(function (user, done) {
    // console.log(`serailize ${user} `);
    done(null, user.id);
  });
  
  passport.deserializeUser(function (id, done) {
    User.findById(id).then((userFind) => {
      done(null, userFind);
    });
    // console.log(`deserialize  ${id} `);
  });


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id }).then((currentUser) => {
        // console.log(profile)
        if (currentUser) {
          done(null, currentUser);
        } else {
          new User({
              googleId: profile.id,
              name: profile.displayName,
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            })
            .catch((err) => console.log(err));
        }
        });
  }
));