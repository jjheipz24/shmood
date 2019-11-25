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
    ReactDOM.render(React.createElement(Header, null), document.querySelector("#header"));

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

var Header = function Header(props) {
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
                    { id: "userTitle" },
                    React.createElement(
                        "a",
                        { href: "/" },
                        props.username
                    )
                ),
                React.createElement(
                    "p",
                    null,
                    "this is your personalized shmood page"
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
    return React.createElement(
        "div",
        { id: "sidebarInfo" },
        React.createElement(
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
                { "data-toggle": "modal", "data-target": "#imgUpload" },
                "upload"
            ),
            React.createElement(
                "button",
                { "data-toggle": "modal", "data-target": "#changePassword" },
                "change password"
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
        ),
        React.createElement(
            "div",
            { className: "modal fade", id: "imgUpload", tabIndex: "-1", role: "dialog" },
            React.createElement(
                "div",
                { className: "modal-dialog modal-dialog-centered", role: "document" },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "div",
                        { className: "modal-header" },
                        React.createElement(
                            "h5",
                            { className: "modal-title", id: "imgUploadTitle" },
                            "Image Upload"
                        ),
                        React.createElement(
                            "button",
                            { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                            React.createElement(
                                "span",
                                { "aria-hidden": "true" },
                                "\xD7"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-body" },
                        React.createElement(
                            "form",
                            { id: "imgUploadForm", name: "imgUploadForm", action: "/uploadImg", method: "POST",
                                className: "imgUploadForm", encType: "multipart/form-data" },
                            React.createElement(
                                "div",
                                { className: "fields" },
                                React.createElement("input", { type: "file", id: "userImg", name: "img", accept: "image/*" })
                            ),
                            React.createElement(
                                "div",
                                { className: "alert alert-danger error", role: "alert" },
                                "Passwords don't match"
                            ),
                            React.createElement(
                                "div",
                                { className: "modal-footer" },
                                React.createElement("input", { id: "imgCsrf", type: "hidden", name: "_csrf", value: props.token }),
                                React.createElement(
                                    "button",
                                    { className: "btn btn-secondary rounded-pill", id: "cancelButton",
                                        "data-dismiss": "modal" },
                                    "Cancel"
                                ),
                                React.createElement(
                                    "button",
                                    { className: "btn btn-secondary rounded-pill", id: "uploadButton",
                                        type: "submit" },
                                    "Upload"
                                )
                            )
                        )
                    )
                )
            )
        ),
        React.createElement(
            "div",
            { className: "modal fade", id: "changePassword", tabIndex: "-1", role: "dialog",
                "aria-labelledby": "changePasswordTitle", "aria-hidden": "true" },
            React.createElement(
                "div",
                { className: "modal-dialog modal-dialog-centered", role: "document" },
                React.createElement(
                    "div",
                    { className: "modal-content" },
                    React.createElement(
                        "div",
                        { className: "modal-header" },
                        React.createElement(
                            "h5",
                            { className: "modal-title", id: "changePasswordTitle" },
                            "Change Password"
                        ),
                        React.createElement(
                            "button",
                            { type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                            React.createElement(
                                "span",
                                { "aria-hidden": "true" },
                                "\xD7"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "modal-body" },
                        React.createElement(
                            "form",
                            { id: "changePasswordForm", name: "changePasswordForm", action: "/changePassword",
                                method: "POST", className: "changePasswordForm" },
                            React.createElement(
                                "div",
                                { className: "fields" },
                                React.createElement(
                                    "div",
                                    { className: "form-group col-xs-4" },
                                    React.createElement("input", { className: "field", id: "currentPass", type: "text", name: "currentPass",
                                        placeholder: "Current password" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group col-xs-4" },
                                    React.createElement("input", { className: "field", id: "newPass", type: "password", name: "newPass",
                                        placeholder: "New password" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group col-xs-4" },
                                    React.createElement("input", { className: "field", id: "pass2", type: "password", name: "pass2",
                                        placeholder: "Retype password" })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "alert alert-danger error", role: "alert" },
                                "Passwords do not match"
                            ),
                            React.createElement(
                                "div",
                                { className: "modal-footer" },
                                React.createElement("input", { id: "signupCsrf", type: "hidden", name: "_csrf", value: props.token }),
                                React.createElement(
                                    "button",
                                    { className: "btn btn-secondary rounded-pill", id: "cancelButton",
                                        "data-dismiss": "modal" },
                                    "Cancel"
                                ),
                                React.createElement(
                                    "button",
                                    { className: "btn btn-secondary rounded-pill", id: "changePasswordButton",
                                        type: "submit" },
                                    "Change Password"
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

var loadImages = function loadImages() {
    sendGenericAjax('GET', '/getUserImg', null, function (data) {
        ReactDOM.render(React.createElement(ImageGrid, { imgs: data.imgs }), document.querySelector("#gridU"));
    });
};

var loadUsername = function loadUsername() {
    debugger;
    sendGenericAjax('GET', '/getUsername', null, function (data) {
        ReactDOM.render(React.createElement(Header, { username: data.username }), document.querySelector("#headerU"), React.createElement(SideBar, { username: data.username }), document.querySelector("#sidebarU"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(Header, { username: "" }), document.querySelector("#headerU"));

    ReactDOM.render(React.createElement(ImageGrid, { imgs: [] }), document.querySelector("#gridU"));

    ReactDOM.render(React.createElement(SideBar, { username: "", token: csrf }), document.querySelector("#sidebarU"));

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
//   const handleLogin = (e) => {
//     e.preventDefault();

//     $(".error").fadeOut(400);

//     if ($("#user").val() == '') {
//       showError("Username is required");
//       return false;
//     }

//     if ($("#pass").val() == '') {
//       showError("Password is required");
//       return false;
//     }

//     sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

//     return false;
//   }

//   const LoginForm = (props) => {
//     return (
//       <form id="loginForm" name="loginForm" onSubmit={handleLogin} action="/login" method="POST" className="mainForm">
//         <div className="greeting">
//           <img className="icon" src="./assets/img/largeLogo.png" alt="logo for Shmood" />
//           <h1>WELCOME</h1>
//         </div>

//         <div className="fields">
//           <div className="form-group col-xs-4">
//             <input className="field" id="user" type="text" name="username" placeholder="Username" />
//           </div>
//           <div className="form-group col-xs-4">
//             <input className="field" id="pass" type="password" name="pass" placeholder="Password" />
//           </div>
//         </div>
//         <input id="loginCsrf" type="hidden" name="_csrf" value={props.csrf} />
//         <button className="btn btn-secondary rounded-pill" id="loginButton" type="submit">Sign In</button>

//         <div className="alert alert-danger error" role="alert">
//           Username or password is incorrect
//         </div>
//         <p>Don't have an account? <a href="./signup">Sign Up</a></p>
//     </form>
//     );
//   };

//   const setup = function(csrf){
//     ReactDOM.render(
//       <LoginForm csrf={csrf} />, document.querySelector('#login')
//     );
//   };

//   const getToken = () => {
//     sendGenericAjax('GET', '/getToken', null, (result) => {
//         setup(result.csrfToken);
//     });
// };
"use strict";
// const handleSignup = (e) => {
//     e.preventDefault();

//     $(".error").fadeOut(400);

//     if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
//       showError("All fields are required");
//       return false;
//     }

//     if ($("#pass").val() !== $("#pass2").val()) {
//       showError("Passwords do not match");
//       return false;
//     }

//     sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

//     return false;

//   };

//   const SignupForm = (props) => {
//       return (
//         <form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST" className="mainForm">
//           <div className="greeting">
//             <img className="icon" src="./assets/img/largeLogo.png" alt="logo for Shmood" />>
//             <h1>WELCOME</h1>
//           </div>

//           <div className="fields">
//             <div className="form-group col-xs-4">
//               <input className="field" id="user" type="text" name="username" placeholder="Username" />
//             </div>
//             <div className="form-group col-xs-4">
//               <input className="field" id="pass" type="password" name="pass" placeholder="Password" />
//             </div>
//             <div className="form-group col-xs-4">
//               <input className="field" id="pass2" type="password" name="pass2" placeholder="Retype password" />
//             </div>
//           </div>
//           <input id="signupCsrf" type="hidden" name="_csrf" value={props.csrf} />
//           <button className="btn btn-secondary rounded-pill" id="signupButton" type="submit">Sign Up</button>

//           <div className="alert alert-danger error" role="alert">
//             Passwords do not match
//           </div>

//           <p>Already have an account? <a href="./login">Login</a></p>
//       </form>
//       );
//   };

//   const setup = function(csrf){
//     ReactDOM.render(
//       <SignupForm csrf={csrf} />, document.querySelector('#signup')
//     );
//   };

//   const getToken = () => {
//     sendGenericAjax('GET', '/getToken', null, (result) => {
//         setup(result.csrfToken);
//     });
// };
"use strict";
