require("dotenv").config({ path: "../.env" });
//console.log("Process.env:", process.env); // Verifica se as variáveis estão sendo carregadas

const { Sequelize } = require("sequelize");

// Teste se as variáveis foram carregadas corretamente
// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "********" : "NOT SET");
// console.log("DB_NAME:", process.env.DB_NAME);

// Verifica se todas as variáveis de ambiente necessárias estão definidas
if (
  !process.env.DB_NAME ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_HOST
) {
  throw new Error(
    "❌ Erro: Variáveis de ambiente do banco de dados não estão definidas corretamente."
  );
}

// Criação da instância Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Desativa logs de SQL
  }
);
///Conexão com o banco

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao conectar-se ao banco de dados:", error);
  }
})();

module.exports = { Sequelize, sequelize };
