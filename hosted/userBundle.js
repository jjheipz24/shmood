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

    //post the image upload form
    fileUpload($("#imgUploadForm").attr("action"), new FormData($("#imgUploadForm")[0]));

    return false;
};

//Handles requests on the password change form when change password is clicked
//shows error message if there is an erroe and validates passwords
var handlePChange = function handlePChange(e) {
    e.preventDefault();

    $(".error").fadeOut(400);

    //check if everything is filled in
    if ($("#currentPass").val() == '' || $("#newPass").val() == '' || $("#pass2").val() == '') {
        showError("All fields are required");
        return false;
    }

    //check the new passwords are the same
    if ($("#newPass").val() !== $("#pass2").val()) {
        showError("Passwords do not match");
        return false;
    }

    //post the password change form
    sendAjax($("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize());

    return false;
};

//send the form that deletes all images from a user's account
var handleDelete = function handleDelete(e) {
    e.preventDefault();

    console.log($("#deleteForm").serialize());
    clearBoard('DELETE', $('#deleteForm').attr("action"), $("#deleteForm").serialize(), function (result) {
        window.location = result.redirect;
        loadImages($("#deleteCsrf").val());
    });

    return false;
};

//JSX for the header of the page, displays the user's name
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

//JSX that renders the image grid, takes in the images gotten from below
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

    //use map to create three columns from the three arrays given
    //pass each img into the img tag
    var col1 = props.imgs[0].map(function (img) {
        return React.createElement("img", { src: img, className: "img-fluid mb-4" });
    });

    var col2 = props.imgs[1].map(function (img) {
        return React.createElement("img", { src: img, className: "img-fluid mb-4" });
    });

    var col3 = props.imgs[2].map(function (img) {
        return React.createElement("img", { src: img, className: "img-fluid mb-4" });
    });

    //return the row and cols put inside the grid div
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

/* render the sidebar and it's modals 
The modals are for image upload, change password, and clear board*/
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
                { "data-toggle": "modal", "data-target": "#clear" },
                "clear board"
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
        ),
        React.createElement(
            "div",
            { className: "modal fade", id: "clear", tabIndex: "-1", role: "dialog" },
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
                            { className: "modal-title", id: "deleteFormTitle" },
                            "Are you sure?"
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
                            { id: "deleteForm", name: "deleteForm", action: "/clear", method: "DELETE",
                                className: "deleteForm", onSubmit: handleDelete },
                            React.createElement(
                                "p",
                                { id: "deleteText" },
                                "This cannot be undone"
                            ),
                            React.createElement(
                                "div",
                                { className: "alert alert-danger error", role: "alert" },
                                "An error has occured"
                            ),
                            React.createElement(
                                "div",
                                { className: "modal-footer" },
                                React.createElement("input", { id: "deleteCsrf", type: "hidden", name: "_csrf", value: props.token }),
                                React.createElement(
                                    "button",
                                    { className: "btn btn-secondary rounded-pill", id: "cancelButton",
                                        "data-dismiss": "modal" },
                                    "Cancel"
                                ),
                                React.createElement(
                                    "button",
                                    { className: "btn btn-secondary rounded-pill", id: "clearButton",
                                        type: "submit" },
                                    "Clear"
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

/*Make a GET request to get the images for that specific user from the image controller
These images are then passed into ImageGrid which is rendered in the #gridU div on
the actual user page*/
var loadImages = function loadImages() {
    sendGenericAjax('GET', '/getUserImg', null, function (data) {
        ReactDOM.render(React.createElement(ImageGrid, { imgs: data.imgs }), document.querySelector("#gridU"));
    });
};

/*Make a GET request to get the current user's name from the image controller
These images are then passed into SideBar which is rendered in the #sidebarU div on
the actual user page*/
var loadSidebar = function loadSidebar() {
    sendGenericAjax('GET', '/getUsername', null, function (data) {
        ReactDOM.render(React.createElement(SideBar, { username: data.username }), document.querySelector("#sidebarU"));
    });
};

/*Make a GET request to get the current user's name from the image controller
These images are then passed into Header which is rendered in the #headerU div on
the actual user page*/
var loadHeader = function loadHeader() {
    sendGenericAjax('GET', '/getUsername', null, function (data) {
        ReactDOM.render(React.createElement(Header, { username: data.username }), document.querySelector("#headerU"));
    });
};

//This sets up the renderfor  the actual page appearence
var setup = function setup(csrf) {
    /* Render each element of the page and pass in empty strings and arrays + their csrf tokens, 
    as they'll be getting their info from the three load functions above */
    ReactDOM.render(React.createElement(Header, { username: "" }), document.querySelector("#headerU"));

    ReactDOM.render(React.createElement(ImageGrid, { imgs: [] }), document.querySelector("#gridU"));

    ReactDOM.render(React.createElement(SideBar, { username: "", token: csrf }), document.querySelector("#sidebarU"));

    //load all the data for the three sections above
    loadImages();
    loadSidebar();
    loadHeader();
};

//Get the CSRF token
var getToken = function getToken() {
    sendGenericAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

//Call get token when the document is ready
$(document).ready(function () {
    getToken();
});
