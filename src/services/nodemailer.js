// const nodemailer = require("nodemailer");
// const { prototype } = require("nodemailer/lib/dkim");

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   secure: true,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// });

// const send = (to, subject, body) => {
//   transporter.sendMail({
//     from: process.env.MAIL_FROM,
//     to,
//     subject,
//     // text: body
//     html: body,
//   });
// };

// //

// module.exports = send;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true, // SSL/TLS ativado
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const send = async (to, subject, body) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.MAIL_USER, // Fallback para MAIL_USER
      to,
      subject,
      html: body,
    });

    console.log("E-mail enviado com sucesso:", info.messageId);
    return info; // Retorna detalhes do envio
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw new Error("Falha no envio do e-mail: " + error.message);
  }
};

module.exports = send;
