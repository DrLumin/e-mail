const Email = require("../models/Posts");
const { sendEmailAndSavePost } = require("../controllers/emailService");

const arrayEmail = []; // Lista de emails
const email = new Email(); // Objeto do tipo Email (modelo)
const enviarEmail = new sendEmailAndSavePost(); // Instância do serviço

const emailsEnviados = [];
const emailsNaoEnviados = [];
const erros = [];

async function ArrayEmail(arrayEmail, email) {
    if (Array.isArray(arrayEmail) && email) {
        for (let i = 0; i < arrayEmail.length; i++) {
            try {
                const resultado = await enviarEmail.post(arrayEmail[i], email);

                if (resultado === true) {
                    emailsEnviados.push(arrayEmail[i]);
                } else {
                    emailsNaoEnviados.push(arrayEmail[i]);
                }
            } catch (err) {
                erros.push({ email: arrayEmail[i], erro: err.message });
            }
        }
    } else {
        console.log("Parâmetros inválidos: arrayEmail precisa ser um array e email não pode ser nulo.");
    }
}
