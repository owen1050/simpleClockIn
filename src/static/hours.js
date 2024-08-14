url = "http://villawalsh.happyrobotics.com:3600"
//url = "http://localhost:5000"

var id = new URLSearchParams(window.location.search).get('id')
var signIns = getUserTimes(id)
var categories = getAllCategories()
let totalHours = 0;

var catToColMap = new Map();
catToColMap.set(0,8);
catToColMap.set(2,1);
catToColMap.set(3,2);
catToColMap.set(4,3);
catToColMap.set(5,4);
catToColMap.set(7,5);
catToColMap.set(8,6);
catToColMap.set(9,7);

var catTable = document.getElementById("categoryTableID")
cols = catTable.rows[0].cells.length
var statusText = document.getElementById("statusText")

var busStatus = []
var buildStatus = []

for(let row = 0; row < categories.length; row++){
    newRow = catTable.insertRow(catTable.rows.length);
    for(let col = 0; col < 11; col++){
        if(col == 0){
            newRow.insertCell(col).innerHTML = categories[row][catToColMap.get(col)];
        }
        if(col == 1){
            newRow.insertCell(col).innerHTML = Math.round(getHoursInCategory(categories[row][0])/3600 * 100) / 100;
            var userHours = Number(Math.round(getHoursInCategory(categories[row][0])/3600 * 100) / 100)
            totalHours = Number(totalHours) + Number(userHours)
        }
        if(col == 2){
            newRow.insertCell(col).innerHTML = categories[row][catToColMap.get(col)];
        }
        if(col == 3){
            newRow.insertCell(col).innerHTML = categories[row][catToColMap.get(col)] * categories[row][catToColMap.get(2)];
            var buildVar = Number(categories[row][catToColMap.get(col)])* categories[row][catToColMap.get(2)];
        }
        if(col == 4){
            newRow.insertCell(col).innerHTML = categories[row][catToColMap.get(col)] * categories[row][catToColMap.get(2)];
            var buildJV = Number(categories[row][catToColMap.get(col)])* categories[row][catToColMap.get(2)];
        }
        if(col == 5){
            newRow.insertCell(col).innerHTML = categories[row][catToColMap.get(col)] * categories[row][catToColMap.get(2)];
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
            newRow.insertCell(col).innerHTML = str; //calulate build status
            buildStatus.push(str)
        }
        if(col == 7){
            var busVar = Number(categories[row][catToColMap.get(col)]) * categories[row][catToColMap.get(2)]
            newRow.insertCell(col).innerHTML = busVar;
            
        }
        if(col == 8){
            newRow.insertCell(col).innerHTML = categories[row][catToColMap.get(col)] * categories[row][catToColMap.get(2)];
            var busJV = Number(categories[row][catToColMap.get(col)]) * categories[row][catToColMap.get(2)]
        }
        if(col == 9){
            newRow.insertCell(col).innerHTML = categories[row][catToColMap.get(col)] * categories[row][catToColMap.get(2)];
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
            newRow.insertCell(col).innerHTML = str; //calulate build status
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

statusText.innerHTML = "Total Hours: " + totalHours + ". Build Varsity Status: " + lowestBuildStatus + ". Business Varsity Status: " + lowestStatus + ".    "

var eventTable = document.getElementById("hoursTableID")
cols = eventTable.rows[0].cells.length

for(let row = 0; row < signIns.length; row++){
    newRow = eventTable.insertRow(eventTable.rows.length);
    
    newRow.insertCell(0).innerHTML = signIns[row][1] + "/" + signIns[row][2] + "/" + signIns[row][0];
    newRow.insertCell(1).innerHTML = Math.round(signIns[row][3]/3600 * 100) / 100;
    newRow.insertCell(2).innerHTML = getCategoryNameFromID(signIns[row][4])
    newRow.insertCell(3).innerHTML = signIns[row][5]
}



function getHoursInCategory(catId){
    let time = 0;

    for(let i = 0; i < signIns.length; i++){
        if(signIns[i][4] == catId){
            time = Number(time) + Number(signIns[i][3]);
        }
    }
    return time
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
        cleanEvents.push([year, month, day, seconds, catId, tmp[5]])
    }
    console.log(cleanEvents)
    return cleanEvents
}

function getAllCategories(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/getAllCategories", false);
    xhr.send();
    const data = JSON.parse(xhr.response);
    console.log(data);
    return data
}

function getCategoryNameFromID(id){
    for(let i = 0; i < categories.length; i++){
        if(categories[i][0] == id){
            return categories[i][8]
        }
    }
}