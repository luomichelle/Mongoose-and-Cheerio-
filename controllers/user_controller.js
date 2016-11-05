var express = require('express');
var router = express.Router();
var pwUtil = require('../helpers/password');

var User = require('../models').User;



router.get("/sign-up", function(req, res) {
    console.log("yoyoget1")
  res.render("users/sign_up");
});

router.post("/sign-up", function(req, res) {
  User.find({username: req.body.username}, function(err, users) {
    if(err) throw err;
    if(users.length > 0) throw new Error("We already have a user with that name");

    pwUtil.hash(req.body.password, function(err, hash) {
      if(err) throw err;
      var user = new User({
        username: req.body.username,
        password_hash: hash
      });

      user.save(function(err) {
        if(err) throw err;

        req.session.logged_in = true;
        // the username to the session
        req.session.username = user.username;

        res.redirect("/");
      });
    });
  });
});

router.get("/sign-in", function(req,res) {
	res.render("users/sign_in");
});

router.post("/sign-in", function(req, res) {
  User.find({username: req.body.username}, function(err, users) {
    if(err) throw err;
    if(users.length > 1) throw new Error("More than one user with the same name!");

    var user = users[0];
    user.validatePassword(req.body.password, function(err, success) {
      if(err) throw err;
      if(success) {
        req.session.logged_in = true;
        // the username to the session
        req.session.username = user.username;
      } else {
        req.session.logged_in = false;
      }
      res.redirect("/");
    });
  });
});

router.get("/sign-out", function(req,res) {
  req.session.destroy(function(err) {
     res.redirect("/")
  })
});

module.exports = router;
