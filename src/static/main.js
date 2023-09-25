url = "http://villawalsh.happyrobotics.com:3600"
//url = "http://localhost:5000"

// Execute a function when the user presses a key on the keyboard
var input = document.getElementById("id");
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("buttonID").click();
  }
});


function gotoNew(){
  window.location.replace(url+"/newUser");
}

function signInOut() {
    textboxElement = document.getElementById("id")
    id = textboxElement.value;

    actionElement = document.getElementById("idAction")
    action = actionElement.value;

    textElement = document.getElementById("checkinText")

    if(doesUserExist(id) == 1){
      if(isUserCheckedIn(id) == 1){
        checkUserOut(id, action);
        name = getUserName(id);
        textElement.innerText = "Checked out " + name;
      } else {
        checkUserIn(id);
        name = getUserName(id);
        textElement.innerText = "Checked in " + name;
      }
    } else {
      textElement.innerText = "No user with ID:" + id;
    }
    textboxElement.value = ''
}

function newUser(){
  newTextEle = document.getElementById("idNew")
  idNew = newTextEle.value;
  newNameEle = document.getElementById("nameBox")
  name = newNameEle.value;
  newUserTextElemeent = document.getElementById("newUserTextBot")

  r = createUser(idNew, name);
  if(r == 1){
    newUserTextElemeent.innerText = "User already exists"
  }
  if(r == 0){
    newUserTextElemeent.innerText = "User:" + name + " with pin:" + idNew + " sucessfully created"
  }
  if(r != 1 && r != 0){
    newUserTextElemeent.innerText = "error in new user creation"
  
  }
}
//doesUserExist(id):
//isUserCheckedIn(id):
//checkUserIn(id):
//checkUserOut(id):
//createUser(id, name):
function doesUserExist(id){
    ret = -1;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/doesUserExist?id=" + id, false);
    xhr.send();
    const data = xhr.response;
    console.log(data);
    ret = parseInt(data);
    return ret
}

function isUserCheckedIn(id){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/isUserCheckedIn?id=" + id, false);
    xhr.send();
    const data = xhr.response;
    console.log(data);
    ret = parseInt(data);
    return ret
}

function checkUserIn(id){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/checkUserIn?id=" + id, false);
    xhr.send();
    const data = xhr.response;
    console.log(data);
    ret = parseInt(data);
    return ret
}

function checkUserOut(id, action){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/checkUserOut?id=" + id + "&action=" + action, false);
    xhr.send();
    const data = xhr.response;
    console.log(data);
    ret = parseInt(data);
    return ret
}

function getUserName(id){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/getUserName?id=" + id, false);
    xhr.send();
    const data = xhr.response;
    console.log(data);
    ret = data;
    return ret
}

function createUser(id, name){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/createUser?id=" + id + "&name=" + name, false);
    xhr.send();
    const data = xhr.response;
    console.log(data);
    ret = parseInt(data);
    return ret
}
