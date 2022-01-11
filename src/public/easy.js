function disableBack() { window.history.forward(); }
        setTimeout("disableBack()", 0);
        window.onunload = function () { null };

class Shape {
  constructor(id, btn) {
    this.id = id;
    this.btn = btn;
  }
}

let resultsTable = [];
let reactionsTable = [];
let memorizeShapesTime;
var n = localStorage.getItem("on_load_counter");

const svg = document.getElementById("SVG");

const leftBtn = document.getElementById("left");
const noneBtn = document.getElementById("none");
const rightBtn = document.getElementById("right");
const downBtn = document.getElementById("down");
const upBtn = document.getElementById("up");

let shapes = [];
let shapeOnScreen = null;
let btn = null;
let score = 0;

let scoreFromBase ;
let easyTriesLeft;     
let name;
let email;
let aem;
let attemptsLeft;
let normalTriesLeft;
let hardTriesLeft;

function manipulateDOM() {
  const startBtn = document.getElementById("start1");
  startBtn.parentNode.removeChild(startBtn);
  const circ = document.getElementById("circle");
  circ.style.display = "none";
  const rect = document.getElementById("rect");
  rect.style.display = "none";
  const text3 = document.getElementById("text3");
  text3.style.display = "none";
  const text2 = document.getElementById("text2");
  text2.style.display = "none";
  const text1 = document.getElementById("text1");
  text1.innerHTML = "Κλίκαρε 'LEFT' ή 'RIGHT' ανάλογα, αν αυτό είναι κάποιο απο τα σχήματα σου. Αλλιώς, κλίκαρε 'NONE'.";
  const btns2 = document.getElementById("up-btn");
  btns2.style.display = "block";
  const btns = document.getElementById("two-btns");
  btns.style.display = "block";
  const btns4 = document.getElementById("down-btn");
  btns4.style.display = "block";
  const btn3 = document.getElementById("none-btn");
  btn3.style.display = "block";
  const elipse = document.getElementById("secElipse");
  elipse.style.display = "none";
  const triangle = document.getElementById("secTriangle");
  triangle.style.display = "none";
}

function initShapeArray() {
  let shape1 = new Shape("elipse", "none");
  let shape2 = new Shape("rect2", "right");
  let shape3 = new Shape("triangle", "none");
  let shape4 = new Shape("rhombus", "none");
  let shape5 = new Shape("circle2", "left");
  let shape6 = new Shape("elipse2", "none");
  let shape7 = new Shape("circle3", "none");
  let shape8 = new Shape("triangle3", "none");
  let shape9 = new Shape("circle2", "left");
  let shape10 = new Shape("rect2", "right");
  let shape11 = new Shape("triangle2", "none");
  let shape12 = new Shape("rect4", "none");
  shapes = [
    shape1,
    shape2,
    shape3,
    shape4,
    shape5,
    shape6,
    shape7,
    shape8,
    shape9,
    shape10,
    shape11,
    shape12,
  ];
  return shapes;
}

function initShapeArray2() {
  let shape1 = new Shape("secElipse4", "none");
  let shape2 = new Shape("secRect", "none");
  let shape3 = new Shape("secElipse2", "left");
  let shape4= new Shape("secRhombus", "none");
  let shape5 = new Shape("secTriangle2", "right");
  let shape6 = new Shape("secCircle", "none");
  let shape7 = new Shape("secElipse3", "none");
  let shape8 = new Shape("secCircle2", "none");
  let shape9 = new Shape("secElipse2", "left");
  let shape10 = new Shape("secTriangle3", "none");
  let shape11 = new Shape("secTriangle2", "right");
  let shape12 = new Shape("secRect2", "none");
  shapes = [
    shape1,
    shape2,
    shape3,
    shape4,
    shape5,
    shape6,
    shape7,
    shape8,
    shape9,
    shape10,
    shape11,
    shape12
  ];
  return shapes;
}

function getUser() {
  let cookie = document.cookie;
  if(!cookie){
    return;
  }
  cookie = cookie.split(";")[0];
  cookie = cookie.split("=")[1];
  fetch(`/api/users/${cookie}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
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
    });
}

function patchScoreTries(totalScore){
  let cookie = document.cookie;
  if(!cookie){
    return;
  }
  cookie = cookie.split(";")[0];
  cookie = cookie.split("=")[1];
  fetch(`/api/users/${cookie}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          totalScore: totalScore,
          name: name,
          email: email,
          aem: aem,
          attemptsLeft: attemptsLeft - 1,
          easyTriesLeft: easyTriesLeft - 1,
          normalTriesLeft: normalTriesLeft,
          hardTriesLeft: hardTriesLeft,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
      });
}

