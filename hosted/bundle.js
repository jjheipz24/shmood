"use strict";

//handles all error messages
var showError = function showError(message) {
  $(".error").text(message);
  $(".error").fadeIn(400);
};

//handles requests
var sendAjax = function sendAjax(action, data) {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: function success(result, status, xhr) {
      $(".error").fadeOut(400);

      window.location = result.redirect;
    },
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);

      showError(messageObj.error);
    }
  });
};

var fileUpload = function fileUpload(action, data) {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    processData: false,
    contentType: false,
    success: function success(result, status, xhr) {
      $(".error").fadeOut(400);

      window.location = result.redirect;
    },
    error: function error(xhr, status, _error2) {
      var messageObj = JSON.parse(xhr.responseText);

      showError(messageObj.error);
    }
  });
};

$(document).ready(function () {
  //handles requests on the signup form after submit clicked
  //shows error messages depending on the error
  $("#signupForm").on("submit", function (e) {
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
  });

  //handles requests on the login form after submit clicked
  //shows error messages depending on the error
  $("#loginForm").on("submit", function (e) {
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
  });

  //handles requests on the change password form after submit clicked
  //shows error messages depending on the error
  $("#changePasswordForm").on("submit", function (e) {
    e.preventDefault();

    $(".error").fadeOut(400);

    if ($("#currentPass").val() == '' || $("#newPass").val() == '' || $("#pass2").val() == '') {
      showError("All fields are required");
      return false;
    }

    if ($("#newPass").val() !== $("#pass2").val()) {
      showError("Passwords do not match");
      return false;
    }

    sendAjax($("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize());

    return false;
  });

  //handles requests on the image upload form after submit clicked
  //shows error messages depending on the error
  $("#imgUploadForm").on("submit", function (e) {
    e.preventDefault();

    $(".error").fadeOut(400);

    if ($("#userImg").val() == '') {
      showError("Please select an image");
      return false;
    }

    fileUpload($("#imgUploadForm").attr("action"), new FormData($("#imgUploadForm")[0]));

    return false;
  });
});
"use strict";

//handles requests on the image upload form after submit clicked
//shows error messages depending on the error
var handleImg = function handleImg(e) {
    e.preventDefault();

    $(".error").fadeOut(400);

    if ($("#userImg").val() == '') {
        showError("Please select an image");
        return false;
    }

    fileUpload($("#imgUploadForm").attr("action"), new FormData($("#imgUploadForm")[0]));

    return false;
};

var Header = function Header() {
    return React.createElement(
        "div",
        { className: "row justify-content-center" },
        React.createElement(
            "div",
            { className: "col-10" },
            React.createElement(
                "header",
                null,
                React.createElement(
                    "h1",
                    { id: "title" },
                    React.createElement(
                        "a",
                        { href: "/" },
                        "SHMOOD"
                    )
                ),
                React.createElement(
                    "p",
                    null,
                    "create your own personalized mood board"
                )
            )
        ),
        React.createElement("div", { className: "col-1" })
    );
};

var ImageGrid = function ImageGrid(props) {
    console.dir(props.imgs);
    if (props.imgs.length === 0) {
        return React.createElement(
            "div",
            { className: "col-10", id: "grid" },
            React.createElement(
                "h2",
                { id: "noImg" },
                "No images have been uploaded"
            )
        );
    }

    var col1 = props.imgs[0].map(function (img) {
        return React.createElement("img", { src: img, className: "img-fluid mb-4" });
    });

    var col2 = props.imgs[1].map(function (img) {
        return React.createElement("img", { src: img, className: "img-fluid mb-4" });
    });

    var col3 = props.imgs[2].map(function (img) {
        return React.createElement("img", { src: img, className: "img-fluid mb-4" });
    });

    return React.createElement(
        "div",
        { className: "col-10", id: "grid" },
        React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "div",
                { className: "col" },
                col1
            ),
            React.createElement(
                "div",
                { className: "col" },
                col2
            ),
            React.createElement(
                "div",
                { className: "col" },
                col3
            )
        )
    );
};

var SideBar = function SideBar(props) {
    if (props.username === "" || !props.username) {
        return React.createElement(
            "div",
            { className: "position-fixed btn-group-vertical" },
            React.createElement(
                "button",
                null,
                React.createElement(
                    "a",
                    { href: "/signup" },
                    "signup"
                )
            ),
            React.createElement(
                "button",
                null,
                React.createElement(
                    "a",
                    { href: "/login" },
                    "login"
                )
            )
        );
    }

    return React.createElement(
        "div",
        { className: "position-fixed btn-group-vertical" },
        React.createElement(
            "button",
            null,
            React.createElement(
                "a",
                { href: "/userPage" },
                props.username
            )
        ),
        React.createElement(
            "button",
            null,
            React.createElement(
                "a",
                { href: "/logout" },
                "logout"
            )
        )
    );
};

var loadImages = function loadImages() {
    sendGenericAjax('GET', '/getHomeImg', null, function (data) {
        ReactDOM.render(React.createElement(ImageGrid, { imgs: data.imgs }), document.querySelector("#grid"));
    });
};

var loadUsername = function loadUsername() {
    debugger;
    sendGenericAjax('GET', '/getUsername', null, function (data) {
        debugger;
        ReactDOM.render(React.createElement(SideBar, { username: data.username }), document.querySelector("#sidebar"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(Header, { csrf: csrf }), document.querySelector("#header"));

    ReactDOM.render(React.createElement(ImageGrid, { imgs: [] }), document.querySelector("#grid"));

    ReactDOM.render(React.createElement(SideBar, { username: "" }), document.querySelector("#sidebar"));

    loadImages();
    loadUsername();
};

var getToken = function getToken() {
    sendGenericAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";
"use strict";

//handles all error messages
var showError = function showError(message) {
  $(".error").text(message);
  $(".error").fadeIn(400);
};

//handles requests
var sendAjax = function sendAjax(action, data) {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: function success(result, status, xhr) {
      $(".error").fadeOut(400);

      window.location = result.redirect;
    },
    error: function error(xhr, status, _error) {
      console.log(xhr.responseText);
      var messageObj = JSON.parse(xhr.responseText);
      showError(messageObj.error);
    }
  });
};

var sendGenericAjax = function sendGenericAjax(method, action, data, callback) {
  $.ajax({
    cache: false,
    type: method,
    url: action,
    data: data,
    dataType: "json",
    success: callback,
    error: function error(xhr, status, _error2) {
      console.log(xhr.responseText);
      var messageObj = JSON.parse(xhr.responseText);

      showError(messageObj.error);
    }
  });
};

var fileUpload = function fileUpload(action, data) {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    processData: false,
    contentType: false,
    success: function success(result, status, xhr) {
      $(".error").fadeOut(400);

      window.location = result.redirect;
    },
    error: function error(xhr, status, _error3) {
      var messageObj = JSON.parse(xhr.responseText);

      showError(messageObj.error);
    }
  });
};
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

var handleChangePassword = function handleChangePassword(e) {
    e.preventDefault();

    $(".error").fadeOut(400);

    if ($("#currentPass").val() == '' || $("#newPass").val() == '' || $("#pass2").val() == '') {
        showError("All fields are required");
        return false;
    }

    if ($("#newPass").val() !== $("#pass2").val()) {
        showError("Passwords do not match");
        return false;
    }

    sendAjax($("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize());

    return false;
};
