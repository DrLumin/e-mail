require("dotenv").config({ path: "../.env" });


const { Sequelize } = require("sequelize");


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


(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao conectar-se ao banco de dados:", error);
  }
})();

module.exports = { Sequelize, sequelize };
