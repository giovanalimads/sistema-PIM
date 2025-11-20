// status: conectado ao banco

const express = require('express');
const { sql, poolPromise } = require('./db'); // importa a conexão centralizada
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// ROTA DE CADASTRO PARA CLIENTE
app.post("/cadastro/cliente", async (req, res) => {

    const { nome, cpf, telefone, endereco, email, senha } = req.body;

    if (!nome || !cpf || !telefone || !email || !senha) {
        return res.status(400).send("Dados obrigatórios faltando para o Cliente");
    }

    const tipoUsuario = "cliente";

    try {
        const pool = await poolPromise;

        await pool.request()
            .input("nome", sql.VarChar, nome)
            .input("cpf", sql.VarChar, cpf)
            .input("telefone", sql.VarChar, telefone)
            .input("endereco", sql.VarChar, endereco)
            .input("email", sql.VarChar, email)
            .input("senha", sql.VarChar, senha)
            .input("tipo", sql.VarChar, tipoUsuario)
            .query(`
                INSERT INTO usuarios (nome, cpf, telefone, endereco, email, senha, tipo)
                VALUES (@nome, @cpf, @telefone, @endereco, @email, @senha, @tipo)
            `);

        res.send("✅ Cliente cadastrado com sucesso!");

    } catch (err) {
        console.error("Erro no cadastro de cliente:", err);

        res.status(500).send("Erro ao cadastrar Cliente: " + err);
    }
});

// ROTA DE CADASTRO PARA TÉCNICO
app.post("/cadastro/tecnico", async (req, res) => {
    const { nome, cpf, telefone, endereco, email, senha, especializacao, nivel_experiencia, email_corporativo } = req.body;
    // Poderia adicionar validações específicas para 'tecnico', como 'especialidade'
    
    if (!nome || !cpf || !telefone || !especializacao || !nivel_experiencia || !email_corporativo || !senha) {
        return res.status(400).send("Dados obrigatórios faltando para o Técnico.");
    }
    
    const tipoUsuario = "tecnico";
    
    try {
        const pool = await poolPromise;

        await pool.request()
            .input("nome", sql.VarChar, nome)
            .input("cpf", sql.VarChar, cpf)
            .input("telefone", sql.VarChar, telefone)
            .input("especializacao", sql.VarChar, especializacao)
            .input("nivel_experiencia", sql.VarChar, nivel_experiencia)
            .input("email_corporativo", sql.VarChar, email_corporativo)
            .input("senha", sql.VarChar, senha)
            .input("tipo", sql.VarChar, tipoUsuario)
            .query(`
                INSERT INTO usuarios
                (nome, cpf, telefone, especializacao, nivel_experiencia, email_corporativo, senha, tipo)
                VALUES 
                (@nome, @cpf, @telefone, @especializacao, @nivel_experiencia, @email_corporativo, @senha, @tipo)
            `);

        res.send("✅ Técnico cadastrado com sucesso!");

    } catch (err) {
        console.error("Erro no cadastro do técnico:", err);
        res.status(500).send("Erro ao cadastrar técnico.");
    }
});

app.post("/cadastro/admin", async (req, res) => {

    const { nome, cpf, telefone, senha, email_corporativo } = req.body;

    if (!nome || !cpf || !telefone || !email_corporativo || !senha) {
        return res.status(400).send("Dados obrigatórios faltando para Administrador.");
    }

    const tipoUsuario = "administrador";

    try {
        const pool = await poolPromise;

        await pool.request()
            .input("nome", sql.VarChar, nome)
            .input("cpf", sql.VarChar, cpf)
            .input("telefone", sql.VarChar, telefone)
            .input("email_corporativo", sql.VarChar, email_corporativo)
            .input("senha", sql.VarChar, senha)
            .input("tipo", sql.VarChar, tipoUsuario)
            .query(`
                INSERT INTO usuarios
                (nome, cpf, email_corporativo, senha, tipo)
                VALUES 
                (@nome, @cpf, @telefone, @email_corporativo, @senha, @tipo)
            `);

        res.send("✅ Administrador cadastrado com sucesso!");

    } catch (err) {
        console.error("Erro no cadastro do administrador:", err);
        res.status(500).send("Erro ao cadastrar administrador.");
    }
});

// SERVIDOR
app.listen(3000, () => {
    console.log("🚀 Servidor rodando em http://localhost:3000");
});