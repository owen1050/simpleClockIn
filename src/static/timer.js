var timerText = document.getElementById("time");
var stageText = document.getElementById("stage");
var intervalId = window.setInterval(function(){
  secondHasPassed()
  updateScreen()

}, 1000);
var audio = new Audio('alarm.mp3');

var stage = 0;
var stageMax = 5;
var stageMin = 0;

var timeLeft = 0;

var isRunning = false;
const stages = [];
stages.push("Team Welcome", "Innovation Project Presentation", "Innovation Project Questions", "Robot Design Explination", "Robot Design Q&A", "Final Share & Feedback");
const stageTimes = [];
stageTimes.push(2*60, 5*60, 5*60, 5*60, 5*60, 8*60);


function initPage(){
  resetTimer();
  isRunning = false;
  updateScreen();
}

function startTimer(){
  isRunning = true;
}

function resetTimer(){

  timeLeft = stageTimes[stage]
  isRunning = false;
  stage = 0;
  updateScreen();

}

function moveOn(){

  stage = stage + 1;
  stageBoundsCheck();
  timeLeft = stageTimes[stage]
  updateScreen();
}

function moveBack(){

  stage = stage - 1;
  stageBoundsCheck();
  timeLeft = stageTimes[stage]
  updateScreen(); 
}


function play(){
  isRunning = true;
  updateScreen();
}

function pause(){
  isRunning = false;
  updateScreen();

}

function stageBoundsCheck(){
  if(stage > stageMax){
    stage = 0
    isRunning = false
  }
  if(stage < stageMin){
    stage = stageMax
  }
}

function updateScreen(){
  var min = Math.floor(timeLeft / 60)
  var sec = timeLeft % 60
  if(sec < 10){
    sec = "0" + sec
  }
  stageText.innerText = stages[stage];
  timerText.innerText = "" + min + ":" + sec;
      
}

function secondHasPassed(){
  if(isRunning){
    timeLeft = timeLeft - 1
  }

  if(timeLeft == 0){
    audio.play();
    moveOn()

  }

}
