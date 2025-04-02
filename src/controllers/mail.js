
const send = require("../services/nodemailer");

const sendMail = async (emailData) => {
  const { recipient, subject, body } = emailData;

  // Exibindo os dados recebidos para depuração
  console.log("Destinatário:", recipient);
  console.log("Assunto:", subject);
  console.log("Corpo do e-mail:", body);

  try {
    // Função send que envia e-mails:
    await send(recipient, subject, body); // Esperando o envio do e-mail
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
    throw error; // Repassando o erro para ser tratado em outra parte do código
  }
};

module.exports = {
  sendMail,
};

