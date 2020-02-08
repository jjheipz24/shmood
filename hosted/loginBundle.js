"use strict";

//Handles login requests
//Sends back and shows error messages if field are incorrect
var handleLogin = function handleLogin(e) {
  e.preventDefault();

  $(".error").fadeOut(400);

  if ($("#user").val() == '') {
    showError("Username is required");
    return false;
  }

  if ($("#pass").val() == '') {
    showError("Password is required");
    return false;
  }

  sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

  return false;
};

//The form that handles login
//Accepts a username and password and gives the user the option to create an account
//Sends a post request on submit
var LoginForm = function LoginForm(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "form",
      { id: "loginForm", name: "loginForm", onSubmit: handleLogin, action: "/login", method: "POST", className: "mainForm" },
      React.createElement(
        "div",
        { className: "greeting" },
        React.createElement("img", { className: "icon", src: "./assets/img/largeLogo.png", alt: "logo for Shmood" }),
        React.createElement(
          "h1",
          null,
          "WELCOME"
        )
      ),
      React.createElement(
        "div",
        { className: "fields" },
        React.createElement(
          "div",
          { className: "form-group col-xs-4" },
          React.createElement("input", { className: "field", id: "user", type: "text", name: "username", placeholder: "Username" })
        ),
        React.createElement(
          "div",
          { className: "form-group col-xs-4" },
          React.createElement("input", { className: "field", id: "pass", type: "password", name: "pass", placeholder: "Password" })
        )
      ),
      React.createElement("input", { id: "loginCsrf", type: "hidden", name: "_csrf", value: props.csrf }),
      React.createElement(
        "button",
        { className: "btn btn-secondary rounded-pill", id: "loginButton", type: "submit" },
        "Sign In"
      ),
      React.createElement(
        "div",
        { className: "alert alert-danger error", role: "alert" },
        "Username or password is incorrect"
      ),
      React.createElement(
        "p",
        null,
        "Don't have an account? ",
        React.createElement(
          "a",
          { href: "./signup" },
          "Sign Up"
        )
      )
    )
  );
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(LoginForm, { csrf: csrf }), document.querySelector('#login'));
};

var getToken = function getToken() {
  sendGenericAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
