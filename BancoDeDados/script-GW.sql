-- Apagar o banco de dados se já existir e criar um novo
DROP DATABASE IF EXISTS GateWatch;
CREATE DATABASE GateWatch;
USE GateWatch;

-- Criação da tabela Aeroporto
CREATE TABLE Aeroporto(
    idAeroporto INT PRIMARY KEY AUTO_INCREMENT,
    nome_fantasia VARCHAR(45) NOT NULL,
    cnpj VARCHAR(14) NOT NULL
);

-- Criação da tabela Companhia
CREATE TABLE Companhia(
    idCompanhia INT PRIMARY KEY AUTO_INCREMENT,
    nome_fantasia VARCHAR(45) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    email_comp VARCHAR(45) NOT NULL
);


-- Criação da tabela Operacao
CREATE TABLE Operacao (
    idOperacao INT AUTO_INCREMENT,
    fkAeroporto INT,
    fkCompanhia INT,
    chave_seguranca_analista VARCHAR(45) NOT NULL,
    chave_seguranca_gerente VARCHAR(45) NOT NULL,
    PRIMARY KEY(idOperacao, fkAeroporto, fkCompanhia),
    FOREIGN KEY(fkAeroporto) REFERENCES Aeroporto(idAeroporto),
    FOREIGN KEY(fkCompanhia) REFERENCES Companhia(idCompanhia)
);

select * from Operacao;


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

select * from Companhia join Operacao on idCompanhia = fkCompanhia;
select * from Funcionario;

SELECT idCompanhia, 
            CASE 
                WHEN chave_seguranca_analista = '1A2B3C4D5E' THEN 'analista'
                WHEN chave_seguranca_gerente = 'A1B2C3D4E5' THEN 'gerente'
                ELSE null 
            END AS cargo
        FROM Companhia JOIN Operacao on idCompanhia = fkCompanhia
        WHERE chave_seguranca_analista = '1A2B3C4D5E' OR chave_seguranca_gerente = 'A1B2C3D4E5';

-- Criação da tabela Totem
CREATE TABLE Totem(
	idTotem int primary key auto_increment,
    nome_totem varchar(100),
    codigo_serie VARCHAR(100),
    fabricante VARCHAR(100),
    ano YEAR,
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
    idAlerta INT AUTO_INCREMENT,
    dtAlerta DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    componente VARCHAR(45),
    medida DOUBLE,
    statusTotem varchar(45),
    fkTotem int,
    PRIMARY KEY (idAlerta, fkTotem),
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem),
    CONSTRAINT chkComponente CHECK(componente IN('cpu', 'memoria', 'disco'))
);

CREATE TABLE Processos (
    id INT AUTO_INCREMENT, 
    pId INT,                            
    nomeProcesso VARCHAR(45),
    cpu_percent DECIMAL(5,2),
    memory_mb DECIMAL(10,2),
    disk_mb DECIMAL(10,2),
    dataProcesso DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    fkTotem INT,
    PRIMARY KEY (id, fkTotem),
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem)
);

select * from Processos where cpu_percent > 0;

select * from Processos;

truncate table Processos;


-- Inserção de dados na tabela Aeroporto
INSERT INTO Aeroporto VALUES 
    (DEFAULT, 'Aeroporto de São Paulo/Congonhas', '12345678910111'),
    (DEFAULT, 'Aeroporto Internacional de Guarulhos', '11101987654321');

    select * from Aeroporto;
    select * from Companhia;

-- Inserção de dados na tabela Companhia
INSERT INTO Companhia VALUES
	(default, 'Azul', '12345678910123', 'suporte@azul.com'),
	(default, 'Gol', '12345678910124', 'suporte@gol.com');

-- Inserção de dados na tabela Totem
INSERT INTO Totem VALUES
    (default, 'Totem 1', '1234', 'Dell', '2017', 1),
    (default, 'Totem 2', '5678', 'Dell', '2022', 1),
    (default, 'Totem 3', '9123', 'Dell', 2015, 1);

