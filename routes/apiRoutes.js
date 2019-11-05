var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  //this post request is using authentication process for user login.
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
  // Route for logging user out.
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  //Route for main page of website.
  app.get("/", function(req, res) {
    res.render("login");
  });

  //Route for signup page.
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
  //route for changing the username
  app.put("/api/signup", function(req, res) {
    console.log("request: " + req);
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.User.update(
      {
        userName: req.body.newName
      },
      {
        where: {
          userName: req.body.userName
        }
      }
    ).then(function() {
      res.render("welcome", { user: req.user.userName });
    });
  });
};
