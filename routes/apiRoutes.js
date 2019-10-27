var db = require("../models");

module.exports = function(app) {
  // Get all channels
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });

  app.get("/api/channels", function(req, res) {
    db.channels.findAll({}).then(function(dbChannels) {
      res.json(dbChannels);
    });
  });

  //Get all posts in the channel
  app.get("/api/channels/:id", function(req, res) {
    // 2; Add a join to include all of the Author's Posts here
    db.channels
      .findOne(
        { include: [db.chats] },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(results) {
        res.json(results);
      });
  });

  // Create a new channel
  app.post("/api/channels", function(req, res) {
    db.Example.create(req.body).then(function(dbChannels) {
      res.json(dbChannels);
    });
  });

  // Create a new post
  app.post("/api/chats", function(req, res) {
    db.Example.create(req.body).then(function(dbChannels) {
      res.json(dbChannels);
    });
  });

  // Delete a channel by id
  app.delete("/api/channels/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbChannels
    ) {
      res.json(dbChannels);
    });
  });
};