select * from Totem;

select * from Operacao;
    
-- Criar uma procedure para inserir 1000 registros na tabela Processos
DELIMITER $$
CREATE PROCEDURE InserirProcessos()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE nomeProcesso VARCHAR(45);
    DECLARE pId INT;
    DECLARE cpu_percent DECIMAL(5,2);
    DECLARE memory_mb DECIMAL(10,2);
    DECLARE disk_mb DECIMAL(10,2);
    DECLARE fkTotem INT;

    WHILE i <= 1000 DO
        -- Gerar dados aleatórios para os processos
        SET nomeProcesso = CASE FLOOR(1 + (RAND() * 10)) -- Gera um número aleatório entre 1 e 5
            WHEN 1 THEN 'Chrome'
            WHEN 2 THEN 'Python'
            WHEN 3 THEN 'NodeJS'
            WHEN 4 THEN 'Photoshop'
            WHEN 5 THEN 'Opera GX'
            WHEN 6 THEN 'Valorant'
            WHEN 7 THEN 'League Of Legends'
            WHEN 8 THEN 'Microsoft Edge'
            WHEN 9 THEN 'Counter Strike'
            WHEN 10 THEN 'Visual Studio Code'
            ELSE 'Slack' 
        END;
        SET pId = CASE nomeProcesso
            WHEN 'Chrome' THEN 101
            WHEN 'Python' THEN 102
            WHEN 'NodeJS' THEN 103
            WHEN 'Photoshop' THEN 104
            WHEN 'Opera GX' THEN 105
            WHEN 'Valorant' THEN 106
            WHEN 'League Of Legends' THEN 107
            WHEN 'Microsoft Edge' THEN 108
            WHEN 'Counter Strike' THEN 109
            WHEN 'Visual Studio Code' THEN 110
            ELSE 111
        END;

        SET cpu_percent = ROUND((RAND() * 65) + 15, 1); -- CPU entre 15% e 80%
        SET memory_mb = ROUND(((RAND() * 65) + 15) * 1024, 1); -- Memória total entre 15GB e 80GB, convertida para MB
        SET disk_mb = ROUND(((RAND() * 600) + 200) * 1024, 1); -- Disco total entre 200GB e 800GB, convertida para MB

        -- Associar a um Totem aleatório
        SET fkTotem = FLOOR(1 + (RAND() * 3)); -- Gera valores entre 1 e 4

        -- Inserir na tabela
        INSERT INTO Processos (pId, nomeProcesso, cpu_percent, memory_mb, disk_mb, fkTotem)
        VALUES (pId, nomeProcesso, cpu_percent, memory_mb, disk_mb, fkTotem);

        SET i = i + 1;
    END WHILE;
END $$
DELIMITER ;

-- Chamar a procedure para inserir os dados
CALL InserirProcessos();

SELECT nomeProcesso, COUNT(*) AS frequencia
FROM Processos
GROUP BY nomeProcesso
ORDER BY frequencia DESC;

SELECT nomeProcesso, SUM(cpu_percent) AS total_cpu
FROM Processos
GROUP BY nomeProcesso
ORDER BY total_cpu DESC;


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
select * from desempenho;
select * from processos;

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
    movimentacao.mes, 
    movimentacao.passageirosAzul, 
    COUNT(Alerta.idAlerta) AS quantidadeAlertas
FROM
    movimentacao 
LEFT JOIN
    Alerta 
    ON MONTH(Alerta.dtAlerta) = movimentacao.numMes AND YEAR(Alerta.dtAlerta) = movimentacao.ano 
JOIN Totem
	ON idTotem = fkTotem
JOIN Companhia 
	ON idCompanhia = fkCompanhia
WHERE fkCompanhia = 1
GROUP BY
    movimentacao.mes, movimentacao.ano, movimentacao.passageirosAzul, movimentacao.numMes
ORDER BY
    numMes;

select * from Processos;

