-- Apagar o banco de dados se já existir e criar um novo
DROP DATABASE IF EXISTS GateWatch;
CREATE DATABASE GateWatch;
USE GateWatch;

-- Criação da tabela Aeroporto
CREATE TABLE Aeroporto(
    idAeroporto INT PRIMARY KEY AUTO_INCREMENT,
    nome_aero VARCHAR(45) NOT NULL,
    codigo_icao VARCHAR(4) NOT NULL,
    codigo_iata VARCHAR(3)
);

-- Criação da tabela Companhia
CREATE TABLE Companhia(
    idCompanhia INT PRIMARY KEY AUTO_INCREMENT,
    nome_fantasia VARCHAR(45) NOT NULL,
    razao_social VARCHAR(45) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    codigo_icao VARCHAR(4) NOT NULL,
    codigo_iata VARCHAR(3),
    email_comp VARCHAR(45) NOT NULL,
    telefone_comp VARCHAR(11) NOT NULL,
    chave_seguranca_analista VARCHAR(45) NOT NULL,
    chave_seguranca_gerente VARCHAR(45) NOT NULL
);

select * from Companhia;

-- Criação da tabela Operacao
CREATE TABLE Operacao (
    idOperacao INT AUTO_INCREMENT,
    fkAeroporto INT,
    fkCompanhia INT,
    PRIMARY KEY(idOperacao, fkAeroporto, fkCompanhia),
    FOREIGN KEY(fkAeroporto) REFERENCES Aeroporto(idAeroporto),
    FOREIGN KEY(fkCompanhia) REFERENCES Companhia(idCompanhia)
);

-- Criação da tabela Funcionario
CREATE TABLE Funcionario(
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    cargo VARCHAR(45) NOT NULL,
    email VARCHAR(200) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    fkCompanhia INT,
    FOREIGN KEY(fkCompanhia) REFERENCES Companhia(idCompanhia),
    CONSTRAINT chkCargo CHECK(cargo IN('Gerente', 'Analista'))
);

select * from Funcionario;

-- Criação da tabela Totem
CREATE TABLE Totem(
	idTotem int primary key auto_increment,
    nome_totem varchar(100),
    codigo_serie varchar(100),
    fabricante varchar(100),
    ano_totem varchar(100),
    fkCompanhia INT,
    FOREIGN KEY(fkCompanhia) REFERENCES Companhia(idCompanhia)
);


-- Criação da tabela Monitoramento
CREATE TABLE Monitoramento(
    idMonitoramento INT AUTO_INCREMENT, 
    fkFuncionario INT,
    fkTotem INT,
    PRIMARY KEY(idMonitoramento, fkFuncionario, fkTotem),
    dtHora_inicio DATETIME,
    dtHora_fim DATETIME,
    FOREIGN KEY(fkFuncionario) REFERENCES Funcionario(idFuncionario),
    FOREIGN KEY(fkTotem) REFERENCES Totem(codigo_serie)
);

-- Criação da tabela Desempenho
CREATE TABLE Desempenho(
    idDesempenho INT AUTO_INCREMENT,
    cpu_usage DOUBLE,
    cpu_freq DOUBLE,
    memory_usage DOUBLE,
    memory_total DOUBLE,
    memory_perc DOUBLE,
    disk_usage DOUBLE,
    disk_total DOUBLE,
    disk_perc DOUBLE,
    dtHora DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    fkTotem INT,
    PRIMARY KEY (idDesempenho, fkTotem),
    FOREIGN KEY (fkTotem) REFERENCES Totem(codigo_serie)
);

-- Criação da tabela alertas
CREATE TABLE Alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    dtAlerta DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    componente VARCHAR(45),
    medida DOUBLE,
    statusTotem varchar(45),
    fkTotem int,
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem),
    CONSTRAINT chkComponente CHECK(componente IN('cpu', 'memoria', 'disco'))
);

select * from Alerta;

CREATE TABLE processo (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    pId INT,                            
    nomeProcesso VARCHAR(45),
    cpu_percent DECIMAL(5,2),
    memory_mb DECIMAL(10,2),
    disk_mb DECIMAL(10,2),
    dataProcesso DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    fkTotem INT,
    FOREIGN KEY (fkTotem) REFERENCES Totem(codigo_serie)
);

select * from Processos where cpu_percent > 0;

select * from Processos;

truncate table Processos;

-- Inserção de dados na tabela Companhia
INSERT INTO Companhia VALUES (DEFAULT, 'Azul', 'AZUL LINHAS AEREAS BRASILEIRAS S.A.', '12345678910111', 'AZU', 'AD', 'azul@azulairlines.com', '11989898989', '1A2B3C4D5E', 'A1B2C3D4E5');

-- Inserção de dados na tabela Aeroporto
INSERT INTO Aeroporto VALUES 
    (DEFAULT, 'Aeroporto Internacional de Guarulhos', 'SBGR', 'GRU'),
    (DEFAULT, 'Aeroporto de São Paulo/Congonhas', 'SBSP', 'CGH');

-- Inserção de dados na tabela Operacao
INSERT INTO Operacao VALUES(DEFAULT, 1, 1), (DEFAULT, 2, 1);

-- Inserção de dados na tabela Totem
INSERT INTO Totem VALUES
    (1, true, 'Modelo A', 1),
    (2, true, 'Modelo B', 1),
    (3, true, 'Modelo C', 1);
