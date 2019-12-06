//Handles login requests
//Sends back and shows error messages if field are incorrect
const handleLogin = (e) => {
  e.preventDefault();

  $(".error").fadeOut(400);

  if ($("#user").val() == '') {
    showError("Username is required");
    return false;
  }

  if ($("#pass").val() == '') {
    showError("Password is required");
    return false;
  }

  sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

  return false;
}

//The form that handles login
//Accepts a username and password and gives the user the option to create an account
//Sends a post request on submit
const LoginForm = (props) => {
  return (
    <div>
      <form id="loginForm" name="loginForm" onSubmit={handleLogin} action="/login" method="POST" className="mainForm">
        <div className="greeting">
          <img className="icon" src="./assets/img/largeLogo.png" alt="logo for Shmood" />
          <h1>WELCOME</h1>
        </div>

        <div className="fields">
          <div className="form-group col-xs-4">
            <input className="field" id="user" type="text" name="username" placeholder="Username" />
          </div>
          <div className="form-group col-xs-4">
            <input className="field" id="pass" type="password" name="pass" placeholder="Password" />
          </div>
        </div>
        <input id="loginCsrf" type="hidden" name="_csrf" value={props.csrf} />
        <button className="btn btn-secondary rounded-pill" id="loginButton" type="submit">Sign In</button>

        <div className="alert alert-danger error" role="alert">
          Username or password is incorrect
          </div>
        <p>Don't have an account? <a href="./signup">Sign Up</a></p>
      </form>
    </div>
  );
};

const setup = function (csrf) {
  ReactDOM.render(
    <LoginForm csrf={csrf} />, document.querySelector('#login')
  );
};

const getToken = () => {
  sendGenericAjax('GET', '/getToken', null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});