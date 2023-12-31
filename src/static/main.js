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

function gotoAdmin(){
  window.location.replace(url+"/admin");
}

function signInOut() {
    textboxElement = document.getElementById("id");
    id = textboxElement.value;
    
    if(id == 'admin'){
      gotoAdmin()
    }else{
      actionElement = document.getElementById("idAction")
      action = actionElement.value;

      textElement = document.getElementById("checkinText")

      if(id != '' && doesUserExist(id) == 1){
        if(isUserCheckedIn(id) == 1){
          checkUserOut(id, action);
          name = getUserName(id);
          textElement.innerText = "Checked out " + name;
        } else {
          checkUserIn(id, action);
          name = getUserName(id, action);
          textElement.innerText = "Checked in " + name;
        }
        updateUsersList()
      } else {
        if(id == ''){
          textElement.innerText = "Please enter ID";
        }else
        {
          textElement.innerText = "No user with ID:" + id;
        }
      }
      textboxElement.value = ''
    }
    textboxElement.focus();
    textboxElement.select();

    
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

function isUserCheckedIn(id){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/isUserCheckedIn?id=" + id, false);
    xhr.send();
    const data = xhr.response;
    console.log(data);
    ret = parseInt(data);
    return ret
}

function checkUserIn(id, action){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/checkUserIn?id=" + id + "&action=" + action, false);
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

function getAllUsers(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/getAllUsers", false);
    xhr.send();
    const data = JSON.parse(xhr.response);
    console.log(data);
    return data
}

function updateUsersList() {
  listTextElement = document.getElementById("listText");
  listStr = ""
  users = getAllUsers();
  for(let i = 0; i < users.length; i++){
    
    if(users[i][2] == 1){
      listStr = listStr + users[i][1] + ", "
    }
  }
  if(listStr.slice(-1) == ' '){
    listStr = listStr.substring(0, listStr.length - 2) + "."
  }
  listTextElement.innerText = "Users checked in:\n" + listStr
}