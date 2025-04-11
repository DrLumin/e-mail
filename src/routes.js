const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Post = require("../models/Posts");
const { sendEmailAndSavePost } = require('./controllers/emailService');
const { ArrayEmail } = require("./controllers/emailService");
const { listar } = require("./controllers/listar");




const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

//////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/consulta", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "consulta.html"));
});

app.get("/sair", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/email", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "envEmail.html"));
});

app.get("/campanha", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "campanha.html"));
})

////////////////////////////API//////////////////////////////

app.post("/enviar", async (req, res) => {
  const { recipient, subject, body } = req.body;
  await sendEmailAndSavePost(recipient, subject, body, res);
});


app.get("/listar", listar);

module.exports = app;
