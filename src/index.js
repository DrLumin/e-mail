require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const server = express();

server.use(express.json());
server.use(routes);

// Garante que o servidor rode mesmo se process.env.PORT estiver indefinido
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
