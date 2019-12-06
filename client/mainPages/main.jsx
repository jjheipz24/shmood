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

//JSX for the header of the homepage
const Header = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-10">
                <header>
                    <h1 id="title"><a href="/">SHMOOD</a></h1>
                    <p>create your own personalized mood board</p>
                </header>
            </div>

            <div className="col-1">

            </div>
        </div>
    );
}

//JSX that renders the image grid, takes in the images gotten from below
const ImageGrid = (props) => {
    console.dir(props.imgs);
    if(props.imgs.length === 0) {
        return (
            <div className="col-10" id="grid">
                <h2 id="noImg">No images have been uploaded</h2>
            </div>
        );
    }

    //use map to create three columns from the three arrays given
    //pass each img into the img tag
    const col1 = props.imgs[0].map(function(img) {
        return (
            <img src={img} className="img-fluid mb-4" />
        );
    });

    const col2 = props.imgs[1].map(function(img) {
        return (
            <img src={img} className="img-fluid mb-4" />
        );
    });

    const col3 = props.imgs[2].map(function(img) {
        return (
            <img src={img} className="img-fluid mb-4" />
        );
    });

     //return the row and cols put inside the grid div
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

/* render the sidebar

if someone is logged in, it renders the logged in sidebar (username, logout)
if not logged in, just shows signup and login*/
const SideBar = (props) => {
    if(props.username === "" || !props.username) {     
        return (
            <div className="position-fixed btn-group-vertical">
                <button><a href="/signup">signup</a></button>
                <button><a href="/login">login</a></button>
            </div>
        );
    }

    return (
        <div className="position-fixed btn-group-vertical">
            <button><a href="/userPage">{props.username}</a></button>
            <button><a href="/logout">logout</a></button>
        </div>
    );
}

/*Make a GET request to get the random images from all users
These images are then passed into ImageGrid which is rendered in the #grid div*/
const loadImages = () => {
    sendGenericAjax('GET', '/getHomeImg', null, (data) => {
        ReactDOM.render(
            <ImageGrid imgs={data.imgs} />, document.querySelector("#grid")
        );
    });
};

/*Make a GET request to get the current user's name from the image controller
These images are then passed into SideBar if someone is logged in*/
const loadUsername = () => { 
    sendGenericAjax('GET', '/getUsername', null, (data) => { 
        ReactDOM.render(
            <SideBar username={data.username} />, document.querySelector("#sidebar")
        );
    });
}

//This sets up the render for  the actual page appearence
const setup = function(csrf) {
     /* Render each element of the page and pass in empty strings and arrays + their csrf tokens, 
    as they'll be getting their info from the three load functions above */
    ReactDOM.render(
        <Header />, document.querySelector("#header")
    );

    ReactDOM.render(
        <ImageGrid imgs={[]} />, document.querySelector("#grid")
    );

    ReactDOM.render(
        <SideBar username={""} />, document.querySelector("#sidebar")
    );

    //load all the data for the sections above
    loadImages();
    loadUsername();
};

//Get the CSRF token
const getToken = () => {
    sendGenericAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

//Call get token when the document is ready
$(document).ready(function() {
    getToken();
});
