// # Check if the page is the login
if ($("loginForm")){
  $("loginForm").addEventListener("submit",function(event){
      event.preventDefault();    //stop form from submitting
      $("feed").innerHTML = ""
      if (!validateEmpty($("username").value) || !validateEmpty($("password").value)) {
        $("feed").innerHTML = "Username or password is empty"
      } else {
        getAccess()
      }
  });
}

// # check if page is register page
if ($("registractionForm")){
  $("registractionForm").addEventListener("submit",function(event){
      event.preventDefault();    //stop form from submitting
      $("feed").innerHTML = ""
      if (!validateEmpty($("username").value) || !validateEmpty($("email").value)  || !validateEmpty($("password").value)) {
        $("feed").innerHTML = "Some fields are empty.<br/> Please fill all fields"
      }
      registerUser()
  });
}

// # check if page is requests page
if ($("reaction_list")){
  window.addEventListener("load", function () {
      window.loaded = true;
      getRequests()
  });
}

// user login
function getAccess() {

    requestHeaders = new Headers({
        'Authorization': 'Basic ' + btoa($("username").value + ':' + $("password").value)
    });

    fetch(urls.login, {
        method: 'POST',
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

// user registration
function registerUser() {
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

// user gets requests
function getRequests() {

  TokenHeader = new Headers({
    'app-access-token': ""+docCookies.getItem('app-access-token')
  })

  fetch(urls.requests, {
      method: 'GET',
      headers: TokenHeader
  })
  .then(function (res) {
      if (res.status == 404){
         $("reaction_list").style.display = "block";
      }
      return res.json();
  })
  .then(function (data) {
      // if (data.message == "user logged in successfully") {
      //     setCookie(data.token)
          // window.location = "requests.html"
      // } else {
      //     document.getElementById("feed").innerHTML = data.message
      // }
  })
  .catch(function (e){
     return ;
  });
  //
  // TokenHeader = new Headers({
  //   'app-access-token': ""+docCookies.getItem('app-access-token')
  // })
  //
  // fetch(urls.userrequests, {
  //     method:'GET',
  //     headers:TokenHeader,
  // })
  // .then(function (res) {
  //     if (res.status == 404){
  //        $("reaction_list").style.display = "block";
  //     }
  //     return res.json();
  // })
  // .catch(function (e){
  //   return ;
  // })
  // .then(function (data) {
  //     // console.log(data.message);
  //     // if (data.message == "user registred successfully") {
  //     //     window.location = "index.html"
  //     // } else {
  //     //     document.getElementById("feed").innerHTML = data.message
  //     // }
  // });
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
  signup:"http://localhost:5000/api/v1/auth/signup",
  requests:"http://localhost:5000/api/v1/users/requests"
};
