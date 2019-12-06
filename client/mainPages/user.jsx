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

const handlePChange = (e) => {
    e.preventDefault();

    $(".error").fadeOut(400);

    if ($("#currentPass").val() == '' || $("#newPass").val() == '' || $("#pass2").val() == '') {
        showError("All fields are required");
        return false;
    }

    if ($("#newPass").val() !== $("#pass2").val()) {
        showError("Passwords do not match")
        return false;
    }

    sendAjax($("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize());

    return false;
}

const handleDelete = (e) => {
    e.preventDefault();
    
    sendGenericAjax('DELETE', $('#deleteForm').attr("action"), $("#deleteForm").serialize(), function () {
        loadImages($("#deleteCsrf").val());
    });

    return false;
}

const Header = (props) => {
    return (
        <div className="row justify-content-center">
            <div className="col-9">
                <header>
                    <h1 id="userTitle"><a href="/">{props.username}</a></h1>
                    <p>this is your personalized shmood page</p>
                </header>
            </div>
            <div className="col-1">

            </div>
        </div>
    );
}

const ImageGrid = (props) => {
    console.dir(props.imgs);
    if(props.imgs.length === 0) {
        return (
            <div className="col-10" id="grid">
                <h2 id="noImg">No images have been uploaded</h2>
            </div>
        );
    }

    const col1 = props.imgs[0].map(function(img) {
        return (
            <img src={img} className="img-fluid mb-4"></img>
        );
    });

    const col2 = props.imgs[1].map(function(img) {
        return (
            <img src={img} className="img-fluid mb-4"></img>
        );
    });

    const col3 = props.imgs[2].map(function(img) {
        return (
            <img src={img} className="img-fluid mb-4"></img>
        );
    });

    return (
        <div className="col-10" id="grid">
            <div className="row">
                <div className="col">
                    {col1}
                </div>
                <div className="col">
                    {col2}
                </div>
                <div className="col">
                    {col3}
                </div>
            </div>
         </div>
    );
}

const SideBar = (props) => {
    return (
        <div id="sidebarInfo">
                <div className="position-fixed btn-group-vertical">
                    <button><a href="/userPage">{props.username}</a></button>
                    <button data-toggle="modal" data-target="#imgUpload">upload</button>
                    <button data-toggle="modal" data-target="#changePassword">change password</button>
                    <button><a href="/logout">logout</a></button>
                </div>

                <div className="modal fade" id="imgUpload" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="imgUploadTitle">Image Upload</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="imgUploadForm" name="imgUploadForm" action="/uploadImg" method="POST"
                                    className="imgUploadForm" encType="multipart/form-data" onSubmit={handleImg}>

                                    <p id="explain">Use shift or ctrl to select multiple files to upload</p>
                                    <div className="fields">
                                        <input type="file" id="userImg" name="img" accept="image/*" multiple />
                                    </div>

                                    <div className="alert alert-success success" role="alert">
                                        Upload successful!
                                    </div>
                                    <div className="alert alert-danger error" role="alert">
                                        No image
                                    </div>

                                    <div className="modal-footer">
                                        <input id="imgCsrf" type="hidden" name="_csrf" value={props.token} />
                                        <button className="btn btn-secondary rounded-pill" id="cancelButton"
                                            data-dismiss="modal">Cancel</button>
                                        <button className="btn btn-secondary rounded-pill" id="uploadButton"
                                            type="submit">Upload</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="changePassword" tabIndex="-1" role="dialog"
                    aria-labelledby="changePasswordTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="changePasswordTitle">Change Password</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="changePasswordForm" name="changePasswordForm" action="/changePassword"
                                    method="POST" className="changePasswordForm" onSubmit={handlePChange}>
                                    <div className="fields">
                                        <div className="form-group col-xs-4">
                                            <input className="field" id="currentPass" type="text" name="currentPass"
                                                placeholder="Current password" />
                                        </div>
                                        <div className="form-group col-xs-4">
                                            <input className="field" id="newPass" type="password" name="newPass"
                                                placeholder="New password" />
                                        </div>
                                        <div className="form-group col-xs-4">
                                            <input className="field" id="pass2" type="password" name="pass2"
                                                placeholder="Retype password" />
                                        </div>
                                    </div>

                                    <div className="alert alert-danger error" role="alert">
                                        Passwords do not match
                                    </div>

                                    <div className="modal-footer">
                                        <input id="signupCsrf" type="hidden" name="_csrf" value={props.token} />
                                        <button className="btn btn-secondary rounded-pill" id="cancelButton"
                                            data-dismiss="modal">Cancel</button>
                                        <button className="btn btn-secondary rounded-pill" id="changePasswordButton"
                                            type="submit">Change Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

const loadImages = () => {
    sendGenericAjax('GET', '/getUserImg', null, (data) => {
        ReactDOM.render(
            <ImageGrid imgs={data.imgs} />, document.querySelector("#gridU")
        );
    });
};

const loadSidebar = () => { debugger
    sendGenericAjax('GET', '/getUsername', null, (data) => {
        ReactDOM.render(
            <SideBar username={data.username} />, document.querySelector("#sidebarU")
        );
    });
}

const loadHeader = () => { debugger
    sendGenericAjax('GET', '/getUsername', null, (data) => {
        ReactDOM.render(
            <Header username={data.username} />, document.querySelector("#headerU")
        );
    });
}

const setup = function(csrf) {
    ReactDOM.render(
        <Header username={""} />, document.querySelector("#headerU")
    );

    ReactDOM.render(
        <ImageGrid imgs={[]} />, document.querySelector("#gridU")
    );

    ReactDOM.render(
        <SideBar username={""} token={csrf} />, document.querySelector("#sidebarU")
    );

    loadImages();
    loadSidebar();
    loadHeader();
};


const getToken = () => {
    sendGenericAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
