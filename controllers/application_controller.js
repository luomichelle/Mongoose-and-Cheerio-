var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
  var ctx = {
    logged_in: req.session.logged_in
  };
  if(ctx.logged_in) {
    ctx.username = req.session.username;
  }
  res.render("index", ctx);
});

module.exports = router;
