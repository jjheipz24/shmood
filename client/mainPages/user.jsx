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

const Header = (props) => {
    return (
        <div class="row justify-content-center">
            <div class="col-10">
                <header>
                    <h1 id="userTitle"><a href="/">{props.username}</a></h1>
                    <p>this is your personalized shmood page</p>
                </header>
            </div>
            <div class="col-1">

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
                <div class="position-fixed btn-group-vertical">
                    <button><a href="/userPage">{props.username}</a></button>
                    <button data-toggle="modal" data-target="#imgUpload">upload</button>
                    <button data-toggle="modal" data-target="#changePassword">change password</button>
                    <button><a href="/logout">logout</a></button>
                </div>

                <div class="modal fade" id="imgUpload" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="imgUploadTitle">Image Upload</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="imgUploadForm" name="imgUploadForm" action="/uploadImg" method="POST"
                                    class="imgUploadForm" encType="multipart/form-data">

                                    <div class="fields">
                                        <input type="file" id="userImg" name="img" accept="image/*" />
                                    </div>

                                    <div class="alert alert-danger error" role="alert">
                                        Passwords don't match
                                    </div>

                                    <div class="modal-footer">
                                        <input id="imgCsrf" type="hidden" name="_csrf" value={props.token} />
                                        <button class="btn btn-secondary rounded-pill" id="cancelButton"
                                            data-dismiss="modal">Cancel</button>
                                        <button class="btn btn-secondary rounded-pill" id="uploadButton"
                                            type="submit">Upload</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="changePassword" tabindex="-1" role="dialog"
                    aria-labelledby="changePasswordTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="changePasswordTitle">Change Password</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="changePasswordForm" name="changePasswordForm" action="/changePassword"
                                    method="POST" class="changePasswordForm">
                                    <div class="fields">
                                        <div class="form-group col-xs-4">
                                            <input class="field" id="currentPass" type="text" name="currentPass"
                                                placeholder="Current password" />
                                        </div>
                                        <div class="form-group col-xs-4">
                                            <input class="field" id="newPass" type="password" name="newPass"
                                                placeholder="New password" />
                                        </div>
                                        <div class="form-group col-xs-4">
                                            <input class="field" id="pass2" type="password" name="pass2"
                                                placeholder="Retype password" />
                                        </div>
                                    </div>

                                    <div class="alert alert-danger error" role="alert">
                                        Passwords do not match
                                    </div>

                                    <div class="modal-footer">
                                        <input id="signupCsrf" type="hidden" name="_csrf" value={props.token} />
                                        <button class="btn btn-secondary rounded-pill" id="cancelButton"
                                            data-dismiss="modal">Cancel</button>
                                        <button class="btn btn-secondary rounded-pill" id="changePasswordButton"
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
            <ImageGrid imgs={data.imgs} />, document.querySelector("#grid")
        );
    });
};

const loadUsername = () => { debugger
    sendGenericAjax('GET', '/getUsername', null, (data) => {
        ReactDOM.render(
            <Header username={data.username} />, document.querySelector("#header"),
            <SideBar username={data.username} />, document.querySelector("#sidebar")
        );
    });
}

const setup = function(csrf) {
    ReactDOM.render(
        <Header username={""} />, document.querySelector("#header")
    );

    ReactDOM.render(
        <ImageGrid imgs={[]} />, document.querySelector("#grid")
    );

    ReactDOM.render(
        <SideBar username={""} token={csrf} />, document.querySelector("#sidebar")
    );

    loadImages();
    loadUsername();
};


const getToken = () => {
    sendGenericAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
