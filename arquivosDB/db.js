 /**
  *  // cria a conexão
// const sql = require('mssql'); // bilbioteca que permite a comunicação entre servidor e MSSQL

// credenciais e parâmetros que o mssql usará para localizar e autenticar no bd
const config = {
    user: 'sa',
    password:'1234',
    server:'DESKTOP-1C4NATP',
    database: 'suporteDB',
    options: {
        encrypt: false, // não permite criptografia
        trustServerCertificate: true // evita problemas no certificado
    }
};

const poolPromise = sql.connect(config) // configura um Pool de conexões e armazena o resultado da tentativa de conexão
    .then(pool => {
        console.log("Conectado ao SQL Server");
        return pool;
    })
    .catch(err => {
        console.error("Erro de conexão:", err);
        throw err;
    });

// torna as variáveis acessíveis para outros arquivos dentro do node.js
module.exports = {
    sql,
    poolPromise
};
 */
