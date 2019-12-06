//handles all error messages
const showError = (message) => {
    $(".error").text(message);
    $(".error").fadeIn(400);
  }
  
  //handles requests
  const sendAjax = (action, data) => {
    $.ajax({
      cache: false,
      type: "POST",
      url: action,
      data: data,
      dataType: "json",
      success: (result, status, xhr) => {
        $(".error").fadeOut(400);
  
        window.location = result.redirect;
      },
      error: (xhr, status, error) => {
        console.log(xhr.responseText);
        const messageObj = JSON.parse(xhr.responseText);
        showError(messageObj.error);
      }
    });
  }

  const sendGenericAjax = (method, action, data, callback) =>  { 
    $.ajax({ 
      cache: false,
      type: method,
      url: action,
      data: data,
      dataType: "json",
      success: callback,
      error: (xhr, status, error) => { 
        console.log(xhr.responseText);
        const messageObj = JSON.parse(xhr.responseText);
  
        showError(messageObj.error);
      }
    });
  }
  
  const fileUpload = (action, data) => {
    $.ajax({
      cache: false,
      type: "POST",
      url: action,
      data: data,
      processData: false,
      contentType: false,
      success: (result, status, xhr) => {
        $(".error").fadeOut(400);
        $(".success").fadeIn(200);
  
        setInterval(function () {
          window.location = result.redirect;
        }, 1200);
      },
      error: (xhr, status, error) => {
        const messageObj = JSON.parse(xhr.responseText);
  
        showError(messageObj.error);
      }
    });
  }

  const clearAll = (action, data) => {
    $.ajax({
      cache: false,
      type: "DELETE",
      url: action,
      data: data,
      processData: false,
      contentType: false,
      success: (result, status, xhr) => {
    
        setInterval(function () {
          window.location = result.redirect;
        }, 400);
      },
      error: (xhr, status, error) => {
        const messageObj = JSON.parse(xhr.responseText);
  
        showError(messageObj.error);
      }
    });
  }