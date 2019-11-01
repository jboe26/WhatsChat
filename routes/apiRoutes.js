var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  app.post(
    "/api/login",
    passport.authenticate("local", {
      successRedirect: "/welcome",
      failureRedirect: "/login/failed"
    }),
    function(req, res) {
      res.json(req.user);
    }
  );

  //Create new user
  app.post("/api/signup", function(req, res) {
    db.User.findOne({
      where: {
        userName: req.body.userName
      }
    }).then(function(results) {
      if (results) {
        //  console.log("User ID or Email already exist");
        res.send("found");
      } else {
        db.User.create({
          userName: req.body.userName,
          password: req.body.password
        })
          .then(function() {
            res.redirect(307, "/api/login");
          })
          .catch(function(err) {
            res.status(401).json(err);
          });
      }
    });
  });
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/", function(req, res) {
    res.render("login");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's userName and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        userName: req.user.userName,
        id: req.user.id
      });
    }
  });
  // app.post("/api/typer/:key", function(req, res) {
  //   db.User.findOne({
  //     where: {
  //       key: req.params.key
  //     }
  //   }).then(function(results) {
  //     db.Message.create({
  //       user: results.userName,
  //       message: req.body.message
  //     }).then(function(results) {
  //       res.send(results.user);
  //     });
  //   });
  // });

  // app.post("/api/login", function(req, res) {
  //   db.User.findOne({
  //     where: {
  //       userName: req.body.userName,
  //       password: req.body.password
  //     }
  //   }).then(function(results) {
  //     if (results) {
  //       //console.log(results.createdAt);
  //       res.send(results.key.toString());
  //     } else {
  //       res.send(false);
  //     }
  //   });
  // });

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
