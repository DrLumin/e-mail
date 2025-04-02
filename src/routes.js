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

app.get("/agendamento", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "agendar.html"));
});

////////////////////////////API//////////////////////////////

app.post("/enviar", async (req, res) => {
  const { recipient, subject, body } = req.body;
  await sendEmailAndSavePost(recipient, subject, body, res);
});

app.post("/agendar", (req, res) => {
  const { schedule } = req.body; // Recebe o padrão de tempo do body

  if (!schedule || !cron.validate(schedule)) {
    return res.status(400).json({ error: "Formato de cron inválido" });
  }

  // Se já existir um agendamento, cancela antes de criar outro
  if (agendamento) {
    agendamento.stop();
  }

  agendamento = cron.schedule(schedule, () => {
    console.log(`Tarefa executada no cron: ${schedule}`);
  });

  agendamento.start();
  res.json({ message: `Tarefa agendada para ${schedule}` });
});

app.get("/listar", listar);

module.exports = app;
