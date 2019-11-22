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

const Header = () => {
    return (
        <div class="row justify-content-center">
            <div class="col-10">
                <header>
                    <h1 id="title"><a href="/">SHMOOD</a></h1>
                    <p>create your own personalized mood board</p>
                </header>
            </div>

            <div class="col-1">

            </div>
        </div>
    );
}

const ImageGrid = (props) => {
    if(props.length === 0) {
        return (
            <div class="col-10" id="grid">
                <h2 id="noImg">No images have been uploaded</h2>
            </div>
        );
    }

    const col1 = props.imgs[0].map(function(img) {
        return (
            <img src={img} class="img-fluid mb-4"></img>
        );
    });

    const col2 = props.imgs[1].map(function(img) {
        return (
            <img src={img} class="img-fluid mb-4"></img>
        );
    });

    const col3 = props.imgs[2].map(function(img) {
        return (
            <img src={img} class="img-fluid mb-4"></img>
        );
    });

    return (
        <div class="col-10" id="grid">
            <div class="row">
                <div class="col">
                    {col1}
                </div>
                <div class="col">
                    {col2}
                </div>
                <div class="col">
                    {col3}
                </div>
            </div>
         </div>
    );
}

const SideBar = (props) => {
    if(props.username) {
        return (
            <div class="position-fixed btn-group-vertical">
                <button><a href="/userPage">{props.username}</a></button>
                <button><a href="/logout">logout</a></button>
            </div>
        );
    }

    return (
        <div class="position-fixed btn-group-vertical">
            <button><a href="/signup">signup</a></button>
            <button><a href="/login">login</a></button>
        </div>
    );
}

const loadImages = () => {
    sendAjax('GET', '/getHomeImg', null, (data) => {
        ReactDOM.render(
            <ImageGrid imgs={data.imgs} />, document.querySelector("#grid")
        );
    });
};

const loadUsername = () => {
    sendAjax('GET', '/getUsername', null, (data) => {
        ReactDOM.render(
            <SideBar username={data.username} />, document.querySelector("#sidebar")
        );
    });
}

const setup = function(csrf) {
    ReactDOM.render(
        <Header csrf={csrf} />, document.querySelector("#header")
    );

    ReactDOM.render(
        <ImageGrid imgs={[]} />, document.querySelector("#grid")
    );

    ReactDOM.render(
        <SideBar username={[]} />, document.querySelector("#sidebar")
    );

    loadImages();
    loadUsername();
};


const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
