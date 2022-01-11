function disableBack() {
  window.history.forward();
}
setTimeout("disableBack()", 0);
window.onunload = function () {
  null;
};

async function goToGame() {
  let email = emailContact.value;
  let aem = aemContact.value;
  if (email == "") {
    alert("Συμπλήρωσε το email σου");
    window.open("index.html", "_self");
  } else if (isNaN(aem)) {
    alert("Το ΑΕΜ πρέπει να είναι αριθμός");
    window.open("index.html", "_self");
  } else {
    await fetchUser(email, aem);
    window.open("game.html", "_self");
  }
}

async function fetchUser(email, aem) {
  await fetch("/api/users", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      aem: aem,
    }),
  })
    .then((response) => response.json())
    .then((response) => {});
}

const nameContact = document.getElementById("nameContact");
const emailContact = document.getElementById("emailContact");
const aemContact = document.getElementById("aemContact");
