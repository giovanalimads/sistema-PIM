const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// CONFIGURAÇÃO SQL SERVER
const config = {
    user: 'sa',
    password: '1234',
    server: 'DESKTOP-1C4NATP',
    database: 'CadastroTesteDB',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Teste de conexão
sql.connect(config)
    .then(() => console.log("✅ Conectado ao SQL Server"))
    .catch(err => console.error("❌ Erro de conexão:", err));

// ROTA DE CADASTRO
app.post("/cadastro", async (req, res) => {
    const { nome, cpf, telefone, endereco, email, senha, tipo } = req.body;

    if (!nome || !cpf || !email || !senha) {
        return res.status(400).send("Dados obrigatórios faltando.");
    }

    try {
        const pool = await sql.connect(config);

        await pool.request()
            .input("nome", sql.VarChar, nome)
            .input("cpf", sql.VarChar, cpf)
            .input("telefone", sql.VarChar, telefone)
            .input("endereco", sql.VarChar, endereco)
            .input("email", sql.VarChar, email)
            .input("senha", sql.VarChar, senha)
            .input("tipo", sql.VarChar, tipo || "usuario")
            .query(`
                INSERT INTO usuarios (nome, cpf, telefone, endereco, email, senha, tipo)
                VALUES (@nome, @cpf, @telefone, @endereco, @email, @senha, @tipo)
            `);

        res.send("✅ Usuário cadastrado com sucesso!");
    } catch (err) {
        console.error("Erro no cadastro:", err);
        res.status(500).send("Erro ao cadastrar: " + err);
    }
});

// SERVER RODA NA PORTA 3000
app.listen(3000, () => {
    console.log("🚀 Servidor rodando em http://localhost:3000");
});