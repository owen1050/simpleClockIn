
var stageText = document.getElementById("stage");
var matchText = document.getElementById("matchNum");
url = "http://villawalsh.happyrobotics.com"
//url ="http://localhost:5000" 
var resetButtonCount = 0;
var intervalId = window.setInterval(function(){
  updateScreen()
}, 250);

var matchNumInterval = window.setInterval(function(){
  getMatchNum()
}, 1000);

var intervalId2 = window.setInterval(function(){
  resetButtonCount = 0;
}, 3000);

var startAudio = new Audio('startMatch.mp3');
var endAlarm = new Audio('endMatch.mp3');

var timeLeft = 0;
var matchTime = 60*2 + 30
var playedEndingSound = false;
var playedStartSound = false;
var nOneCount = 0

function initPage(){
  updateScreen();
}


function updateScreen(){
  getTimeAPI();
  if(timeLeft == -1){
    nOneCount = nOneCount + 1;
    timeLeft = matchTime 
  } else {
    nOneCount = 0
  }
  disp = matchTime - timeLeft
  if(disp > -4 && disp <= 0 && playedEndingSound == false){
    endAlarm.play()
    playedEndingSound = true

  }
  if(disp > (matchTime - 3) && playedStartSound == false){
    startAudio.play()
    playedStartSound = true
    playedEndingSound = false;
    setTimeout(function(){playedStartSound = false},5000);
    
  }
  console.log(disp)
  if(disp < -5){
    disp = matchTime
  }else if(disp < 0){
    disp = 0
  }

  if(nOneCount > 35){
    disp = matchTime
  }

  var min = Math.floor(disp / 60)
  var sec = disp % 60
  if(sec < 10){
    sec = "0" + sec
  }
  stageText.innerText =  min + ":" + sec;
  
}



function startMatchAPI(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/startMatch", false);
    xhr.send();
}

function resetMatchTimeAPI(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/resetMatchTime", false);
    xhr.send();
}

function getTimeAPI(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/getMatchTime", false);
    xhr.send();
    const data = (xhr.response);

    timeLeft = data
    
    console.log(data);
}

function getMatchNum(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/getMatchNum", false);
    xhr.send();
    const data = (xhr.response);
    matchText.innerText  = "Match: " + data
    return data
}

function matchNumAddOne(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/addOneMatchNum", false);
    xhr.send();

}

function matchNumSubOne(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "/api/subOneMatchNum", false);
    xhr.send();

}




