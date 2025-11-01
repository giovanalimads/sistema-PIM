const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql/msnodesqlv8"); // driver para Windows Authentication
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 Configuração do banco
const dbConfig = {
  server: 'localhost', // instância padrão
  database: 'suporteDB',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true // Windows Authentication
  }
};

// 🔌 Testar conexão
sql.connect(dbConfig)
  .then(pool => {
    if (pool.connected) console.log("✅ Conectado ao SQL Server (suporteDB)");
  })
  .catch(err => console.error("❌ Erro na conexão:", err));

// 🧍‍♂️ Cadastro de usuário
app.post("/cadastro", async (req, res) => {
  const { nome, cpf, telefone, endereco, email, senha, tipo } = req.body;

  try {
    const pool = await sql.connect(dbConfig);

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.request()
      .input('nome', sql.NVarChar, nome)
      .input('cpf', sql.NVarChar, cpf)
      .input('telefone', sql.NVarChar, telefone)
      .input('endereco', sql.NVarChar, endereco)
      .input('email', sql.NVarChar, email)
      .input('senha', sql.NVarChar, senhaHash)
      .input('tipo', sql.NVarChar, tipo || "usuario")
      .query(`
        INSERT INTO usuarios (nome, cpf, telefone, endereco, email, senha, tipo)
        VALUES (@nome, @cpf, @telefone, @endereco, @email, @senha, @tipo)
      `);

    res.status(200).send({ message: "✅ Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erro ao cadastrar usuário." });
  }
});

// 🔐 Login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query(`SELECT * FROM usuarios WHERE email = @email`);

    const usuario = result.recordset[0];
    if (!usuario) return res.status(404).send({ error: "Usuário não encontrado." });

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).send({ error: "Senha incorreta." });

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

// 📋 Listar chamados
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

// 🆕 Abrir novo chamado
app.post("/chamados", async (req, res) => {
  const { protocolo, titulo, categoria, urgencia, descricao, id_usuario } = req.body;

  try {
    const pool = await sql.connect(dbConfig);
    await pool.request()
      .input('protocolo', sql.NVarChar, protocolo)
      .input('titulo', sql.NVarChar, titulo)
      .input('categoria', sql.NVarChar, categoria)
      .input('urgencia', sql.NVarChar, urgencia)
      .input('descricao', sql.NVarChar, descricao)
      .input('id_usuario', sql.Int, id_usuario)
      .query(`
        INSERT INTO chamados (protocolo, titulo, categoria, urgencia, descricao, id_usuario)
        VALUES (@protocolo, @titulo, @categoria, @urgencia, @descricao, @id_usuario)
      `);

    res.send({ message: "✅ Chamado aberto com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Erro ao abrir chamado." });
  }
});

// 🚀 Iniciar servidor
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));