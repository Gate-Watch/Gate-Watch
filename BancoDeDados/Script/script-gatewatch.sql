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
    FOREIGN KEY(fkTotem) REFERENCES Totem(idTotem)
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
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem)
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

CREATE TABLE Processos (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    pId INT,                            
    nomeProcesso VARCHAR(45),
    cpu_percent DECIMAL(5,2),
    memory_mb DECIMAL(10,2),
    disk_mb DECIMAL(10,2),
    dataProcesso DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    fkTotem INT,
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem)
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


DELIMITER //
CREATE PROCEDURE SimularDesempenho2Horas()
BEGIN
    DECLARE dia INT DEFAULT 1;
    DECLARE hora INT DEFAULT 0;
    DECLARE cpu_usage DOUBLE;
    DECLARE cpu_freq DOUBLE;
    DECLARE memory_usage DOUBLE;
    DECLARE memory_total DOUBLE;
    DECLARE memory_perc DOUBLE;
    DECLARE disk_usage DOUBLE;
    DECLARE disk_total DOUBLE;
    DECLARE disk_perc DOUBLE;
    DECLARE fkTotem INT;


    WHILE dia <= 21 DO
        SET hora = 0;
        -- Loop para cada 2 horas do dia
        WHILE hora < 24 DO
            -- Loop para cada fkTotem (1, 2 e 3)
            SET fkTotem = 1;
            WHILE fkTotem <= 3 DO
                -- Gerar valores aleatórios dentro da faixa desejada (50 a 70 para CPU e memória, por exemplo)
                SET cpu_usage = ROUND((RAND() * 20) + 50, 1); -- CPU entre 50 e 70%
                SET cpu_freq = ROUND((RAND() * 1000) + 2500, 1); -- Frequência entre 2500 e 3500 MHz
                SET memory_total = ROUND((RAND() * 8) + 16, 1); -- Memória total entre 16GB e 24GB
                SET memory_usage = ROUND((RAND() * 4) + 12, 1); -- Memória usada entre 12GB e 16GB
                SET memory_perc = ROUND((memory_usage / memory_total) * 100, 1); -- % de memória usada
                SET disk_total = ROUND((RAND() * 100) + 200, 1); -- Disco total entre 200GB e 300GB
                SET disk_usage = ROUND((RAND() * 50) + 100, 1); -- Disco usado entre 100GB e 150GB
                SET disk_perc = ROUND((disk_usage / disk_total) * 100, 1); -- % de disco usado

                -- Inserir os dados na tabela 'Desempenho' com a data/hora correspondente e o fkTotem atual
                INSERT INTO Desempenho (cpu_usage, cpu_freq, memory_usage, memory_total, memory_perc, disk_usage, disk_total, disk_perc, dtHora, fkTotem)
                VALUES (cpu_usage, cpu_freq, memory_usage, memory_total, memory_perc, disk_usage, disk_total, disk_perc, 
                        CONCAT(DATE_FORMAT(CURDATE(), '%Y-%m-'), LPAD(dia, 2, '0'), ' ', LPAD(hora, 2, '0'), ':00:00'), fkTotem);

                -- Incrementar o fkTotem
                SET fkTotem = fkTotem + 1;
            END WHILE;
            -- Incrementar a hora de 2 em 2
            SET hora = hora + 2;
        END WHILE;
        -- Incrementar o dia
        SET dia = dia + 1;
    END WHILE;
END //
DELIMITER ;

CALL SimularDesempenho2Horas();

select * from Desempenho;

SELECT 
    DAYNAME(dtHora) AS dia_semana,
    ROUND(AVG(cpu_usage), 2) AS componente_avg
FROM Desempenho
WHERE WEEK(dtHora) = WEEK(CURDATE())
AND YEAR(dtHora) = YEAR(CURDATE())
AND fkTotem = 1
GROUP BY dia_semana
ORDER BY FIELD(dia_semana, 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');	

# desempenho, monitoramento, operacao, processos totem
select * from desempenho;
select * from totem;
show tables;

select cpu_usage, dtHora from desempenho where fkTotem = 1;
select cpu_usage, dtHora from desempenho where fkTotem = 2;
select cpu_usage, dtHora from desempenho where fkTotem = 3;














select * from Alerta;
select * from movimentacao;

CREATE TABLE movimentacao (
idMovimentacao int primary key auto_increment,
mes varchar(100),
icao varchar(8),
aerodromo varchar(200),
municipio varchar(100),
ano year, 
tipoVoo varchar(100),
totalPassageiros int,
passageirosAzul int,
mesSigla varchar(3),
numMes int
);

drop table movimentacao;

ALTER TABLE movimentacao CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\dadosAgrupadosMesWC.csv'
INTO TABLE movimentacao
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ';' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(mes, icao, aerodromo, municipio, ano, tipoVoo, totalPassageiros, passageirosAzul, mesSigla, numMes);

select * from movimentacao;


SELECT
    mes, 
    passageirosAzul, 
    COUNT(idAlerta) AS quantidadeAlertas
FROM
    movimentacao 
LEFT JOIN
    Alerta 
    ON MONTH(dtAlerta) = numMes AND YEAR(dtAlerta) = ano
GROUP BY
    mes, ano, passageirosAzul, numMes
ORDER BY
    numMes;






