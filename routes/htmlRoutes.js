//var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/welcome");
    } else {
      res.redirect("/login/failed");
    }
    //res.render("login");
  });

  app.get("/login/failed", function(req, res) {
    res.render("login", {
      msg: "Invalid Username or Password. Please try again!"
    });
  });

  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/welcome");
    } else {
      res.redirect("/signup/failed");
    }
    //res.render("signup");
  });

  app.get("/signup/failed", function(req, res) {
    res.render("signup", {
      msg: "This username has been taken, please choose another"
    });
  });

  app.get("/welcome", isAuthenticated, function(req, res) {
    // console.log(req.user.userName);
    res.render("welcome", { user: req.user.userName });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
