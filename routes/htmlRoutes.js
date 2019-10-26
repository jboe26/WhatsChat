var db = require("../models");

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // Load example page and pass in an example by id
  app.get("/", function(req, res) {
    db.channels.findAll().then(function(results) {
      res.render("example", {
        example: results
      });
    });
  });

  app.get("/channels/:id", function(req, res) {
    db.channels
      .findOne({ include: [db.chats] }, { where: { id: req.params.id } })
      .then(function(results) {
        res.render("example", {
          example: results
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
