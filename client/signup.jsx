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