-- Inserindo na tabela Aeroporto
INSERT INTO Aeroporto (idAeroporto, nome_fantasia, cnpj) VALUES
    (DEFAULT, 'Aeroporto de São Paulo/Congonhas', '12345678910111'),
    (DEFAULT, 'Aeroporto Internacional de Guarulhos', '11101987654321');

-- Inserindo na tabela Companhia
INSERT INTO Companhia (idCompanhia, nome_fantasia, cnpj, email_comp) VALUES
    (DEFAULT, 'Azul', '12345678910123', 'suporte@azul.com'),
    (DEFAULT, 'Gol', '12345678910124', 'suporte@gol.com');

-- Inserindo na tabela Totem
INSERT INTO Totem (idTotem, nome_totem, codigo_serie, fabricante, ano, fkCompanhia) VALUES
    (DEFAULT, 'Totem 1', '1234', 'Dell', 2017, 1),
    (DEFAULT, 'Totem 2', '5678', 'Dell', 2022, 1),
    (DEFAULT, 'Totem 3', '9123', 'HP', 2015, 2);

-- Inserindo na tabela Funcionario
INSERT INTO Funcionario (idFuncionario, nome, cargo, email, senha, fkCompanhia) VALUES
    (DEFAULT, 'João Silva', 'Gerente', 'joao.silva@azul.com', 'senha123', 1),
    (DEFAULT, 'Ana Costa', 'Analista', 'ana.costa@gol.com', 'senha456', 2);

-- Inserindo na tabela Operacao
INSERT INTO Operacao (idOperacao, fkAeroporto, fkCompanhia, chave_seguranca_analista, chave_seguranca_gerente) VALUES
    (DEFAULT, 1, 1, '1A2B3C4D5E', 'A1B2C3D4E5'),
    (DEFAULT, 2, 2, '2B3C4D5E6F', 'B2C3D4E5F6');

-- Inserindo na tabela Desempenho
INSERT INTO Desempenho (idDesempenho, cpu_usage, cpu_freq, memory_usage, memory_total, memory_perc, disk_usage, disk_total, disk_perc, dtHora, fkTotem) VALUES
    (DEFAULT, 65.5, 3200, 12.4, 16.0, 77.5, 150.3, 256.0, 58.7, '2024-12-02 14:00:00', 1),
    (DEFAULT, 70.2, 3100, 10.8, 16.0, 67.5, 140.7, 250.0, 56.3, '2024-12-02 16:00:00', 2);

-- Inserindo na tabela Alerta
INSERT INTO Alerta (idAlerta, dtAlerta, componente, medida, statusTotem, fkTotem) VALUES
    (DEFAULT, '2024-12-01 08:30:00', 'cpu', 85.0, 'ALERTA', 1),
    (DEFAULT, '2024-12-01 09:30:00', 'memoria', 92.0, 'CRÍTICO', 2);

-- Inserindo na tabela Movimentacao
INSERT INTO movimentacao (idMovimentacao, mes, icao, aerodromo, municipio, ano, tipoVoo, totalPassageiros, passageirosAzul, mesSigla, numMes) VALUES
    (DEFAULT, 'Janeiro', 'SBGR', 'Aeroporto Internacional de Guarulhos', 'Guarulhos', 2024, 'Doméstico', 500000, 200000, 'JAN', 1),
    (DEFAULT, 'Fevereiro', 'SBSP', 'Aeroporto de Congonhas', 'São Paulo', 2024, 'Internacional', 300000, 150000, 'FEV', 2);
    
-- Inserindo na tabela Monitoraamento
INSERT INTO Monitoramento (idMonitoramento, fkFuncionario, fkTotem, dtHora_inicio, dtHora_fim) VALUES
    (DEFAULT, 1, 1, '2024-12-01 08:00:00', '2024-12-01 10:00:00'),
    (DEFAULT, 2, 2, '2024-12-01 09:00:00', '2024-12-01 11:00:00');

select * from funcionario;
select * from aeroporto;
select * from operacao;