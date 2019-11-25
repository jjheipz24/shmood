const handleSignup = (e) => {
    e.preventDefault();

    $(".error").fadeOut(400);

    if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
      showError("All fields are required");
      return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
      showError("Passwords do not match");
      return false;
    }
    
    sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

    return false;
    
  };

  const SignupForm = (props) => {
      return (
        <form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST" className="mainForm">
          <div className="greeting">
            <img className="icon" src="./assets/img/largeLogo.png" alt="logo for Shmood" />>
            <h1>WELCOME</h1>
          </div>

          <div className="fields">
            <div className="form-group col-xs-4">
              <input className="field" id="user" type="text" name="username" placeholder="Username" />
            </div>
            <div className="form-group col-xs-4">
              <input className="field" id="pass" type="password" name="pass" placeholder="Password" />
            </div>
            <div className="form-group col-xs-4">
              <input className="field" id="pass2" type="password" name="pass2" placeholder="Retype password" />
            </div>
          </div>
          <input id="signupCsrf" type="hidden" name="_csrf" value={props.csrf} />
          <button className="btn btn-secondary rounded-pill" id="signupButton" type="submit">Sign Up</button>

          <div className="alert alert-danger error" role="alert">
            Passwords do not match
          </div>

          <p>Already have an account? <a href="./login">Login</a></p>
      </form>
      );
  };

  const setup = function(csrf){
    ReactDOM.render(
      <SignupForm csrf={csrf} />, document.querySelector('#signup')
    );
  };

  const getToken = () => {
    sendGenericAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
  getToken();
});