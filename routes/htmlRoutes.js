//var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  //this will route the user to welcome page on successful login else route to login failed page.
  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/welcome");
    } else {
      res.redirect("/login/failed");
    }
    //res.render("login");
  });

  //this is a route for login failed page with the message
  app.get("/login/failed", function(req, res) {
    res.render("login", {
      msg: "Invalid Username or Password. Please try again!"
    });
  });

  //this will route the user to welcome page on successful signup else route to signup failed page.
  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/welcome");
    } else {
      res.redirect("/signup/failed");
    }
    //res.render("signup");
  });

  //this is a route for login failed page with the message.
  app.get("/signup/failed", function(req, res) {
    res.render("signup", { msg: "User already exists. Please try again!" });
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
