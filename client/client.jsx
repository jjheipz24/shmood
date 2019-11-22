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