var db = require("../models");

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.User.findAll().then(function() {
  //     res.render("index");
  //   });
  // });

  app.get("/", function(req, res) {
    res.render("login");
  });

  app.get("/login/failed", function(req, res) {
    res.render("login", {
      msg: "Invalid Username or Password. Please try again!"
    });
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/signup/failed", function(req, res) {
    res.render("signup", { msg: "User already exists. Please try again!" });
  });

  app.get("/welcome/:key", function(req, res) {
    db.User.findOne({
      where: {
        key: req.params.key
      }
    }).then(function(results) {
      db.Message.findAll({}).then(function(results1) {
        res.render("welcome", { user: results.userName, msg: results1 });
      });
    });
  });

  app.get("/channel1", function(req, res) {
    res.render("channel");
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
