//url = "http://villawalsh.happyrobotics.com:3600"
url = "http://localhost:5000"

const id = new URLSearchParams(window.location.search).get('id')
let signIns = getUserTimes(id)
let categories = getAllCategories()

let catToColMap = new Map();
catToColMap.set(0,8);
catToColMap.set(2,1);
catToColMap.set(3,2);
catToColMap.set(4,3);
catToColMap.set(5,4);
catToColMap.set(7,5);
catToColMap.set(8,6);
catToColMap.set(9,7);

catTable = document.getElementById("categoryTableID")
cols = catTable.rows[0].cells.length

newRow = catTable.insertRow(catTable.rows.length)
for(let i = 0; i < cols; i++){
	newRow.insertCell(i).innerHTML = i;
}


for(let row = 0; row < categories.length; row++){
    newRow = catTable.insertRow(catTable.rows.length);
    for(let col = 0; col < 11; col++){
        if(col == 1){
            newRow.insertCell(col).innerHTML = "nTc";
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







function getUserTimes(idi){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/getUserTimes?id=" + idi, false);
    xhr.send();
    const data = xhr.response;
    console.log(data);
    ret = parseInt(data);
    return ret
}

function getAllCategories(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/getAllCategories", false);
    xhr.send();
    const data = JSON.parse(xhr.response);
    console.log(data);
    return data
}