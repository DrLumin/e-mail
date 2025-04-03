// Importação dos módulos necessários
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Post = require("../models/Posts");
const { sendMail } = require("./controllers/mail");
const { listar } = require("./controllers/listar");

const app = express();

// Middleware para processar JSON e dados de formulários
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para servir o arquivo index.html
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

app.get("/email", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "enviarEmail.html"));
});

// Rota para enviar e-mail
app.post("/send", sendMail);

// Rota para enviar e-mail e salvar no banco de dados
app.post("/enviar", (req, res) => {
  const { recipient, subject, body } = req.body;

  // Criação do e-mail no banco de dados
  Post.create({
    recipient: recipient,
    subject: subject,
    body: body,
  })
    .then(async function () {
      try {
        // Criação do objeto emailData
        const emailData = { recipient, subject, body };

        // Envio do e-mail
        await sendMail(emailData);

        res.status(200).send("Envio de E-mail com sucesso");
      } catch (error) {
        res.status(500).send("Erro ao enviar o e-mail: " + error.message);
      }
    })
    .catch(function (erro) {
      res.status(500).send("Houve um erro no envio: " + erro.message);
    });
});

// Rota para listar os dados
app.get("/listar", listar);

// Rota para exibir a página de consulta
app.get("/consulta", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "consulta.html"));
});

// Exportando a aplicação
module.exports = app;
