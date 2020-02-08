"use strict";

//Implementation of the 404 error page
var NotFound = function NotFound() {
    return React.createElement(
        "div",
        { "class": "container", fluid: true },
        React.createElement(
            "row",
            { "class": "row justify-content-center" },
            React.createElement(
                "h1",
                { id: "notFound" },
                "404"
            )
        ),
        React.createElement(
            "row",
            { "class": "row justify-content-center" },
            React.createElement(
                "h2",
                { id: "nothing" },
                "there's nothing here"
            )
        )
    );
};

var setup = function setup() {
    ReactDOM.render(React.createElement(NotFound, null), document.querySelector('#error-page'));
};

$(document).ready(function () {
    setup();
});
