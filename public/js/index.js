var $signUp = $("#createuser");
var $logIn = $("#loginuser");
var $changeName = $("#changeName");

//signup API

$signUp.on("submit", function(event) {
  event.preventDefault();

  var newUser = {
    userName: $("#createuser [name=name]")
      .val()
      .trim()
      .toUpperCase(),
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

//changes username
$changeName.on("submit", function(event) {
  event.preventDefault();
  var User = {
    userName: $("#changeName [name = name]")
      .val()
      .trim()
      .toUpperCase(),
    newName: $("#changeName [name = newName]")
      .val()
      .trim()
      .toUpperCase()
  };
  $.ajax({
    method: "PUT",
    url: "/api/signup",
    data: User
  }).then((window.location.href = "/"));
});

//{{!-- auto logout after 15 minutes (900000 seconds) --}}
function idleTimer() {
  var t;
  window.onmousemove = resetTimer;
  window.onclick = resetTimer;
  window.onscroll = resetTimer;
  window.onkeypress = resetTimer;

  function logout() {
    window.location.href = "/logout";
  }

  function resetTimer() {
    clearTimeout(t);
    t = setTimeout(logout, 900000);
  }
}
idleTimer();

// avoiding the < and > sign
document.getElementById("winput").onkeypress = function(e) {
  var chr = String.fromCharCode(e.which);
  if ("><".indexOf(chr) >= 0) {
    return false;
  }
};

// Code for socket IO to make chat app live.

var form = document.querySelector("form");
var input = document.querySelector(".input");
var messages = document.querySelector(".messages");
var message = document.getElementById("winput");
var username = $("#user").text();
var typing = document.getElementById("typing");
var socket = io();

form.addEventListener(
  "submit",
  function(event) {
    event.preventDefault();

    addMessage(username.bold() + ": " + input.value);

    socket.emit("chat_message", {
      message: input.value
    });

    input.value = "";
    return false;
  },
  false
);

socket.on("chat_message", function(data) {
  addMessage(data.username.bold() + ": " + data.message);
  typing.innerHTML = "";
});

// emit a “typing” event when we start typing
message.addEventListener("keypress", function() {
  socket.emit("typing", username);
});

// when we receive a typing event, show that a user is typing
socket.on("typing", function(data) {
  console.log("this is typing");
  typing.innerHTML = "<em>" + data + " is typing</em>";
});

socket.on("counter", function(data) {
  $("#counter").text(data.count);
});

socket.on("user_join", function(data) {
  addMessage(data.bold() + " just joined the chat!");
});

socket.on("user_leave", function(data) {
  addMessage(data.bold() + " has left the chat.");
});

addMessage("You have joined the chat as " + username.bold() + ".");
socket.emit("user_join", username);

function addMessage(message) {
  var li = document.createElement("li");
  li.innerHTML = message;
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}
