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
	telefone_comp VARCHAR(11) NOT NULL
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
	sobrenome VARCHAR(60) NOT NULL,
	cpf VARCHAR(11) NOT NULL,
	dtNasc DATE NOT NULL,
	cargo VARCHAR(45) NOT NULL,
	email VARCHAR(45) NOT NULL,
	senha VARCHAR(45) NOT NULL,
    fkSupervisor INT,
    fkCompanhia INT,
    FOREIGN KEY(fkSupervisor) REFERENCES Funcionario(idFuncionario),
    FOREIGN KEY(fkCompanhia) REFERENCES Companhia(idCompanhia),
    CONSTRAINT chkCargo CHECK(cargo IN('Supervisor', 'Analista'))
);

CREATE TABLE Maquina(
	idMaquina INT PRIMARY KEY AUTO_INCREMENT,
	status_maq INT NOT NULL,
	modelo_maq VARCHAR(45),
    fkCompanhia INT,
    FOREIGN KEY(fkCompanhia) REFERENCES Companhia(idCompanhia),
    CONSTRAINT chkStatus CHECK(status_maq IN(0, 1))
);

CREATE TABLE Monitoramento(
	idMonitoramento INT AUTO_INCREMENT, 
	fkFuncionario INT,
    fkMaquina INT,
    PRIMARY KEY(idMonitoramento, fkFuncionario, fkMaquina),
    dtHora_inicio DATETIME,
	dtHora_fim DATETIME,
    FOREIGN KEY(fkFuncionario) REFERENCES Funcionario(idFuncionario),
    FOREIGN KEY(fkMaquina) REFERENCES Maquina(idMaquina)
);

CREATE TABLE Desempenho(
	idDesempenho INT AUTO_INCREMENT,
    fkMaquina INT,
    PRIMARY KEY(idDesempenho, fkMaquina),
    cpu INT,
    ram INT, 
    disk INT,
    dtHora DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY(fkMaquina) REFERENCES maquina(idMaquina)
);

INSERT INTO Companhia VALUES (DEFAULT, 'Azul', 'AZUL LINHAS AEREAS BRASILEIRAS S.A.', '12345678910111', 'AZU', 'AD', 'azul@azulairlines.com', '11989898989');

INSERT INTO Aeroporto VALUES 
	(DEFAULT, 'Aeroporto Internacional de Guarulhos', 'SBGR', 'GRU'),
    (DEFAULT, 'Aeroporto de São Paulo/Congonhas', 'SBSP', 'CGH');
    
INSERT INTO Operacao VALUES(DEFAULT, 1, 1), (DEFAULT, 2, 1);

SELECT * FROM Aeroporto;
SELECT * FROM Companhia;
SELECT * FROM Operacao;