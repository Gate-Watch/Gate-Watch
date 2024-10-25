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
    unidadeMedida VARCHAR(45),
    fkTotem int,
    FOREIGN KEY (fkTotem) REFERENCES Totem(idTotem),
    CONSTRAINT chkComponente CHECK(componente IN('cpu', 'memoria', 'disco'))
);

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

-- Procedure para simular dados de desempenho
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
    ROUND(AVG(memory_perc)) AS memory_perc,
    ROUND(AVG(disk_perc)) AS disk_perc
FROM Desempenho
WHERE DATE(dtHora) = CURDATE();

      
SELECT 
    ROUND(AVG(cpu_usage)) AS cpu_usage,
    ROUND(AVG(memory_perc)) AS memory_perc,
    ROUND(AVG(disk_perc)) AS disk_perc
FROM Desempenho
WHERE WEEK(dtHora) = WEEK(CURDATE()) 
AND YEAR(dtHora) = YEAR(CURDATE());

        
SELECT 
    ROUND(AVG(cpu_usage)) AS cpu_usage,
    ROUND(AVG(memory_perc)) AS memory_perc,
    ROUND(AVG(disk_perc)) AS disk_perc
FROM Desempenho
WHERE MONTH(dtHora) = MONTH(CURDATE()) 
AND YEAR(dtHora) = YEAR(CURDATE());
  
        
SELECT 
    ROUND(AVG(cpu_usage)) AS cpu_usage,
    ROUND(AVG(memory_perc)) AS memory_perc,
    ROUND(AVG(disk_perc)) AS disk_perc
FROM Desempenho
WHERE fkTotem = 1
AND DATE(dtHora) = CURDATE();

SELECT 
    ROUND(AVG(cpu_usage)) AS cpu_usage,
    ROUND(AVG(memory_perc)) AS memory_perc,
    ROUND(AVG(disk_perc)) AS disk_perc
FROM Desempenho
WHERE fkTotem = 2
AND DATE(dtHora) = CURDATE();

SELECT 
    ROUND(AVG(cpu_usage)) AS cpu_usage,
    ROUND(AVG(memory_perc)) AS memory_perc,
    ROUND(AVG(disk_perc)) AS disk_perc
FROM Desempenho
WHERE fkTotem = 3
AND DATE(dtHora) = CURDATE();

-- Procedure para gerar alertas
DELIMITER //

CREATE PROCEDURE GerarAlertas()
BEGIN
    DECLARE done INT DEFAULT FALSE;

    -- Declaração das variáveis
    DECLARE v_idDesempenho INT;
    DECLARE v_cpu_usage DOUBLE;
    DECLARE v_memory_perc DOUBLE;
    DECLARE v_disk_perc DOUBLE;
    DECLARE v_dtHora DATETIME;
    DECLARE v_fkTotem INT;

    -- Declaração do cursor
    DECLARE desempenho_cursor CURSOR FOR 
        SELECT idDesempenho, cpu_usage, memory_perc, disk_perc, dtHora, fkTotem 
        FROM Desempenho;

    -- Handler para capturar quando o cursor chega ao final
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Abre o cursor
    OPEN desempenho_cursor;

    -- Loop de leitura
    read_loop: LOOP
        -- Busca os valores no cursor e armazena nas variáveis
        FETCH desempenho_cursor INTO v_idDesempenho, v_cpu_usage, v_memory_perc, v_disk_perc, v_dtHora, v_fkTotem;

        -- Verifica se atingiu o final do cursor
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Verifica se os valores excedem os limites e insere na tabela de alertas
        IF v_cpu_usage > 60 THEN
            INSERT INTO alertas (dtAlerta, componente, fkDesempenho)
            VALUES (v_dtHora, 'cpu', v_idDesempenho);
        END IF;

        IF v_memory_perc > 70 THEN
            INSERT INTO alertas (dtAlerta, componente, fkDesempenho)
            VALUES (v_dtHora, 'memoria', v_idDesempenho);
        END IF;

        IF v_disk_perc > 80 THEN
            INSERT INTO alertas (dtAlerta, componente, fkDesempenho)
            VALUES (v_dtHora, 'disco', v_idDesempenho);
        END IF;
    END LOOP;

    -- Fecha o cursor
    CLOSE desempenho_cursor;
END //

DELIMITER ;

CALL GerarAlertas();

SELECT * FROM alertas;

SELECT 
    a.idAlerta,
    a.dtAlerta,
    a.componente,
    a.fkDesempenho,
    CASE 
        WHEN a.componente = 'cpu' THEN d.cpu_usage
        ELSE NULL 
    END AS cpu_usage,
    CASE 
        WHEN a.componente = 'memoria' THEN d.memory_perc
        ELSE NULL 
    END AS memory_perc,
    CASE 
        WHEN a.componente = 'disco' THEN d.disk_perc
        ELSE NULL 
    END AS disk_perc,
    d.fkTotem
FROM 
    alertas a
JOIN 
    Desempenho d ON a.fkDesempenho = d.idDesempenho
ORDER BY 
    a.dtAlerta;
    use gatewatch;
    select * from totem;
    select * from companhia;