const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const dbConfig = require("./dbConfig");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔌 Testar conexão
sql.connect(dbConfig)
  .then(pool => {
    if (pool.connected) console.log("✅ Conectado ao SQL Server (suporteDB)");
  })
  .catch(err => console.error("❌ Erro na conexão:", err));

// 🧍‍♂️ Rota de cadastro de usuário
app.post("/cadastro", async (req, res) => {
  const { nome, cpf, telefone, endereco, email, senha, tipo } = req.body;

  try {
    const pool = await sql.connect(dbConfig);

    // Criptografa a senha antes de salvar
    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.request().query(`
      INSERT INTO usuarios (nome, cpf, telefone, endereco, email, senha, tipo)
      VALUES ('${nome}', '${cpf}', '${telefone}', '${endereco}', '${email}', '${senhaHash}', '${tipo || "usuario"}')
    `);

    res.status(200).send({ message: "✅ Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erro ao cadastrar usuário." });
  }
});

// 🔐 Rota de login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT * FROM usuarios WHERE email = '${email}'
    `);

    const usuario = result.recordset[0];
    if (!usuario) {
      return res.status(404).send({ error: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).send({ error: "Senha incorreta." });
    }

    res.send({
      message: "✅ Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        tipo: usuario.tipo,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erro no login." });
  }
});

// 📋 Rota para listar chamados
app.get("/chamados", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`
      SELECT c.*, u.nome AS nome_usuario
      FROM chamados c
      JOIN usuarios u ON c.id_usuario = u.id
      ORDER BY c.data_criacao DESC
    `);
    res.send(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erro ao buscar chamados." });
  }
});

// 🆕 Rota para abrir um novo chamado
app.post("/chamados", async (req, res) => {
  const { protocolo, titulo, categoria, urgencia, descricao, id_usuario } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    await pool.request().query(`
      INSERT INTO chamados (protocolo, titulo, categoria, urgencia, descricao, id_usuario)
      VALUES ('${protocolo}', '${titulo}', '${categoria}', '${urgencia}', '${descricao}', ${id_usuario})
    `);
    res.send({ message: "✅ Chamado aberto com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erro ao abrir chamado." });
  }
});

// 🚀 Iniciar servidor
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
