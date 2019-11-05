var $signUp = $("#createuser");
var $logIn = $("#loginuser");
var $changeName = $("#changeName");

//signup API

$signUp.on("submit", function(event) {
  event.preventDefault();
  // It takes the input from user for username and password and pass it to POST function.
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
      // if the user already exist in database it will route to signup failed page else it will log in user.
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
  // It takes the input from user for username and password and pass it to POST function.
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
      // if the username or password is incorrect it will route to login failed page else it will log in user.
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

//this event will run after the user has typed a message and hit send button.
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

//this will display the message sent and the username who sent it
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

//It will run a counter whenever user logs in to check how many users are currently online.
socket.on("counter", function(data) {
  $("#counter").text(data.count);
});

//this will send a message in chat when someone joins the chat.
socket.on("user_join", function(data) {
  addMessage(data.bold() + " just joined the chat!");
});

//this will send a message in chat when someone leaves the chat.
socket.on("user_leave", function(data) {
  addMessage(data.bold() + " has left the chat.");
});

//this will send a message in chat when user joins the chat.
addMessage("You have joined the chat as " + username.bold() + ".");
socket.emit("user_join", username);

//This function is appending all the messages to the chat.
function addMessage(message) {
  var li = document.createElement("li");
  li.innerHTML = message;
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
}
