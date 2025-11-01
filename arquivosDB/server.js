const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o SQL Server
const dbConfig = {
    server: "localhost",
    database: "SistemaPIM",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Rota para cadastro dos usuários
app.post("/cadastro", async (req, res) => {
    const { nome, cpf, telefone, cep, endereco, bairro, complemento } = req.body;

    try {
        await sql.connect(dbConfig);
        await sql.query`
        INSERT INTO Usuarios (Nome, CPF, Telefone, CEP, Endereco, Bairro, Complemento)
        VALUES (${nome}, ${cpf}, ${telefone}, ${cep}, ${endereco}, ${bairro}, ${complemento})`;
        res.send({ message: "Cadastro realizado com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Erro ao cadastrar usuário." });
    }
});

// Inicia o servidor
app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));