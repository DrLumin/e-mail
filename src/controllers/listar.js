// Importando o modelo Post
const Post = require("../../models/Posts");

const listar = async (req, res) => {
  try {
    const posts = await Post.findAll(); 
   
    const postsData = posts.map((post) => post.get({ plain: true }));
    res.json(postsData); 
  } catch (error) {
    console.error("Erro ao buscar emails:", error);
    res.status(500).json({ error: "Erro ao buscar emails" });
  }
};

module.exports = { listar };
