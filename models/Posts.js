

const db = require("./db");

const Post = db.sequelize.define(
  "emails",
  {
    recipient: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    subject: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: db.Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);


// Post.sync({ alter: true })
//   .then(() => {
//     console.log("Tabela de emails criada com sucesso.");
//   })
//   .catch((erro) => {
//     console.error("Erro ao criar a tabela de emails:", erro);
//   });

module.exports = Post;
