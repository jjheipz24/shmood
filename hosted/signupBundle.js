"use strict";

var handleSignup = function handleSignup(e) {
  e.preventDefault();

  $(".error").fadeOut(400);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    showError("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    showError("Passwords do not match");
    return false;
  }

  sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

  return false;
};

var SignupForm = function SignupForm(props) {
  return React.createElement(
    "form",
    { id: "signupForm", name: "signupForm", onSubmit: handleSignup, action: "/signup", method: "POST", className: "mainForm" },
    React.createElement(
      "div",
      { className: "greeting" },
      React.createElement("img", { className: "icon", src: "./assets/img/largeLogo.png", alt: "logo for Shmood" }),
      ">",
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
      ),
      React.createElement(
        "div",
        { className: "form-group col-xs-4" },
        React.createElement("input", { className: "field", id: "pass2", type: "password", name: "pass2", placeholder: "Retype password" })
      )
    ),
    React.createElement("input", { id: "signupCsrf", type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement(
      "button",
      { className: "btn btn-secondary rounded-pill", id: "signupButton", type: "submit" },
      "Sign Up"
    ),
    React.createElement(
      "div",
      { className: "alert alert-danger error", role: "alert" },
      "Passwords do not match"
    ),
    React.createElement(
      "p",
      null,
      "Already have an account? ",
      React.createElement(
        "a",
        { href: "./login" },
        "Login"
      )
    )
  );
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(SignupForm, { csrf: csrf }), document.querySelector('#signup'));
};

var getToken = function getToken() {
  sendGenericAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
