const send = require("../services/nodemailer");

const sendMail = async (emailData) => {
  const { recipient, subject, body } = emailData;

  // Exibindo os dados recebidos
  // console.log("Destinatário:", recipient);
  // console.log("Assunto:", subject);
  // console.log("Corpo do e-mail:", body);

  try {
    // Função send que envia e-mails:
    send(recipient, subject, body); // Passando os dados do recipient, subject, e body
    //Se tudo ok
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    //Se não
    console.error("Erro ao enviar o e-mail:", error);
    throw error;
  }
};

module.exports = {
  sendMail,
};
