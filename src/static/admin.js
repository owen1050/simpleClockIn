url = "http://villawalsh.happyrobotics.com"
//url = "http://localhost:5000"

var categories = getAllCategories()
var table = document.getElementById("category")
cols = table.rows[0].cells.length

for(let row = 0; row < categories.length; row++){
    newRow = table.insertRow(table.rows.length);
    
    newRow.insertCell(0).innerHTML = categories[row][8]
    newRow.insertCell(1).innerHTML = "<input id = 'input" +categories[row][0]+ "' type='text' value='" + categories[row][1] + "'>"
    newRow.insertCell(2).innerHTML = categories[row][0]
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

function goHome(){
  window.location.href = url;
}

function getAllCategories(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/getAllCategories", false);
    xhr.send();
    const data = JSON.parse(xhr.response);
    console.log(data);
    return data
}

function updateAllHours(){
  table = document.getElementById("category")
  cols = table.rows[0].cells.length

  for(let row = 1; row <= categories.length; row++){
      rowItem = table.rows.item(row)
      id = rowItem.cells.item(2).innerHTML

      tb = document.getElementById("input" + id)
      
      hours = tb.value
      
      updateHours(id, hours)
  }
}

function updateHours(id, hours){
    console.log(id, hours)
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/setHoursForCategory?id=" + id + "&hours=" + hours, false);
    xhr.send();
    const data = JSON.parse(xhr.response);
    console.log(data);
    return data
}