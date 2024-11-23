
var stageText = document.getElementById("stage");

url = "http://villawalsh.happyrobotics.com"
var resetButtonCount = 0;
var intervalId = window.setInterval(function(){
  updateScreen()
}, 250);

var intervalId2 = window.setInterval(function(){
  resetButtonCount = 0;
}, 3000);

var startAudio = new Audio('startMatch.mp3');
var endAlarm = new Audio('endMatch.mp3');

var timeLeft = 0;
var matchTime = 60*2 + 30
var playedEndingSound = false;
var playedStartSound = false;

function initPage(){
  updateScreen();
}


function updateScreen(){
  getTimeAPI();
  if(timeLeft == -1){
    timeLeft = matchTime 
  }
  disp = matchTime - timeLeft
  if(disp > -4 && disp <= 0 && playedEndingSound == false){
    endAlarm.play()
    playedEndingSound = true
    setTimeout(function(){playedEndingSound = false},5000);

  }
  if(disp > (matchTime - 3) && playedStartSound == false){
    startAudio.play()
    playedStartSound = true
    setTimeout(function(){playedStartSound = false},5000);
    
  }
  console.log(disp)
  if(disp < -5){
    disp = matchTime
  }else if(disp < 0){
    disp = 0
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