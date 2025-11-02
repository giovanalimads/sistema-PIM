const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do banco SQL Server usando Windows Authentication
const config = {
    user: 'sa',
    password: '1234',
    server: 'DESKTOP-1C4NATP',
    database: 'suporteDB',
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
};

// Teste de conexão ao iniciar o servidor
sql.connect(config)
   .then(() => console.log('✅ Conexão com SQL Server bem-sucedida!'))
   .catch(err => console.error('❌ Erro ao conectar ao SQL Server:', err));

// Rota para cadastrar usuário
app.post('/cadastro', async (req, res) => {
    const { nome, cpf, telefone, endereco, email, senha, tipo } = req.body;

    if (!nome || !cpf || !telefone || !endereco || !email || !senha || !tipo ) {
        return res.status(400).send('Preencha todos os campos!');
    }

    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('nome', sql.NVarChar, nome)
            .input('cpf', sql.NVarChar, cpf)
            .input('telefone', sql.NVarChar, telefone)
            .input('endereco', sql.NVarChar, endereco)
            .input('email', sql.NVarChar, email)
            .input('senha', sql.NVarChar, senha)
            .input('tipo', sql.NVarChar, tipo || "usuario")
            .query('INSERT INTO usuarios (nome, cpf, telefone, endereco, email, senha, tipo) VALUES (@nome, @cpf, @telefone, @endereco, @email, @senha, @tipo)');
        
        res.send('Usuário cadastrado com sucesso!');
    } catch (err) {
        console.error('Erro no cadastro:', err.message);
        res.status(500).send(`Erro ao cadastrar usuário: ${err.message}`);
    }
});

// Inicia o servidor Express na porta 3000
app.listen(3000, () => console.log('🚀 Servidor rodando em http://localhost:3000'));