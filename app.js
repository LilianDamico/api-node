const express = require('express');
const cors = require('cors'); 
const db = require("./db/models/index"); 

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

const home = require("./controllers/home");
const cadastros = require("./controllers/cadastros");

app.use('/home', home);
app.use('/cadastros', cadastros);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: 'Ocorreu um erro no servidor. Tente novamente mais tarde.'
  });
});

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    app.listen(8081, () => {
      console.log("Servidor iniciado na porta 8081: http://localhost:8081");
    });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error.message);
    process.exit(1); 
  }
};

startServer();
