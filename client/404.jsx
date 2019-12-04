const NotFound = () => {
    return (
        <div class="container" fluid>
        <row class="row justify-content-center">
            <h1 id="notFound">404</h1>
        </row>
        <row class="row justify-content-center">
           <h2 id="nothing">there's nothing here</h2>
        </row>
    </div>

    );
};

const setup = () => {
    ReactDOM.render(
        <NotFound />, document.querySelector('#error-page')
    );
};

$(document).ready(function(){
    setup();
});