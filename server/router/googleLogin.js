const router = require("express").Router();
const passport = require("passport");
const isAuth = require("../checkAuth");

router.get('/nice',isAuth, (req, res) => {
    res.send('nice')
    console.dir(req.user)
})

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile","email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  function (req, res) {
    req.session.isAuth = true;
    res.redirect("http://localhost:3000/");
  }
);

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json('logout successfull')
    })
})

module.exports = router;
