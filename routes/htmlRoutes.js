var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll().then(function() {
      res.render("index");
    });
  });

  app.get("/login", function(req, res) {
    db.User.findAll({}).then(function() {
      res.render("login");
    });
  });

  app.get("/login/failed", function(req, res) {
    db.User.findAll({}).then(function() {
      res.render("login", {
        msg: "Invalid Username or Password. Please try again!"
      });
    });
  });

  app.get("/signup", function(req, res) {
    db.User.findAll({}).then(function() {
      res.render("signup");
    });
  });

  app.get("/signup/failed", function(req, res) {
    res.render("signup", { msg: "User already exists. Please try again!" });
  });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.render("examples", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
