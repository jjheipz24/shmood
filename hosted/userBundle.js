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

var handlePChange = function handlePChange(e) {
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

var Header = function Header(props) {
    return React.createElement(
        "div",
        { className: "row justify-content-center" },
        React.createElement(
            "div",
            { className: "col-9" },
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
                                className: "imgUploadForm", encType: "multipart/form-data", onSubmit: handleImg },
                            React.createElement(
                                "p",
                                { id: "explain" },
                                "Use shift or ctrl to select multiple files to upload"
                            ),
                            React.createElement(
                                "div",
                                { className: "fields" },
                                React.createElement("input", { type: "file", id: "userImg", name: "img", accept: "image/*", multiple: true })
                            ),
                            React.createElement(
                                "div",
                                { className: "alert alert-success success", role: "alert" },
                                "Upload successful!"
                            ),
                            React.createElement(
                                "div",
                                { className: "alert alert-danger error", role: "alert" },
                                "No image"
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
                                method: "POST", className: "changePasswordForm", onSubmit: handlePChange },
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

var loadSidebar = function loadSidebar() {
    debugger;
    sendGenericAjax('GET', '/getUsername', null, function (data) {
        ReactDOM.render(React.createElement(SideBar, { username: data.username }), document.querySelector("#sidebarU"));
    });
};

var loadHeader = function loadHeader() {
    debugger;
    sendGenericAjax('GET', '/getUsername', null, function (data) {
        ReactDOM.render(React.createElement(Header, { username: data.username }), document.querySelector("#headerU"));
    });
};

var setup = function setup(csrf) {
    ReactDOM.render(React.createElement(Header, { username: "" }), document.querySelector("#headerU"));

    ReactDOM.render(React.createElement(ImageGrid, { imgs: [] }), document.querySelector("#gridU"));

    ReactDOM.render(React.createElement(SideBar, { username: "", token: csrf }), document.querySelector("#sidebarU"));

    loadImages();
    loadSidebar();
    loadHeader();
};

var getToken = function getToken() {
    sendGenericAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
