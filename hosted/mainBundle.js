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

//JSX for the header of the homepage
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

/* render the sidebar

if someone is logged in, it renders the logged in sidebar (username, logout)
if not logged in, just shows signup and login*/
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

/*Make a GET request to get the random images from all users
These images are then passed into ImageGrid which is rendered in the #grid div*/
var loadImages = function loadImages() {
    sendGenericAjax('GET', '/getHomeImg', null, function (data) {
        ReactDOM.render(React.createElement(ImageGrid, { imgs: data.imgs }), document.querySelector("#grid"));
    });
};

/*Make a GET request to get the current user's name from the image controller
These images are then passed into SideBar if someone is logged in*/
var loadUsername = function loadUsername() {
    sendGenericAjax('GET', '/getUsername', null, function (data) {
        ReactDOM.render(React.createElement(SideBar, { username: data.username }), document.querySelector("#sidebar"));
    });
};

//This sets up the render for  the actual page appearence
var setup = function setup(csrf) {
    /* Render each element of the page and pass in empty strings and arrays + their csrf tokens, 
    as they'll be getting their info from the three load functions above */
    ReactDOM.render(React.createElement(Header, null), document.querySelector("#header"));

    ReactDOM.render(React.createElement(ImageGrid, { imgs: [] }), document.querySelector("#grid"));

    ReactDOM.render(React.createElement(SideBar, { username: "" }), document.querySelector("#sidebar"));

    //load all the data for the sections above
    loadImages();
    loadUsername();
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
