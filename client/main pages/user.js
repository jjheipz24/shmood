//handles requests on the image upload form after submit clicked
//shows error messages depending on the error
const handleImg = (e) => {
    e.preventDefault();

    $(".error").fadeOut(400);

    if ($("#userImg").val() == '') {
        showError("Please select an image");
        return false;
    }


    fileUpload($("#imgUploadForm").attr("action"), new FormData($("#imgUploadForm")[0]));

    return false;
};

const loadImages = () => {
    sendAjax('GET', '/getUserImg', null, (data) => {
        ReactDOM.render(
           //render grid 
        );
    });
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
