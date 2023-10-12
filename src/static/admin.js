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

    text = document.getElementById("checkinText")
    text.innerText = "All users checked out";
    return ret
}

function downloadUserData(){
    const xhr = new XMLHttpRequest();
    window.location.replace(url + "/api/download/getAllUsersTimes");
    text = document.getElementById("checkinText")
    text.innerText = "Data downloaded";
}