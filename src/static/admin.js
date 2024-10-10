url = url_g

var categories = getAllCategories()
var table = document.getElementById("category")
cols = table.rows[0].cells.length

for(let row = 0; row < categories.length; row++){
    newRow = table.insertRow(table.rows.length);
    
    newRow.insertCell(0).innerHTML = categories[row][8]
    newRow.insertCell(1).innerHTML = "<input id = 'input" +categories[row][0]+ "' type='text' value='" + categories[row][1] + "'>"
    newRow.insertCell(2).innerHTML = categories[row][0]
}

var users = getAllUsers()
var hours = getAllUsersHours()
var table = document.getElementById("userTable")
cols = table.rows[0].cells.length

for(let row = 0; row < users.length; row++){
    newRow = table.insertRow(table.rows.length);
    
    cellN = newRow.insertCell(0)
    cellN.innerHTML = "<a href=\"" + url + "/hours?id=" + users[row][0].toString() + "\">"+users[row][0].toString()+"</a>"
    newRow.insertCell(1).innerHTML = users[row][1]
    newRow.insertCell(2).innerHTML = hours.get(users[row][0])
    console.log(users[row][0])

    let status = ['None', 'None'] 
    try {
      status = getVarsityStatus(users[row][0])
    } catch (e) {}
    console.log(status)
    newRow.insertCell(3).innerHTML = status[0]
    newRow.insertCell(4).innerHTML = status[1]
    
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

function getAllUsers(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/getAllUsers", false);
    xhr.send();
    const data = JSON.parse(xhr.response);
    console.log(data);
    return data
}

function getAllUsersHours(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/getAllUsersHours", false);
    xhr.send();
    strResp = xhr.response.replace(/\s/g, "");
    arr = strResp.split(",")
    retArr = new Map();
    for(let i = 0; i < arr.length; i++){
        thisEle = arr[i].split(":")
        retArr.set(Number(thisEle[0]), (thisEle[1]/3600).toFixed(2))
    }
    console.log(retArr);
    return retArr
}

function manuallyAddHoursButton() {
    var idInBox = document.getElementById("manuallID")
    var catInBox = document.getElementById("manuallCat")
    var DAInBox = document.getElementById("manuallDA")
    var hoursInBox = document.getElementById("manuallHours")
    var textInBox = document.getElementById("manuallText")

    manuallyAddHours(idInBox.value, catInBox.value, DAInBox.value, hoursInBox.value, textInBox.value)
    
}

function manuallyAddHours(id, cat, daysAgo, hours, text){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/manuallyAddEvent?id=" + id 
        + "&hours=" + hours 
        + "&cat=" + cat
        + "&daysAgo=" + daysAgo
        + "&text=" + text
        , false);
    xhr.send();
    const data = JSON.parse(xhr.response);
    console.log(data);
    return data

}

function updateCategoryValues(id, hours, bV, bJV, bP, busV, busJV, busPar, name, weight){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/updateCategoryValues?id=" + id 
        + "&hours=" + hours
        + "&bV=" + bV
        + "&bJV=" + bJV
        + "&bP=" + bP
        + "&busV=" + busV
        + "&busJV=" + busJV
        + "&busPar=" + busPar
        + "&name=" + name
        + "&weight=" + weight
        , false);
    xhr.send();
    const data = JSON.parse(xhr.response);
    console.log(data);
    return data

}

function updateCategoryValues(id, hours, bV, bJV, bP, busV, busJV, busPar, name, weight){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/updateCategoryValues?id=" + id 
        + "&hours=" + hours
        + "&bV=" + bV
        + "&bJV=" + bJV
        + "&bP=" + bP
        + "&busV=" + busV
        + "&busJV=" + busJV
        + "&busPar=" + busPar
        + "&name=" + name
        + "&weight=" + weight
        , false);
    xhr.send();
    const data = JSON.parse(xhr.response);
    console.log(data);
    return data

}


function getUserTimes(idi){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/getUserTimes?id=" + idi, false);
    xhr.send();
    const data = xhr.response;
   
    events = data.split("), (")
    cleanEvents = []

    for(let i = 0; i < events.length; i++){
        tmp = events[i].split(", ")
        year = tmp[0].substring(tmp[0].length - 4)
        month = tmp[1]
        day = tmp[2].substring(0,tmp[2].length-1)
        seconds = tmp[3]
        if(tmp[4].indexOf(")") > 0){
            catId = tmp[4].substring(0,tmp[4].indexOf(")"))
        } else {
            catId = tmp[4]
        }
        act = tmp[5].substring(tmp[5].indexOf("'")+1, tmp[5].indexOf("'", 1))
        cleanEvents.push([year, month, day, seconds, catId, act])
    }
    return cleanEvents
}

function getHoursInCategory(catId, signIns){
    let time = 0;

    for(let i = 0; i < signIns.length; i++){
        if(signIns[i][4] == catId){
            time = Number(time) + Number(signIns[i][3]);
        }
    }
    return time
}

