DROP DATABASE GateWatch;
CREATE DATABASE GateWatch;
USE GateWatch;

CREATE TABLE Aeroporto(
	idAeroporto INT PRIMARY KEY AUTO_INCREMENT,
	nome_aero VARCHAR(45) NOT NULL,
	codigo_icao VARCHAR(4) NOT NULL,
	codigo_iata VARCHAR(3)
);

CREATE TABLE Companhia(
	idCompanhia INT PRIMARY KEY AUTO_INCREMENT,
	nome_fantasia VARCHAR(45) NOT NULL,
	razao_social VARCHAR(45) NOT NULL,
	cnpj VARCHAR(14) NOT NULL,
	codigo_icao VARCHAR(4) NOT NULL,
	codigo_iata VARCHAR(3),
	email_comp VARCHAR(45) NOT NULL,
	telefone_comp VARCHAR(11) NOT NULL,
    chave_seguranca VARCHAR(45) NOT NULL
);

Create Table Operacao (
	idOperacao INT AUTO_INCREMENT,
    fkAeroporto INT,
    fkCompanhia INT,
    PRIMARY KEY(idOperacao, fkAeroporto, fkCompanhia),
	FOREIGN KEY(fkAeroporto) REFERENCES Aeroporto(idAeroporto),
	FOREIGN KEY(fkCompanhia) REFERENCES Companhia(idCompanhia)
);

CREATE TABLE Funcionario(
	idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	cargo VARCHAR(45) NOT NULL,
	email VARCHAR(45) NOT NULL,
	senha VARCHAR(45) NOT NULL,
    fkCompanhia INT,
    FOREIGN KEY(fkCompanhia) REFERENCES Companhia(idCompanhia),
    CONSTRAINT chkCargo CHECK(cargo IN('Gerente', 'Analista'))
);

CREATE TABLE Totem(
	idTotem INT PRIMARY KEY AUTO_INCREMENT,
	status_totem INT NOT NULL,
	modelo_totem VARCHAR(45),
    fkCompanhia INT,
    FOREIGN KEY(fkCompanhia) REFERENCES Companhia(idCompanhia),
    CONSTRAINT chkStatus CHECK(status_totem IN(0, 1))
);

CREATE TABLE Monitoramento(
	idMonitoramento INT AUTO_INCREMENT, 
	fkFuncionario INT,
    fkTotem INT,
    PRIMARY KEY(idMonitoramento, fkFuncionario, fkTotem),
    dtHora_inicio DATETIME,
	dtHora_fim DATETIME,
    FOREIGN KEY(fkFuncionario) REFERENCES Funcionario(idFuncionario),
    FOREIGN KEY(fkTotem) REFERENCES Totem(idTotem)
);

CREATE TABLE Desempenho(
	idDesempenho INT AUTO_INCREMENT PRIMARY KEY,
    cpu_usage DOUBLE,
    cpu_freq DOUBLE,
    memory_usage DOUBLE,
    memory_total DOUBLE,
    memory_perc DOUBLE,
    disk_usage DOUBLE,
    disk_total DOUBLE,
    disk_perc DOUBLE,
    dtHora DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO Companhia VALUES (DEFAULT, 'Azul', 'AZUL LINHAS AEREAS BRASILEIRAS S.A.', '12345678910111', 'AZU', 'AD', 'azul@azulairlines.com', '11989898989', '1A2B3C4D5E');

INSERT INTO Aeroporto VALUES 
	(DEFAULT, 'Aeroporto Internacional de Guarulhos', 'SBGR', 'GRU'),
    (DEFAULT, 'Aeroporto de São Paulo/Congonhas', 'SBSP', 'CGH');
    
INSERT INTO Operacao VALUES(DEFAULT, 1, 1), (DEFAULT, 2, 1);

SELECT * FROM Aeroporto;
SELECT * FROM Companhia;
SELECT * FROM Operacao;