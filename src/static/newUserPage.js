url = "http://villawalsh.happyrobotics.com"
//url = "http://localhost:5000"

// Execute a function when the user presses a key on the keyboard
var input = document.getElementById("name");
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("buttonID").click();
  }
});


function newUser(){
  newTextEle = document.getElementById("id")
  idNew = newTextEle.value;
  newNameEle = document.getElementById("name")
  name = newNameEle.value;
  newUserTextElemeent = document.getElementById("newUserTextBot")

  r = createUser(idNew, name);
  if(r == 1){
    newUserTextElemeent.innerText = "User already exists"
  }
  if(r == 0){
    newUserTextElemeent.innerText = "Created\nUser:" + name + "\nPin:" + idNew + "\n\nGoing back to homepage"
  }
  if(r != 1 && r != 0){
    newUserTextElemeent.innerText = "error in new user creation"
  }
  setTimeout(function() {window.location.replace(url);}, 2000);  
  
}

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
