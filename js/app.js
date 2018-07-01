const getPosts = () => {
    return fetch("http://localhost:5000/api/v1/auth/signup")
        .then(response => response.json())
        .then(posts => console.log(posts))
}

$("loginForm").addEventListener("submit",function(event){
    event.preventDefault();    //stop form from submitting
    $("feed").innerHTML = ""
    getAccess()
});

var form = new FormData($("loginForm"));

function getAccess() {

    if (!valid($("username").value, $("password").value)) {
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

function setCookie(token){
    // using docCookies set cookie to one day expiration
    docCookies.setItem("app-access-token", token, (new Date(86400 * 1e3 + Date.now())).toUTCString());
}

function valid(username, password) {

    if (username != "" && password != "")
        return true
    else {
        return false
    }
}

function $(Id) {
    return document.getElementById(Id)
}

urls = {
  login :"http://localhost:5000/api/v1/auth/login"
};
