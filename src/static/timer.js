var timerText = document.getElementById("time");
var timer30Text = document.getElementById("time30");
var stageText = document.getElementById("stage");

var resetButtonCount = 0;
var intervalId = window.setInterval(function(){
  secondHasPassed()
  updateScreen()

}, 1000);

var intervalId2 = window.setInterval(function(){
  resetButtonCount = 0;

}, 3000);
var audio = new Audio('alarm.mp3');
var endAlarm = new Audio('end.mp3');

var stage = 0;
var stageMax = 7;
var stageMin = 0;

var timeLeft = 0;

var timeLeft30 = 0;

var isRunning = false;
const stages = [];
stages.push("Team Welcome", "Innovation Project Presentation", "Innovation Project Q&A", "Robot Design Explanation", "Robot Design Q&A", "Final Share & Feedback", "Judge Discussion", "Judge Break");
const stageTimes = [];
stageTimes.push(2*60, 5*60, 5*60, 5*60, 5*60, 8*60, 10*60, 5*60);


function initPage(){
  resetTimer();
  isRunning = false;
  updateScreen();
}

function startTimer(){
  isRunning = true;
}


function resetButtonPressed(){
  resetButtonCount = resetButtonCount + 1
  if(resetButtonCount == 2){
    resetButtonCount = 0;
    resetTimer()
  }
}

function resetTimer(){
  stage = 0;
  timeLeft = stageTimes[stage]
  timeLeft30 = 30*60;
  isRunning = false;  
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
  stageText.innerText = stages[stage] + ": " + min + ":" + sec;
  
  var min30 = Math.floor(timeLeft30 / 60)
  var sec30 = timeLeft30 % 60
  if(sec30 < 10){
    sec30 = "0" + sec30
  }
  timer30Text.innerText = "30 Minute Timer: " + min30 + ":" + sec30;
      
}

function secondHasPassed(){
  if(isRunning){
    timeLeft = timeLeft - 1
    timeLeft30 = timeLeft30 - 1;
  }


  if(timeLeft == 0){
    if(endAlarm.paused){
        audio.play();
    }

    moveOn()

  }

  if(timeLeft30 == 0){
    audio.pause()
    endAlarm.play()
  }


  if(timeLeft30 < 0){
    timeLeft30 = 0;
  }

}
