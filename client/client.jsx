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
    
    sendGenericAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize());

    return false;
    
  };

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

    sendGenericAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize());

    return false;
  }

  const handleChangePassword = (e) => {
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

  const LoginForm = (props) => {
    return (
      <form id="loginForm" name="loginForm" onSubmit={handleLogin} action="/login" method="POST" class="mainForm">
      <div class="greeting">
        <img class="icon" src="./assets/img/largeLogo.png" alt="logo for Shmood" />
        <h1>WELCOME</h1>
      </div>

      <div class="fields">
        <div class="form-group col-xs-4">
          <input class="field" id="user" type="text" name="username" placeholder="Username" />
        </div>
        <div class="form-group col-xs-4">
          <input class="field" id="pass" type="password" name="pass" placeholder="Password" />
        </div>
      </div>
      <input id="loginCsrf" type="hidden" name="_csrf" value={{csrfToken}} />
      <button class="btn btn-secondary rounded-pill" id="loginButton" type="submit">Sign In</button>
      
      <div class="alert alert-danger error" role="alert">
        Username or password is incorrect
      </div>
      <p>Don't have an account? <a href="./signup">Sign Up</a></p>
    </form>
    );
  };

  const getToken = () => {
    sendAjax('GET', '/getToken')
  }