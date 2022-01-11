const config = require("./config/index");
const path = require("path");
const express = require("express");
const initApp = require("./loaders/index");

function loadPublicFiles(app) {
  app.use(express.static(__dirname + "/public")); //LOad the static files onto express

  app.get("/", function (req, res) {
    res.status(200).sendFile(path.join(__dirname, "./public", "index.html")); //When we hit localhost:3005/ return index html
  });
}

let app = express();
app = initApp(app);
loadPublicFiles(app);
const port = config.port || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