function fetchResults(results, reaction, memorize){
  let cookie = document.cookie;
  if(!cookie){
    return;
  }
  cookie = cookie.split(";")[1];
  cookie = cookie.split("=")[1];
  fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          attemptID: cookie,
          reactionTimeTable: reaction,
          successTable: results,
          memorizeShapesTime: memorize,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
      });
}

function getShape() {
  const objectToDestructure = shapes.shift();
  if (!objectToDestructure) {
    if (score < 0) {
      score = 0;
    }
    score = Math.ceil(score * 0.5);
    scoreFromBase = scoreFromBase + score;
    patchScoreTries(scoreFromBase);
    svg.parentNode.removeChild(svg);
    leftBtn.parentNode.removeChild(leftBtn);
    rightBtn.parentNode.removeChild(rightBtn);
    downBtn.parentNode.removeChild(downBtn);
    upBtn.parentNode.removeChild(upBtn);
    noneBtn.parentNode.removeChild(noneBtn);
    const back = document.getElementById("back");
    back.style.display = "block";
    fetchResults(resultsTable, reactionsTable, memorizeShapesTime);
    back.addEventListener("click", () => {
      window.open("game.html", "_self");
    });
    return null;
  }
  const { id, btn } = objectToDestructure;
  const shapeOnScreen = document.getElementById(id);
  shapeOnScreen.style.display = "block";

  createdTime = Date.now();

  return [btn, shapeOnScreen];
}
let successShape = true;

function determineForRightButton(btn, shapeOnScreen) {
  pressed = "right";
  if (pressed === btn) {
    successShape = true;
    score = score + 2;
  } else {
    successShape = false;
    score = score - 2;
  }
  resultsTable.push(successShape)
  return (shapeOnScreen.style.display = "none");
}

function determineForLeftButton(btn, shapeOnScreen) {
  pressed = "left";
  if (pressed === btn) {
    successShape = true;
    score = score + 2;
  } else {
    successShape = false;
    score = score - 2;
  }
  resultsTable.push(successShape)
  return (shapeOnScreen.style.display = "none");
}

function determineForNoneButton(btn, shapeOnScreen) {
  pressed = "none";
  if (pressed === btn) {
    successShape = true;
    score = score + 2;
  } else {
    successShape = false;
    score = score - 2;
  }
  resultsTable.push(successShape)
  return (shapeOnScreen.style.display = "none");
}

function deconstructShape(shape) {
  if (!shape) {
    return null;
  }
  shapeOnScreen = shape[1];
  btn = shape[0];
}

function setUpEventListeners() {
  rightBtn.addEventListener("click", () => {
    reactionOnshape();
    determineForRightButton(btn, shapeOnScreen);
    deconstructShape(getShape());
  });
  leftBtn.addEventListener("click", () => {
    reactionOnshape();
    determineForLeftButton(btn, shapeOnScreen);
    deconstructShape(getShape());
  });
  noneBtn.addEventListener("click", () => {
    reactionOnshape();
    determineForNoneButton(btn, shapeOnScreen);
    deconstructShape(getShape());
  });
}

function reactionOnshape(){
  clickedTime = Date.now();
  reactionTime = (clickedTime-createdTime)/1000;
  reactionsTable.push(reactionTime);
}

function initializeEasy() {
  let cookie = document.cookie;
  if(!cookie){
    return;
  }
  cookie = cookie.split(";")[0];
  cookie = cookie.split("=")[1];
  fetch(`/api/users/${cookie}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((response) => {
      easyTriesLeft = response.User.easyTriesLeft;
    });
  if (easyTriesLeft == 2) {
    manipulateDOM();
    initShapeArray();
  }
  if (easyTriesLeft == 1) {
    manipulateDOM();
    initShapeArray2();
  }
}

function startEasy() {
  clickedStartTime = Date.now();
  memorizeShapesTime = (clickedStartTime-createdTimeShapes)/1000;
  initializeEasy();
  const shape = getShape();
  deconstructShape(shape);
  setUpEventListeners();
}

function timesForEasy() {
  let cookie = document.cookie;
  if(!cookie){
    return;
  }
  cookie = cookie.split(";")[0];
  cookie = cookie.split("=")[1];
  fetch(`/api/users/${cookie}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((response) => {
      easyTriesLeft = response.User.easyTriesLeft;
      if(easyTriesLeft==1){
        const circ = document.getElementById("circle");
        circ.style.display = "none";
        const rect = document.getElementById("rect");
        rect.style.display = "none";
        const elipse = document.getElementById("secElipse");
        elipse.style.display = "block";
        const triangle = document.getElementById("secTriangle");
        triangle.style.display = "block";
      }
    });
}

function playEasy() {
  getUser();
  timesForEasy();
  createdTimeShapes = Date.now();
  const startBtn = document.getElementById("start1");
  startBtn.addEventListener("click", startEasy);
}
