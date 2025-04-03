const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Post = require("../models/Posts");
const { sendEmailAndSavePost } = require("./controllers/emailService");
const { listar } = require("./controllers/listar");





const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.get("/consulta", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "consulta.html"));
});

app.get("/email", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "envEmail.html"));
});

app.get("/agendar", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "agendar.html"));
})

////////////////////////////API//////////////////////////////

app.post("/enviar", async (req, res) => {
  const { recipient, subject, body } = req.body;
  await sendEmailAndSavePost(recipient, subject, body, res);
});



app.get("/listar", listar);

module.exports = app;
