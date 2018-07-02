const getPosts = () => {
    return fetch("http://localhost:5000/api/v1/auth/signup")
        .then(response => response.json())
        .then(posts => console.log(posts))
}

// # Check if the page is the login
if ($("loginForm")){
  $("loginForm").addEventListener("submit",function(event){
      event.preventDefault();    //stop form from submitting
      $("feed").innerHTML = ""
      getAccess()
  });
}
// # check if page is register page
if ($("registractionForm")){
  $("registractionForm").addEventListener("submit",function(event){
      event.preventDefault();    //stop form from submitting
      $("feed").innerHTML = ""
      registerUser()
  });
}



var form = new FormData($("loginForm"));

function getAccess() {

    if (!validateEmpty($("username").value) || !validateEmpty($("password").value)) {
        $("feed").innerHTML = "Username or password is empty"
    } else {

        requestHeaders = new Headers({
            'Authorization': 'Basic ' + btoa($("username").value + ':' + $("password").value)
        });

        fetch(urls.login, {
            method: 'POST',
            body: form,
            headers: requestHeaders
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            if (data.message == "user logged in successfully") {
                setCookie(data.token)
                window.location = "requests.html"
            } else {
                document.getElementById("feed").innerHTML = data.message
            }
        });
    }
}

function registerUser(){
  if (!validateEmpty($("username").value) || !validateEmpty($("email").value)){
      $("feed").innerHTML = "Some fields are empty.<br/> Please fill all fields"
  } else {

      signupHeaders = new Headers({
        'Content-Type':'application/json'
      })

      fetch(urls.signup, {
          method: 'POST',
          headers:signupHeaders,
          body: JSON.stringify({
            username:$("username").value,
            password:$("password").value,
            email:$("email").value
          })
      })
      .then(function (res) {
          return res.json();
      })
      .then(function (data) {
          if (data.message == "user registred successfully") {
              window.location = "index.html"
          } else {
              document.getElementById("feed").innerHTML = data.message
          }
      });
  }
}

function setCookie(token){
    // using docCookies set cookie to one day expiration
    docCookies.setItem("app-access-token", token, (new Date(86400 * 1e3 + Date.now())).toUTCString());
}

function validateEmpty(field) {

    if (field != "")
        return true
    else {
        return false
    }
}

function $(Id) {
    return document.getElementById(Id)
}

urls = {
  login :"http://localhost:5000/api/v1/auth/login",
  signup:"http://localhost:5000/api/v1/auth/signup"
};
