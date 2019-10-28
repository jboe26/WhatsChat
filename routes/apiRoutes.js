var db = require("../models");

module.exports = function(app) {
  //Get all users
  app.get("/api/user", function(req, res) {
    db.User.findAll().then(function(results) {
      res.json(results);
    });
  });

  app.post("/api/user1", function(req, res) {
    db.User.findOne({
      where: {
        userName: req.body.userName,
        password: req.body.password
      }
    }).then(function(results) {
      if (results) {
        console.log("Login successful");
      } else {
        console.log("Login unsuccessful");
      }
      res.json(results);
    });
  });

  //Create new user
  app.post("/api/user", function(req, res) {
    db.User.findOne({
      where: {
        userName: req.body.userName,
        email: req.body.email
      }
    }).then(function(results) {
      if (results) {
        console.log("User ID or Email already exist");
      } else {
        db.User.create({
          userName: req.body.userName,
          password: req.body.password,
          email: req.body.email
        })
          .then(function(result) {
            res.json(result);
          })
          .catch(function(err) {
            var errorMsg = err.errors[0];
            // eslint-disable-next-line no-unused-vars
            var CustomErr = {
              // eslint-disable-next-line camelcase
              error_description: errorMsg.message,
              // eslint-disable-next-line camelcase
              field_name: errorMsg.path
            };
            res.status(500).json(err);
          });
      }
    });
  });
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
