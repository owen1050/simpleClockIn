//url = "http://villawalsh.happyrobotics.com:3600"
url = "http://localhost:5000"

var id = new URLSearchParams(window.location.search).get('id')
let signIns = getUserTimes(id)
let categories = getAllCategories()

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

newRow = catTable.insertRow(catTable.rows.length)
for(let i = 0; i < cols; i++){
	newRow.insertCell(i).innerHTML = i;
}

for(let row = 0; row < categories.length; row++){
    newRow = catTable.insertRow(catTable.rows.length);
    for(let col = 0; col < 11; col++){
        if(col == 1){
            newRow.insertCell(col).innerHTML = Math.round(getHoursInCategory(categories[row][0])/3600 * 100) / 100;
        } else if(col == 6){
            newRow.insertCell(col).innerHTML = "nTc";
        } else if(col == 10){
            newRow.insertCell(col).innerHTML = "nTc";
        }else{
            if(col == 2 || col == 0){
                newRow.insertCell(col).innerHTML = categories[row][catToColMap.get(col)];
            } else {
                newRow.insertCell(col).innerHTML = categories[row][catToColMap.get(col)] * categories[row][catToColMap.get(2)];
            }
            
        }
    }
}


function getHoursInCategory(catId){
    let time = 0;

    for(let i = 0; i < signIns.length; i++){
        if(signIns[i][4] == catId){
            time = time + signIns[i][3];
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
        cleanEvents.push([year, month, day, seconds, catId])
    }
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