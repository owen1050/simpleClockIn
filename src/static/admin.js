//url = "http://villawalsh.happyrobotics.com:3600"
url = "http://localhost:5000"

function gotoHome(){
  window.location.replace(url);
}

function checkOutAllUsers(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/checkOutAllUsersNow" , false);
    xhr.send();
    const data = xhr.response;
    console.log(data);
    ret = parseInt(data);
    return ret
}