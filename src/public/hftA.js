let cookie = document.cookie;
if(cookie){
  cookie = cookie.split("session=")[1];
  if (cookie.split(";")){
    cookie = cookie.split(";")[0];
  }
}

class HFTAnswer {
  constructor(question, value, status) {
    this.question = question;
    this.value = value;
    this.status = status;
  }
}

class Action {
  constructor(description, component_id, time, extra) {
    this.description = description;
    this.component_id = component_id;
    this.time = time;
    this.extra = extra;
  }
}

/* Array that includes all answers */
const answers = [];

/* Array that includes all actions */
const actions = [];




/* Each time a select box changes states, record the action and update the array */
$( ".selFormSessionA" ).change(function() {
    action = new Action("Change status of select box", $(this).attr('id'), Date.now(), $(this).val());
    actions.push(action)

    $( "#givenAnswers" ).text(getFilledSelectBoxes());
});


$( "#btnSubmitSessionA" ).click(function() {
  /* When the key is clicked, create the action and keep it to the array */
  action = new Action("The submit button has been clicked", null, Date.now(), null);
  actions.push(action)

  /* End HFT */
  endHFT();
});

function getHFTAnswers(){
  $(".selFormSessionA").each(function(){
    if ( $(this).val() == $(this).data("id").charAt(0) ){
      status = true;
    } else {
      status = false
    }
    answer = new HFTAnswer($(this).attr('id').replace("selQ",""), $(this).val(), status);
    answers.push(answer);
  });
}

function endHFT(){
  action = new Action("End of HFT session 1", null, Date.now(), null);
  actions.push(action)

  /* Record all answers */
  getHFTAnswers();
  fetchHftSA(actions, answers)
  /* Print answers and actions */
  //console.log(actions)
  //console.log(answers)

  /* Go to the next window */
  window.open("hftSB.html", "_self")
}



jQuery(function ($) {
    /* When the window is loaded, create the action and keep it to the array */
    action = new Action("The window is loaded. HFT session 1 starts", null, Date.now(), null);
    actions.push(action);

    var twelveMinutes = 60 * 12,
        display = $('#time');
    startTimer(twelveMinutes, display);
});


/* Timer for each HFT session */
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
          action = new Action("The time has passed", null, Date.now(), null);
          actions.push(action)
          alert("Ο χρόνος έληξε. Θα μεταφερθείτε στην επόμενη ενότητα")

          endHFT();
          timer = 100;
        }
    }, 1000);
}

function getFilledSelectBoxes(){
  var filledAnswers = 0;
  $(".selFormSessionA").each(function(){
    //console.log($(this).val());
    if ( $(this).val() != null){
      filledAnswers++;
    }
  });
  return filledAnswers;
}

function fetchHftSA(actions, answers) {
  fetch("/api/hftsas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID: cookie,
      version: "A",
      actions: actions,
      answers: answers,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
    });
}