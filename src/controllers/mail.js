const send = require("../services/nodemailer");

const sendMail = async (emailData) => {
  const { recipient, subject, body } = emailData;



  try {

    await send(recipient, subject, body); // 
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
    throw error;
  }
};

module.exports = {
  sendMail,
};

