// const { sendMail } = require("../controllers/mail"); // Importa a função de envio de e-mail
// const Post = require("../../models/Posts");
// const sanitizeHtml = require("sanitize-html");


// const sendEmailAndSavePost = async (recipient, subject, body, res) => {
//   if (!recipient || !subject || !body) {
//     console.log("Campos obrigatórios ausentes:", { recipient, subject, body });
//     return res.status(400).json({ error: "Campos obrigatórios ausentes" });
//   }

//   try {

//     console.log("Criando post no banco com os seguintes dados:", {
//       recipient,
//       subject,
//       body,
//     });

//     await Post.create({ recipient, subject, body });


//     const emailData = { recipient, subject, body };
//     console.log("Enviando e-mail com os seguintes dados:", emailData);

//     await sendMail(emailData);


//     res.json({
//       message: "E-mail enviado com sucesso",
//       redirectTo: "/",
//     });
//   } catch (error) {
//     console.error("Erro ao enviar o e-mail:", error);
//     res.status(500).json({
//       error: "Erro ao enviar o e-mail",
//       details: error.message,
//     });
//   }
// };


// module.exports = { sendEmailAndSavePost };

// services/emailService.js

const sanitizeHtml = require("sanitize-html");
const { sendMail } = require("../controllers/mail");
const Post = require("../../models/Posts");

const sendEmailAndSavePost = async (recipient, subject, body) => {
  if (!recipient || !subject || !body) {
    throw new Error("Campos obrigatórios ausentes");
  }

  try {
    await Post.create({ recipient, subject, body });
    await sendMail({ recipient, subject, body });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Erro ao enviar e-mail",
    };
  }
};

module.exports = { sendEmailAndSavePost };
