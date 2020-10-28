const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { receiveMessageOnPort } = require("worker_threads");
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //res.send("Hello from the server side!");
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/public/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/styles.css"));
});

app.get("/formsubmissions", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

let dataPath = path.join(__dirname, "../form-submit.json");
app.use(express.static(path.join(__dirname, "../public")));

app.post("/submit", (req, res) => {
  let myObj = {
    email: req.body.email,
  };
  let myJSON = JSON.stringify(myObj);
  fs.writeFile("./form-submit.json", myJSON, function (err) {
    if (err) console.log(err);
  });
});

app.get("/read", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});

app.listen(3000);
