CREATE DATABASE suporteDB;
GO

USE suporteDB;
GO

CREATE TABLE usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    endereco TEXT,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL,
    especializacao VARCHAR(50),   -- Para técnicos
    nivel_experiencia VARCHAR(20), -- Para técnicos
    email_corporativo VARCHAR(50), -- Para técnicos
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('usuario', 'tecnico', 'administrador')) DEFAULT 'usuario'
);
GO

INSERT INTO usuarios (nome, cpf, telefone, endereco, email, senha, tipo)
VALUES
('Administrador', '00000000000', '00000000000', 'Endereço Admin', 'admin@email.com', 'admin123', 'administrador');
GO

CREATE TABLE chamados (
    id INT IDENTITY(1,1) PRIMARY KEY,
    protocolo VARCHAR(50) NOT NULL UNIQUE,
    titulo VARCHAR(30) NOT NULL,
    categoria VARCHAR(40) NOT NULL CHECK (categoria IN ('Sistemas e Maquininhas', 'Equipamentos', 'Redes e Internet', 'Impressoras e Periféricos', 'Instalação/Atualização')),
    urgencia VARCHAR(10) NOT NULL CHECK (urgencia IN ('baixa', 'média', 'alta')),
    descricao TEXT NOT NULL,
    anexos TEXT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('aberto', 'em andamento', 'finalizado')) DEFAULT 'aberto',
    id_usuario INT NOT NULL,
    id_tecnico INT,
    data_criacao DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_chamados_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    CONSTRAINT FK_chamados_tecnico FOREIGN KEY (id_tecnico) REFERENCES usuarios(id)
);
GO

CREATE TABLE historico_chamados (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_chamado INT NOT NULL,
    id_usuario INT NOT NULL,
    acao TEXT NOT NULL,
    data_acao DATETIME DEFAULT GETDATE(),
    anexos TEXT,
    CONSTRAINT FK_historico_chamados FOREIGN KEY (id_chamado) REFERENCES chamados(id),
    CONSTRAINT FK_historico_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
GO

CREATE TABLE avaliacoes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    id_chamado INT NOT NULL,
    protocolo VARCHAR(50) NOT NULL,
    id_usuario INT NOT NULL,
    descricao TEXT,
    nota VARCHAR(20) CHECK (nota IN ('muito satisfeito', 'satisfeito', 'insatisfeito', 'muito insatisfeito')),
    data_avaliacao DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_avaliacoes_chamados FOREIGN KEY (id_chamado) REFERENCES chamados(id),
    CONSTRAINT FK_avaliacoes_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);
GO

-- Trigger para proteger administrador fixo
CREATE TRIGGER before_delete_usuario
ON usuarios
INSTEAD OF DELETE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM deleted WHERE id = 1)
    BEGIN
        RAISERROR ('O administrador fixo não pode ser excluído.', 16, 1);
        ROLLBACK;
    END
    ELSE
    BEGIN
        DELETE FROM usuarios WHERE id IN (SELECT id FROM deleted);
    END
END;
GO