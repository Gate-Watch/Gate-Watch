DROP DATABASE IF EXISTS GateWatch;
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
    chave_seguranca_analista VARCHAR(45) NOT NULL,
	chave_seguranca_gerente VARCHAR(45) NOT NULL
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
	codigo_serie INT PRIMARY KEY,
	status_totem TINYINT NOT NULL,
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
    FOREIGN KEY(fkTotem) REFERENCES Totem(codigo_serie)
);

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

INSERT INTO Companhia VALUES (DEFAULT, 'Azul', 'AZUL LINHAS AEREAS BRASILEIRAS S.A.', '12345678910111', 'AZU', 'AD', 'azul@azulairlines.com', '11989898989', '1A2B3C4D5E', 'A1B2C3D4E5');

INSERT INTO Aeroporto VALUES 
	(DEFAULT, 'Aeroporto Internacional de Guarulhos', 'SBGR', 'GRU'),
    (DEFAULT, 'Aeroporto de São Paulo/Congonhas', 'SBSP', 'CGH');
    
INSERT INTO Operacao VALUES(DEFAULT, 1, 1), (DEFAULT, 2, 1);

SELECT * FROM Aeroporto;
SELECT * FROM Companhia;
select * from Funcionario;
SELECT * FROM Operacao;
SELECT * FROM Companhia Where nome_fantasia LIKE '%Azul%';
select * from Desempenho;

INSERT INTO Totem VALUES
	(1, true, 'Modelo A', 1),
	(2, true, 'Modelo B', 1),
	(3, true, 'Modelo C', 1);
    
select * from Totem;

DELIMITER //

CREATE PROCEDURE SimularDesempenho4Horas()
BEGIN
    DECLARE dia INT DEFAULT 1;
    DECLARE hora INT DEFAULT 0;
    DECLARE ultimo_dia INT;
    DECLARE cpu_usage DOUBLE;
    DECLARE cpu_freq DOUBLE;
    DECLARE memory_usage DOUBLE;
    DECLARE memory_total DOUBLE;
    DECLARE memory_perc DOUBLE;
    DECLARE disk_usage DOUBLE;
    DECLARE disk_total DOUBLE;
    DECLARE disk_perc DOUBLE;
    DECLARE fkTotem INT;

    -- Pega o último dia do mês atual
    SET ultimo_dia = DAY(LAST_DAY(CURDATE()));

    -- Loop para simular inserções para cada dia do mês
    WHILE dia <= ultimo_dia DO
        SET hora = 0;
        -- Loop para cada 4 horas do dia
        WHILE hora < 24 DO
            -- Loop para cada fkTotem (1, 2 e 3)
            SET fkTotem = 1;
            WHILE fkTotem <= 3 DO
                -- Gerar valores aleatórios para os dados de desempenho
                SET cpu_usage = ROUND(RAND() * 100, 1); -- CPU entre 0 e 100%
                SET cpu_freq = ROUND(RAND() * 3500, 1); -- Frequência entre 0 e 3500 MHz
                SET memory_total = ROUND(RAND() * 24 + 8, 1); -- Memória total entre 8GB e 24GB
                SET memory_usage = ROUND(RAND() * memory_total, 1); -- Memória usada <= total
                SET memory_perc = ROUND((memory_usage / memory_total) * 100, 1); -- % de memória usada
                SET disk_total = ROUND(RAND() * 200 + 100, 1); -- Disco total entre 100GB e 300GB
                SET disk_usage = ROUND(RAND() * disk_total, 1); -- Disco usado <= total
                SET disk_perc = ROUND((disk_usage / disk_total) * 100, 1); -- % de disco usado

                -- Inserir os dados na tabela 'Desempenho' com a data/hora correspondente e o fkTotem atual
                INSERT INTO Desempenho (cpu_usage, cpu_freq, memory_usage, memory_total, memory_perc, disk_usage, disk_total, disk_perc, dtHora, fkTotem)
                VALUES (cpu_usage, cpu_freq, memory_usage, memory_total, memory_perc, disk_usage, disk_total, disk_perc, 
                        CONCAT(DATE_FORMAT(CURDATE(), '%Y-%m-'), LPAD(dia, 2, '0'), ' ', LPAD(hora, 2, '0'), ':00:00'), fkTotem);

                -- Incrementar o fkTotem
                SET fkTotem = fkTotem + 1;
            END WHILE;

            -- Incrementar a hora de 4 em 4
            SET hora = hora + 4;
        END WHILE;
        -- Incrementar o dia
        SET dia = dia + 1;
    END WHILE;
END //

DELIMITER ;

CALL SimularDesempenho4Horas();

select * from Desempenho;

SELECT 
          ROUND(AVG(cpu_usage)) AS cpu_usage,
          ROUND(AVG(memory_usage)) AS memory_usage,
          ROUND(AVG(disk_usage)) AS disk_usage
      FROM Desempenho
      WHERE DATE(dtHora) = CURDATE();
      
SELECT 
            ROUND(AVG(cpu_usage)) AS cpu_usage,
            ROUND(AVG(memory_usage)) AS memory_usage,
            ROUND(AVG(disk_usage)) AS disk_usage
        FROM Desempenho
        WHERE WEEK(dtHora) = WEEK(CURDATE()) 
        AND YEAR(dtHora) = YEAR(CURDATE());
        
 SELECT 
            ROUND(AVG(cpu_usage)) AS cpu_usage,
            ROUND(AVG(memory_usage)) AS memory_usage,
            ROUND(AVG(disk_usage)) AS disk_usage
        FROM Desempenho
        WHERE MONTH(dtHora) = MONTH(CURDATE()) 
        AND YEAR(dtHora) = YEAR(CURDATE());    
        
SELECT 
    ROUND(AVG(cpu_usage)) AS cpu_usage,
    ROUND(AVG(memory_usage)) AS memory_usage,
    ROUND(AVG(disk_usage)) AS disk_usage
FROM Desempenho
WHERE fkTotem = 1
AND DATE(dtHora) = CURDATE();

SELECT 
    ROUND(AVG(cpu_usage)) AS cpu_usage,
    ROUND(AVG(memory_usage)) AS memory_usage,
    ROUND(AVG(disk_usage)) AS disk_usage
FROM Desempenho
WHERE fkTotem = 2
AND DATE(dtHora) = CURDATE();

SELECT 
    ROUND(AVG(cpu_usage)) AS cpu_usage,
    ROUND(AVG(memory_usage)) AS memory_usage,
    ROUND(AVG(disk_usage)) AS disk_usage
FROM Desempenho
WHERE fkTotem = 3
AND DATE(dtHora) = CURDATE();
