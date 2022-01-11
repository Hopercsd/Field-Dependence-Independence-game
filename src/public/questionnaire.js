function disableBack() { window.history.forward(); }
        setTimeout("disableBack()", 0);
        window.onunload = function () { null };

const usersScoreLeaderboard = document.getElementById("usersScoreNum");
const top1Score = document.getElementById("top1Score");
const top2Score = document.getElementById("top2Score");
const top3Score = document.getElementById("top3Score");
const top4Score = document.getElementById("top4Score");
const top5Score = document.getElementById("top5Score");
showLeaderboard()

async function fetchQuestions(){
    if (document.querySelectorAll('input[type="radio"]:checked').length === 0){
      alert("Συμπλήρωσε όλα τα πεδία");
      return
    }
    const age = document.getElementById("age").value;
    if(age<=10){
      alert("Συμπλήρωσε σωστά την ηλικία σου");
      return
    }
    const sex = document.querySelector('input[name="q2"]:checked').value;
    const q1 = document.querySelector('input[name="q3"]:checked').value;
    const q2 = document.querySelector('input[name="q4"]:checked').value;
    const q3 = document.querySelector('input[name="q5"]:checked').value;
    const q4 = document.querySelector('input[name="q6"]:checked').value;
    let cookie = document.cookie;
    if(!cookie){
        return;
      }
    cookie = cookie.split(";")[0];
    cookie = cookie.split("=")[1];
    await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userID: cookie,
            sex: sex,
            age: age,
            q1: q1,
            q2: q2,
            q3: q3,
            q4: q4,
        }),
      });
    window.location.replace("hftIntro.html");
}

  async function showLeaderboard() {
    let cookie = document.cookie;
    if(cookie){
      cookie = cookie.split("session=")[1];
      if (cookie.split(";")){
        cookie = cookie.split(";")[0];
      }
    }
    if(!cookie){
      return;
    }
    await fetch(`/api/users/${cookie}`, {
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
        usersScoreLeaderboard.innerHTML ="Your Score                       " + scoreFromBase;
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
      // terminateUser();
  }

  async function terminateUser(){
    let cookie = document.cookie;
    if(cookie){
      cookie = cookie.split("session=")[1];
      if (cookie.split(";")){
        cookie = cookie.split(";")[0];
      }
    }
    if(!cookie){
      return;
    }
    await fetch(`/api/users/${cookie}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        totalScore = response.User.totalScore;
        email = response.User.email;
        aem = response.User.aem;
        attemptsLeft = response.User.attemptsLeft;
        easyTriesLeft = response.User.easyTriesLeft;
        normalTriesLeft = response.User.normalTriesLeft;
        hardTriesLeft = response.User.hardTriesLeft;
        fetch(`/api/users/${cookie}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalScore: totalScore,
            email: email,
            aem: aem,
            attemptsLeft: -10,
            easyTriesLeft: easyTriesLeft,
            normalTriesLeft: normalTriesLeft,
            hardTriesLeft: hardTriesLeft
          }),
        })
          .then((response) => response.json())
          .then((response) => {
          });
      });
  }