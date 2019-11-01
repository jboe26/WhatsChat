var $signUp = $("#createuser");
var $logIn = $("#loginuser");

//signup API

$signUp.on("submit", function(event) {
  event.preventDefault();

  var newUser = {
    userName: $("#createuser [name=name]")
      .val()
      .trim(),
    password: $("#createuser [name=psw]")
      .val()
      .trim()
  };

  $.ajax("/api/signup", {
    type: "POST",
    data: newUser
  })
    .then(function(results) {
      // alert(results);
      if (results === "found") {
        window.location.href = "/signup/failed";
      } else {
        window.location.href = "/welcome";
      }
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
});

//login API

$logIn.on("submit", function(event) {
  event.preventDefault();
  var User = {
    userName: $("#loginuser [name=name]")
      .val()
      .trim(),
    password: $("#loginuser [name=psw]")
      .val()
      .trim()
  };
  $.ajax("/api/login", {
    type: "POST",
    data: User
  })
    .then(function(results) {
      if (results) {
        window.location.href = "/welcome";
      } else {
        window.location.href = "/login/failed";
      }
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
});