function updateCategoryButton() {
    var newID = document.getElementById("newID")
    var newName = document.getElementById("newName")
    var newHours = document.getElementById("newHours")
    var newBV = document.getElementById("newBV")
    var newBJV = document.getElementById("newBJV")
    var newBP = document.getElementById("newBP")
    var newBusV = document.getElementById("newBusV")
    var newBusJV = document.getElementById("newBusJV")
    var newBPar = document.getElementById("newBPar")
    var newWeight = document.getElementById("newWeight")

    updateCategoryValues(newID.value,
        newHours.value,
        newBV.value,
        newBJV.value,
        newBP.value,
        newBusV.value,
        newBusJV.value,
        newBPar.value,
        newName.value,
        newWeight.value)
}

function getVarsityStatus(id) {

    var catToColMap = new Map();
    catToColMap.set(0,8);
    catToColMap.set(2,1);
    catToColMap.set(3,2);
    catToColMap.set(4,3);
    catToColMap.set(5,4);
    catToColMap.set(7,5);
    catToColMap.set(8,6);
    catToColMap.set(9,7);

    signIns = getUserTimes(id)
    let totalHours = 0;

    cols = 11

    var busStatus = []
    var buildStatus = []

    for(let row = 0; row < categories.length; row++){
        for(let col = 0; col < 11; col++){
            if(col == 0){
            }
            if(col == 1){
                var userHours = Number(Math.round(getHoursInCategory(categories[row][0], signIns)/3600 * 100) / 100)
                totalHours = Number(totalHours) + Number(userHours)
            }
            if(col == 2){
            }
            if(col == 3){
                var buildVar = Number(categories[row][catToColMap.get(col)])* categories[row][catToColMap.get(2)];
            }
            if(col == 4){
                var buildJV = Number(categories[row][catToColMap.get(col)])* categories[row][catToColMap.get(2)];
            }
            if(col == 5){
                var buildP = Number(categories[row][catToColMap.get(col)])* categories[row][catToColMap.get(2)];
            }
            if(col == 6){
                str = "None"
                if(userHours > buildP){
                    str = "P"
                }
                if(userHours > buildJV){
                    str = "JV"
                }
                if(userHours > buildVar){
                    str = "V"
                }
                if(buildVar == 0){
                    str = "n/a"
                }
                buildStatus.push(str)
            }
            if(col == 7){
                var busVar = Number(categories[row][catToColMap.get(col)]) * categories[row][catToColMap.get(2)]
                
            }
            if(col == 8){
                var busJV = Number(categories[row][catToColMap.get(col)]) * categories[row][catToColMap.get(2)]
            }
            if(col == 9){
                var busP = Number(categories[row][catToColMap.get(col)]) * categories[row][catToColMap.get(2)]
            }
            if(col == 10){
                str = "None"
                if(userHours > busP){
                    str = "P"
                }
                if(userHours > busJV){
                    str = "JV"
                }
                if(userHours > busVar){
                    str = "V"
                }
                if(busVar == 0){
                    str = "n/a"
                }
                busStatus.push(str) 
            }
            
        }
    }

    lowestStatus = "V"
    for(let i = 0; i < busStatus.length; i++){
        if(lowestStatus == "V" && (busStatus[i] == 'P' || busStatus[i] == 'JV' || busStatus[i] == "None")){
            lowestStatus = busStatus[i]
        }
        if(lowestStatus == "JV" && (busStatus[i] == 'P' || busStatus[i] == "None")){
            lowestStatus = busStatus[i]
        }
        if(lowestStatus == "P" && (busStatus[i] == "None")){
            lowestStatus = busStatus[i]
        }
    }
    allNA = true
    for(let i = 0; i < busStatus.length; i++){
        if(busStatus[i] != "n/a"){
            allNA = false
        }
    }
    if(allNA){
        lowestStatus = "n/a"
    }

    lowestBuildStatus = "V"
    for(let i = 0; i < buildStatus.length; i++){
        if(lowestBuildStatus == "V" && (buildStatus[i] == 'P' || buildStatus[i] == 'JV' || buildStatus[i] == "None")){
            lowestBuildStatus = buildStatus[i]
        }
        if(lowestBuildStatus == "JV" && (buildStatus[i] == 'P' || buildStatus[i] == "None")){
            lowestBuildStatus = buildStatus[i]
        }
        if(lowestBuildStatus == "P" && (buildStatus[i] == "None")){
            lowestBuildStatus = buildStatus[i]
        }
    }
    allNA = true
    for(let i = 0; i < buildStatus.length; i++){
        if(buildStatus[i] != "n/a"){
            allNA = false
        }
    }
    if(allNA){
        lowestBuildStatus = "n/a"
    }

    return [lowestBuildStatus, lowestStatus]
}