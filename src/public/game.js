function disableBack() { window.history.forward(); }
setTimeout("disableBack()", 0);
window.onunload = function () { null };

const printScore = document.getElementById("numScore");
const printTriesLeft = document.getElementById("triesNum");

const usersScoreLeaderboard = document.getElementById("usersScoreNum");
const top1Score = document.getElementById("top1Score");
const top2Score = document.getElementById("top2Score");
const top3Score = document.getElementById("top3Score");
const top4Score = document.getElementById("top4Score");
const top5Score = document.getElementById("top5Score");

let cookie = document.cookie;
if(cookie){
  cookie = cookie.split("session=")[1];
  if (cookie.split(";")){
    cookie = cookie.split(";")[0];
  }
}


function getUser() {
  if(!cookie){
    return;
  }
  fetch(`/api/users/${cookie}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      scoreFromBase = response.User.totalScore;
      email = response.User.email;
      aem = response.User.aem;
      attemptsLeft = response.User.attemptsLeft;
      easyTriesLeft = response.User.easyTriesLeft;
      normalTriesLeft = response.User.normalTriesLeft;
      hardTriesLeft = response.User.hardTriesLeft;
      printScore.innerHTML = scoreFromBase;
      usersScoreLeaderboard.innerHTML ="Your Score                         " + scoreFromBase;
      printTriesLeft.innerHTML = attemptsLeft;
      if (attemptsLeft == -10) {
        window.open("thanks.html", "_self");
        return;
      }
      if (attemptsLeft <= 0) {
        window.open("questionnaire.html", "_self");
        return;
      }
    });
    fetch(`/api/users/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      top1 = JSON.stringify(response.Users[0]);
      top1 = top1.split(",")[0];
      top1 = top1.split(":")[1];
      top2 = JSON.stringify(response.Users[1]);
      top2 = top2.split(",")[0];
      top2 = top2.split(":")[1];
      top3 = JSON.stringify(response.Users[2]);
      top3 = top3.split(",")[0];
      top3 = top3.split(":")[1];
      top4 = JSON.stringify(response.Users[3]);
      top4 = top4.split(",")[0];
      top4 = top4.split(":")[1];
      top5 = JSON.stringify(response.Users[4]);
      top5 = top5.split(",")[0];
      top5 = top5.split(":")[1];
      top1Score.innerHTML = "First                                  " + top1;
      top2Score.innerHTML = "Second                             " + top2;
      top3Score.innerHTML = "Third                                " + top3;
      top4Score.innerHTML = "Fourth                              " + top4;
      top5Score.innerHTML = "Fifth                                 " + top5;
    });
}

function changeInModes() {
  printScore.style.display = "none";
  printTriesLeft.style.display = "none";
  const printScoreDiv = document.getElementById("firstDiv");
  const printTriesLeftDiv = document.getElementById("firstDiv2");
  const rulesPhaseTwo = document.getElementById("rulesPhaseTwo");
  rulesPhaseTwo.style.marginTop = "3%";
  printScoreDiv.style.display = "none";
  printTriesLeftDiv.style.display = "none";
  var button1 = document.getElementById("easy");
  button1.parentNode.removeChild(button1);
  var button2 = document.getElementById("medium");
  button2.parentNode.removeChild(button2);
  var button3 = document.getElementById("hard");
  button3.parentNode.removeChild(button3);
  var rules = document.getElementById("firstPage");
  rules.parentNode.removeChild(rules);
  var leaderboard = document.getElementById("contain");
  leaderboard.parentNode.removeChild(leaderboard);
  var playButton = document.getElementById("play");
  playButton.style.display = "block";
}

let temp = 0;

function easyMode() {
  var rules2 = document.getElementById("secPageEasy");
  rules2.style.display = "block";
  changeInModes();
  temp = 1;
}

function medMode() {
  var rules2 = document.getElementById("secPageNormal");
  rules2.style.display = "block";
  changeInModes();
  temp = 2;
}

function hardMode() {
  var rules2 = document.getElementById("secPageHard");
  rules2.style.display = "block";
  changeInModes();
  temp = 3;
}

function fetchAttempt(difficulty) {
  fetch("/api/attempts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID: cookie,
      date: new Date(),
      difficulty: difficulty,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
    });
}

function play() {
  removeInfo();
  if(!cookie){
    return;
  }
  fetch(`/api/users/${cookie}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      scoreFromBase = response.User.totalScore;
      name = response.User.name;
      email = response.User.email;
      aem = response.User.aem;
      attemptsLeft = response.User.attemptsLeft;
      easyTriesLeft = response.User.easyTriesLeft;
      normalTriesLeft = response.User.normalTriesLeft;
      hardTriesLeft = response.User.hardTriesLeft;
      let flag = true;
      checkTries(flag);
    });
}

function checkTries(flag) {
  if (temp == 1) {
    if (easyTriesLeft <= 0) {
      flag = false;
      alert("Έχεις παίξει αυτή τη δυσκολία ήδη 2 φορές!");
      window.open("game.html", "_self");
    }
  } else if (temp == 2) {
    if (normalTriesLeft <= 0) {
      flag = false;
      alert("Έχεις παίξει αυτή τη δυσκολία ήδη 2 φορές!");
      window.open("game.html", "_self");
    }
  } else if (temp == 3) {
    if (hardTriesLeft <= 0) {
      flag = false;
      alert("Έχεις παίξει αυτή τη δυσκολία ήδη 2 φορές!");
      window.open("game.html", "_self");
    }
  }
  if (flag) {
    if (temp == 1) {
      window.open("easyOne.html", "_self");
      fetchAttempt("easy");
    } else if (temp == 2) {
      window.open("medium.html", "_self");
      fetchAttempt("normal");
    } else if (temp == 3) {
      window.open("hard.html", "_self");
      fetchAttempt("hard");
    }
  }
}

function removeInfo() {
  var rules = document.getElementById("secPageEasy");
  rules.parentNode.removeChild(rules);
  var rules2 = document.getElementById("secPageNormal");
  rules2.parentNode.removeChild(rules2);
  var rules3 = document.getElementById("secPageHard");
  rules3.parentNode.removeChild(rules3);
  var playButton = document.getElementById("play");
  playButton.parentNode.removeChild(playButton);
}
