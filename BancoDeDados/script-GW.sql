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
select * from Alerta;

truncate table Alerta;

INSERT INTO Alerta (dtAlerta, componente, medida, statusTotem, fkTotem) VALUES
('2024-02-01 03:54:06', 'cpu', 79.9, 'Alertado', 3),
('2024-04-20 04:24:28', 'memoria', 53.2, 'Alertado', 2),
('2024-05-16 12:35:42', 'memoria', 56.0, 'Alertado', 2),
('2024-03-09 23:42:30', 'memoria', 75.0, 'Alertado', 1),
('2024-11-07 17:49:55', 'disco', 85.7, 'Alertado', 1),
('2024-05-27 17:55:15', 'cpu', 88.6, 'Alertado', 1),
('2024-02-12 08:28:23', 'memoria', 72.2, 'Alertado', 1),
('2024-03-04 23:55:38', 'memoria', 67.3, 'Alertado', 2),
('2024-06-02 11:15:16', 'cpu', 80.1, 'Alertado', 2),
('2024-06-25 20:46:43', 'memoria', 62.0, 'Alertado', 2),
('2024-02-19 10:19:14', 'disco', 73.8, 'Alertado', 1),
('2024-01-13 21:24:48', 'cpu', 65.3, 'Alertado', 2),
('2024-07-23 02:11:34', 'disco', 91.8, 'Alertado', 3),
('2024-03-09 07:14:37', 'cpu', 50.6, 'Alertado', 1),
('2024-07-14 19:05:25', 'disco', 66.4, 'Alertado', 2),
('2024-03-24 16:25:03', 'memoria', 54.8, 'Alertado', 1),
('2024-04-28 22:58:30', 'disco', 82.3, 'Alertado', 2),
('2024-07-24 03:24:25', 'disco', 87.9, 'Alertado', 1),
('2024-09-18 15:29:51', 'memoria', 68.0, 'Alertado', 2),
('2024-08-21 14:36:44', 'disco', 68.4, 'Alertado', 3),
('2024-04-28 08:52:16', 'memoria', 81.6, 'Alertado', 3),
('2024-07-09 06:54:49', 'disco', 98.6, 'Alertado', 2),
('2024-07-19 07:16:08', 'cpu', 84.1, 'Alertado', 2),
('2024-02-16 05:40:15', 'cpu', 70.6, 'Alertado', 2),
('2024-08-27 10:08:38', 'memoria', 90.3, 'Alertado', 1),
('2024-04-11 07:58:22', 'disco', 89.6, 'Alertado', 1),
('2024-11-14 04:50:14', 'memoria', 86.4, 'Alertado', 1),
('2024-04-01 02:41:34', 'disco', 98.7, 'Alertado', 1),
('2024-06-28 02:51:39', 'cpu', 70.4, 'Alertado', 3),
('2024-04-28 06:32:22', 'memoria', 54.2, 'Alertado', 2),
('2024-08-30 10:43:44', 'cpu', 67.8, 'Alertado', 1),
('2024-01-28 18:00:15', 'cpu', 62.7, 'Alertado', 1),
('2024-11-04 19:57:16', 'disco', 59.7, 'Alertado', 1),
('2024-05-31 14:51:19', 'cpu', 91.0, 'Alertado', 3),
('2024-10-02 03:17:22', 'disco', 86.6, 'Alertado', 3),
('2024-03-06 07:43:00', 'memoria', 71.7, 'Alertado', 1),
('2024-02-24 08:47:55', 'disco', 50.9, 'Alertado', 3),
('2024-05-06 18:08:15', 'disco', 91.9, 'Alertado', 2),
('2024-05-17 19:10:24', 'cpu', 82.3, 'Alertado', 1),
('2024-11-26 07:43:54', 'memoria', 52.5, 'Alertado', 2),
('2024-02-12 18:36:49', 'disco', 92.4, 'Alertado', 3),
('2024-05-14 12:50:44', 'memoria', 76.7, 'Alertado', 2),
('2024-11-19 01:07:14', 'memoria', 52.2, 'Alertado', 1),
('2024-02-07 10:04:27', 'cpu', 88.0, 'Alertado', 3),
('2024-10-19 10:57:34', 'cpu', 87.8, 'Alertado', 3),
('2024-02-20 02:32:26', 'cpu', 58.0, 'Alertado', 2),
('2024-02-18 10:22:04', 'cpu', 56.9, 'Alertado', 1),
('2024-01-18 15:01:30', 'disco', 59.5, 'Alertado', 3),
('2024-02-29 21:28:21', 'memoria', 87.1, 'Alertado', 2),
('2024-01-18 12:48:30', 'cpu', 86.9, 'Alertado', 2),
('2024-07-31 20:29:34', 'cpu', 55.9, 'Alertado', 1),
('2024-01-07 06:47:20', 'disco', 52.9, 'Alertado', 3),
('2024-02-26 23:39:34', 'memoria', 97.1, 'Alertado', 3),
('2024-08-18 15:29:23', 'cpu', 85.6, 'Alertado', 2),
('2024-01-21 03:42:03', 'memoria', 56.5, 'Alertado', 2),
('2024-10-22 05:46:24', 'disco', 74.9, 'Alertado', 1),
('2024-08-24 22:10:12', 'disco', 94.0, 'Alertado', 3),
('2024-09-25 08:40:53', 'disco', 69.3, 'Alertado', 3),
('2024-07-13 13:03:43', 'disco', 85.5, 'Alertado', 3),
('2024-05-29 14:08:46', 'memoria', 53.0, 'Alertado', 2),
('2024-01-23 22:26:10', 'memoria', 72.1, 'Alertado', 3),
('2024-04-05 02:53:35', 'memoria', 84.2, 'Alertado', 3),
('2024-02-24 09:33:43', 'disco', 65.0, 'Alertado', 1),
('2024-09-01 17:41:45', 'memoria', 98.8, 'Alertado', 3),
('2024-11-15 22:20:12', 'cpu', 62.9, 'Alertado', 1),
('2024-03-14 06:43:07', 'memoria', 56.2, 'Alertado', 3),
('2024-05-15 02:34:26', 'memoria', 61.0, 'Alertado', 2),
('2024-09-24 20:04:07', 'cpu', 65.8, 'Alertado', 1),
('2024-06-13 02:21:44', 'disco', 83.7, 'Alertado', 2),
('2024-04-22 00:47:34', 'disco', 78.7, 'Alertado', 2),
('2024-06-13 05:18:20', 'disco', 55.7, 'Alertado', 3),
('2024-10-11 19:25:51', 'cpu', 94.9, 'Alertado', 2),
('2024-10-30 09:20:55', 'memoria', 76.5, 'Alertado', 3),
('2024-11-22 11:37:15', 'memoria', 57.2, 'Alertado', 3),
('2024-09-14 00:38:31', 'memoria', 80.9, 'Alertado', 1),
('2024-11-19 06:15:16', 'cpu', 89.2, 'Alertado', 3),
('2024-03-22 02:56:04', 'cpu', 75.4, 'Alertado', 1),
('2024-02-29 13:44:45', 'disco', 51.0, 'Alertado', 2),
('2024-08-01 20:22:59', 'memoria', 72.8, 'Alertado', 2),
('2024-08-16 06:42:54', 'disco', 60.7, 'Alertado', 3),
('2024-09-16 09:19:00', 'memoria', 68.6, 'Alertado', 2),
('2024-02-29 23:16:20', 'disco', 77.2, 'Alertado', 1),
('2024-01-23 18:40:39', 'memoria', 77.4, 'Alertado', 1),
('2024-04-19 21:49:54', 'memoria', 99.1, 'Alertado', 2),
('2024-06-20 20:33:07', 'disco', 92.4, 'Alertado', 1),
('2024-05-24 18:34:54', 'disco', 87.6, 'Alertado', 1),
('2024-10-28 13:07:27', 'disco', 74.3, 'Alertado', 1),
('2024-06-13 02:30:47', 'cpu', 96.9, 'Alertado', 1),
('2024-03-10 02:41:36', 'disco', 70.3, 'Alertado', 1),
('2024-02-06 11:04:46', 'cpu', 71.8, 'Alertado', 2),
('2024-11-29 01:54:56', 'cpu', 75.0, 'Alertado', 3),
('2024-02-04 18:49:11', 'disco', 66.6, 'Alertado', 3),
('2024-10-15 05:28:56', 'cpu', 95.2, 'Alertado', 2),
('2024-02-29 22:47:43', 'memoria', 56.3, 'Alertado', 1),
('2024-01-23 16:40:21', 'cpu', 88.8, 'Alertado', 1),
('2024-02-12 17:14:00', 'memoria', 69.7, 'Alertado', 3),
('2024-11-15 06:05:08', 'memoria', 51.4, 'Alertado', 3),
('2024-03-06 00:15:06', 'memoria', 62.5, 'Alertado', 3),
('2024-08-23 21:54:34', 'cpu', 50.8, 'Alertado', 1),
('2024-03-09 05:19:17', 'memoria', 71.6, 'Alertado', 2),
('2024-03-02 06:22:17', 'memoria', 66.7, 'Alertado', 2),
('2024-04-06 16:27:31', 'disco', 55.4, 'Alertado', 3),
('2024-07-14 12:21:33', 'disco', 65.0, 'Alertado', 3),
('2024-07-24 14:13:51', 'cpu', 96.5, 'Alertado', 1),
('2024-08-18 12:10:43', 'disco', 97.3, 'Alertado', 3),
('2024-02-18 00:12:11', 'cpu', 51.4, 'Alertado', 3),
('2024-09-17 23:27:30', 'memoria', 72.8, 'Alertado', 1),
('2024-07-08 19:35:13', 'cpu', 84.2, 'Alertado', 1),
('2024-11-15 10:43:52', 'cpu', 95.1, 'Alertado', 3),
('2024-11-03 05:21:17', 'memoria', 61.3, 'Alertado', 1),
('2024-10-17 19:19:06', 'memoria', 70.5, 'Alertado', 3),
('2024-08-17 23:58:19', 'memoria', 50.7, 'Alertado', 3),
('2024-04-03 15:00:53', 'memoria', 77.0, 'Alertado', 2),
('2024-08-31 16:03:30', 'cpu', 65.2, 'Alertado', 1),
('2024-04-13 10:57:27', 'memoria', 77.5, 'Alertado', 3),
('2024-06-09 00:14:18', 'disco', 95.8, 'Alertado', 1),
('2024-07-04 17:15:05', 'memoria', 67.6, 'Alertado', 1),
('2024-11-25 02:24:42', 'disco', 53.3, 'Alertado', 2),
('2024-12-02 10:54:02', 'memoria', 79.8, 'Alertado', 3),
('2024-01-21 10:12:36', 'memoria', 69.5, 'Alertado', 2),
('2024-01-08 00:58:29', 'memoria', 77.6, 'Alertado', 3),
('2024-07-17 20:20:51', 'memoria', 65.4, 'Alertado', 3),
('2024-09-03 20:27:27', 'cpu', 78.0, 'Alertado', 2),
('2024-06-07 03:15:24', 'cpu', 87.5, 'Alertado', 2),
('2024-04-23 06:52:23', 'disco', 97.8, 'Alertado', 2),
('2024-03-12 06:38:00', 'disco', 96.7, 'Alertado', 1),
('2024-08-15 19:36:37', 'disco', 56.2, 'Alertado', 2),
('2024-04-14 15:25:34', 'memoria', 90.5, 'Alertado', 3),
('2024-07-28 09:10:08', 'memoria', 85.6, 'Alertado', 2),
('2024-02-01 17:55:26', 'cpu', 76.3, 'Alertado', 2),
('2024-08-13 17:23:47', 'memoria', 63.9, 'Alertado', 3),
('2024-01-08 07:34:47', 'disco', 72.1, 'Alertado', 2),
('2024-10-22 03:39:16', 'cpu', 62.9, 'Alertado', 3),
('2024-01-11 23:15:22', 'cpu', 78.4, 'Alertado', 3),
('2024-08-13 00:39:36', 'disco', 81.5, 'Alertado', 2),
('2024-08-11 17:22:13', 'disco', 63.3, 'Alertado', 2),
('2024-08-03 03:06:52', 'cpu', 56.4, 'Alertado', 2),
('2024-01-24 04:56:16', 'memoria', 67.0, 'Alertado', 2),
('2024-05-29 09:24:48', 'disco', 76.3, 'Alertado', 3),
('2024-11-13 23:32:55', 'disco', 65.6, 'Alertado', 2),
('2024-05-26 08:07:52', 'cpu', 66.0, 'Alertado', 3),
('2024-07-11 23:56:04', 'cpu', 91.1, 'Alertado', 2),
('2024-04-27 02:42:39', 'memoria', 91.1, 'Alertado', 3),
('2024-07-21 07:23:58', 'cpu', 63.5, 'Alertado', 2),
('2024-04-27 10:31:20', 'cpu', 70.4, 'Alertado', 1),
('2024-01-26 21:56:19', 'disco', 62.9, 'Alertado', 3),
('2024-12-04 03:08:34', 'memoria', 85.8, 'Alertado', 2),
('2024-03-27 13:05:47', 'memoria', 61.4, 'Alertado', 3),
('2024-11-23 03:50:27', 'disco', 99.9, 'Alertado', 3),
('2024-10-24 11:53:04', 'memoria', 70.9, 'Alertado', 1),
('2024-09-04 18:46:58', 'memoria', 86.4, 'Alertado', 3),
('2024-03-27 16:04:22', 'disco', 67.2, 'Alertado', 1),
('2024-07-14 10:32:18', 'cpu', 94.9, 'Alertado', 3),
('2024-06-03 22:49:41', 'disco', 63.3, 'Alertado', 2),
('2024-03-09 11:49:55', 'memoria', 69.9, 'Alertado', 3),
('2024-02-02 20:18:12', 'cpu', 65.8, 'Alertado', 2),
('2024-01-29 15:59:34', 'memoria', 52.8, 'Alertado', 3),
('2024-06-14 02:39:04', 'cpu', 62.9, 'Alertado', 2),
('2024-09-02 03:23:06', 'cpu', 74.1, 'Alertado', 3),
('2024-06-15 15:21:39', 'memoria', 97.6, 'Alertado', 3),
('2024-10-10 16:18:36', 'cpu', 92.4, 'Alertado', 1),
('2024-07-19 04:34:35', 'disco', 54.0, 'Alertado', 3),
('2024-05-18 13:17:55', 'memoria', 83.4, 'Alertado', 1),
('2024-07-09 20:57:51', 'cpu', 86.8, 'Alertado', 2),
('2024-06-23 18:52:01', 'disco', 80.6, 'Alertado', 1),
('2024-05-29 11:35:44', 'cpu', 97.2, 'Alertado', 3),
('2024-02-09 20:04:32', 'disco', 53.1, 'Alertado', 2),
('2024-03-11 08:45:51', 'disco', 84.3, 'Alertado', 3),
('2024-01-09 05:40:34', 'disco', 55.8, 'Alertado', 2),
('2024-02-09 09:21:05', 'memoria', 78.5, 'Alertado', 1),
('2024-08-26 06:38:00', 'cpu', 90.4, 'Alertado', 3),
('2024-09-28 03:56:01', 'disco', 70.2, 'Alertado', 1),
('2024-04-27 19:36:47', 'memoria', 65.4, 'Alertado', 2),
('2024-08-03 22:09:48', 'memoria', 64.5, 'Alertado', 1),
('2024-02-10 05:54:10', 'disco', 62.1, 'Alertado', 1),
('2024-02-23 16:08:01', 'cpu', 52.0, 'Alertado', 2),
('2024-06-18 20:39:16', 'memoria', 96.3, 'Alertado', 1),
('2024-08-14 09:42:08', 'memoria', 70.9, 'Alertado', 1),
('2024-06-03 15:40:57', 'cpu', 67.0, 'Alertado', 2),
('2024-10-24 10:32:20', 'disco', 88.0, 'Alertado', 1),
('2024-09-17 02:33:56', 'cpu', 99.5, 'Alertado', 3),
('2024-10-15 19:17:19', 'disco', 88.9, 'Alertado', 2),
('2024-02-10 18:50:47', 'memoria', 61.7, 'Alertado', 1),
('2024-11-20 22:42:03', 'disco', 67.6, 'Alertado', 2),
('2024-01-27 01:37:02', 'cpu', 70.5, 'Alertado', 3),
('2024-09-03 08:45:17', 'disco', 70.4, 'Alertado', 2),
('2024-06-08 11:09:17', 'memoria', 94.3, 'Alertado', 3),
('2024-10-21 07:17:23', 'cpu', 78.7, 'Alertado', 1),
('2024-03-26 09:07:08', 'memoria', 83.9, 'Alertado', 1),
('2024-04-09 12:32:39', 'disco', 59.4, 'Alertado', 2),
('2024-05-26 01:23:21', 'disco', 78.9, 'Alertado', 1),
('2024-05-20 07:13:06', 'cpu', 83.6, 'Alertado', 2),
('2024-01-29 11:38:15', 'disco', 56.5, 'Alertado', 2),
('2024-02-08 05:05:06', 'cpu', 93.8, 'Alertado', 2),
('2024-06-28 11:27:21', 'memoria', 65.1, 'Alertado', 2),
('2024-04-09 18:12:11', 'memoria', 60.8, 'Alertado', 2),
('2024-10-26 06:16:57', 'cpu', 60.7, 'Alertado', 3),
('2024-01-09 13:10:44', 'disco', 79.4, 'Alertado', 3),
('2024-10-24 11:58:26', 'cpu', 76.0, 'Alertado', 3),
('2024-11-30 02:34:51', 'disco', 53.0, 'Alertado', 3),
('2024-09-13 21:50:00', 'cpu', 60.7, 'Alertado', 2),
('2024-02-12 19:44:46', 'cpu', 53.3, 'Alertado', 1),
('2024-02-04 09:18:05', 'disco', 60.0, 'Alertado', 1),
('2024-03-18 12:48:22', 'memoria', 96.8, 'Alertado', 2),
('2024-07-30 00:21:54', 'disco', 59.2, 'Alertado', 2),
('2024-07-05 23:55:43', 'memoria', 73.0, 'Alertado', 3),
('2024-04-08 21:58:25', 'disco', 91.2, 'Alertado', 3),
('2024-02-01 16:12:12', 'disco', 90.4, 'Alertado', 2),
('2024-12-03 09:51:13', 'cpu', 70.3, 'Alertado', 3),
('2024-11-17 10:42:25', 'disco', 71.8, 'Alertado', 2),
('2024-06-16 03:44:54', 'cpu', 81.6, 'Alertado', 2),
('2024-04-13 18:30:03', 'memoria', 59.9, 'Alertado', 3),
('2024-09-11 23:08:11', 'memoria', 95.1, 'Alertado', 1),
('2024-07-20 08:57:00', 'memoria', 70.3, 'Alertado', 2),
('2024-11-18 23:20:34', 'memoria', 89.6, 'Alertado', 3),
('2024-08-19 19:29:01', 'memoria', 54.4, 'Alertado', 2),
('2024-03-06 05:54:02', 'disco', 71.2, 'Alertado', 2),
('2024-07-22 23:48:21', 'cpu', 51.5, 'Alertado', 1),
('2024-07-13 07:05:06', 'memoria', 90.1, 'Alertado', 3),
('2024-08-18 05:31:21', 'cpu', 79.6, 'Alertado', 1),
('2024-04-18 00:08:49', 'cpu', 67.8, 'Alertado', 1),
('2024-01-31 14:38:07', 'disco', 63.3, 'Alertado', 3),
('2024-09-18 20:04:36', 'cpu', 51.4, 'Alertado', 1),
('2024-04-28 10:39:40', 'cpu', 93.6, 'Alertado', 2),
('2024-08-02 12:13:46', 'memoria', 65.0, 'Alertado', 1),
('2024-06-23 03:05:00', 'disco', 58.6, 'Alertado', 3),
('2024-05-27 14:18:17', 'disco', 71.7, 'Alertado', 2),
('2024-01-19 14:51:56', 'cpu', 64.4, 'Alertado', 3),
('2024-03-23 17:00:05', 'disco', 73.3, 'Alertado', 1),
('2024-06-19 01:54:17', 'cpu', 96.4, 'Alertado', 1),
('2024-04-10 21:25:27', 'disco', 80.6, 'Alertado', 1),
('2024-06-03 06:17:42', 'cpu', 71.6, 'Alertado', 2),
('2024-11-03 20:41:24', 'memoria', 85.2, 'Alertado', 3),
('2024-10-13 02:43:37', 'cpu', 63.4, 'Alertado', 3),
('2024-05-22 10:07:50', 'memoria', 81.9, 'Alertado', 1),
('2024-06-04 16:29:40', 'disco', 94.0, 'Alertado', 2),
('2024-04-29 11:16:49', 'disco', 87.0, 'Alertado', 3),
('2024-06-19 19:43:10', 'cpu', 94.8, 'Alertado', 2),
('2024-06-22 13:26:27', 'cpu', 74.1, 'Alertado', 2),
('2024-11-11 13:40:25', 'disco', 68.8, 'Alertado', 2),
('2024-08-21 21:54:36', 'cpu', 81.9, 'Alertado', 3),
('2024-01-14 11:38:22', 'cpu', 88.8, 'Alertado', 2),
('2024-06-28 22:31:37', 'cpu', 68.5, 'Alertado', 2),
('2024-10-30 17:50:23', 'memoria', 65.3, 'Alertado', 3),
('2024-05-06 14:32:17', 'memoria', 76.4, 'Alertado', 3),
('2024-10-12 20:11:58', 'cpu', 53.0, 'Alertado', 1),
('2024-06-24 18:14:24', 'cpu', 71.8, 'Alertado', 3),
('2024-09-20 16:10:02', 'disco', 62.0, 'Alertado', 1),
('2024-06-22 03:09:10', 'disco', 77.4, 'Alertado', 3),
('2024-01-30 11:59:01', 'memoria', 74.8, 'Alertado', 2),
('2024-06-12 12:26:00', 'memoria', 95.3, 'Alertado', 3),
('2024-02-23 14:41:06', 'memoria', 66.2, 'Alertado', 2),
('2024-10-26 01:55:56', 'disco', 54.1, 'Alertado', 2),
('2024-01-30 04:03:22', 'cpu', 51.9, 'Alertado', 1),
('2024-03-31 23:03:27', 'memoria', 69.6, 'Alertado', 1),
('2024-09-03 14:29:35', 'memoria', 99.3, 'Alertado', 2),
('2024-02-15 14:57:03', 'memoria', 53.3, 'Alertado', 2),
('2024-03-01 23:18:30', 'memoria', 86.6, 'Alertado', 3),
('2024-10-30 03:00:25', 'disco', 68.9, 'Alertado', 3),
('2024-01-10 20:45:09', 'cpu', 92.4, 'Alertado', 3),
('2024-03-02 22:31:58', 'cpu', 81.0, 'Alertado', 2),
('2024-03-23 08:55:16', 'disco', 82.3, 'Alertado', 2),
('2024-04-28 11:17:45', 'memoria', 96.7, 'Alertado', 3),
('2024-01-28 13:22:25', 'cpu', 52.4, 'Alertado', 3),
('2024-09-02 16:51:47', 'cpu', 94.1, 'Alertado', 2),
('2024-01-17 19:11:54', 'memoria', 90.3, 'Alertado', 1),
('2024-10-21 05:44:18', 'cpu', 80.8, 'Alertado', 3),
('2024-11-10 03:47:35', 'disco', 82.5, 'Alertado', 3),
('2024-11-05 11:35:09', 'cpu', 64.2, 'Alertado', 1),
('2024-05-12 14:59:51', 'memoria', 95.1, 'Alertado', 1),
('2024-08-11 18:40:28', 'disco', 86.2, 'Alertado', 2),
('2024-10-16 12:37:44', 'disco', 69.9, 'Alertado', 1),
('2024-10-09 12:32:16', 'cpu', 64.8, 'Alertado', 1),
('2024-08-07 03:50:13', 'cpu', 80.8, 'Alertado', 3),
('2024-10-08 04:14:59', 'disco', 65.9, 'Alertado', 3),
('2024-08-06 11:54:05', 'memoria', 72.3, 'Alertado', 2),
('2024-05-26 11:21:57', 'disco', 72.1, 'Alertado', 1),
('2024-02-29 12:50:23', 'memoria', 92.0, 'Alertado', 1),
('2024-03-31 20:33:07', 'memoria', 93.5, 'Alertado', 1),
('2024-09-15 09:24:07', 'memoria', 63.7, 'Alertado', 1),
('2024-03-25 20:50:49', 'disco', 98.8, 'Alertado', 1),
('2024-11-12 02:14:43', 'disco', 82.6, 'Alertado', 3),
('2024-02-18 07:59:54', 'cpu', 83.5, 'Alertado', 3),
('2024-06-24 10:49:15', 'cpu', 96.5, 'Alertado', 3),
('2024-09-25 17:45:51', 'memoria', 53.8, 'Alertado', 3),
('2024-04-08 20:33:54', 'cpu', 93.5, 'Alertado', 3),
('2024-09-22 23:53:38', 'cpu', 62.7, 'Alertado', 3),
('2024-10-26 16:59:22', 'disco', 61.6, 'Alertado', 2),
('2024-02-17 01:25:41', 'memoria', 62.1, 'Alertado', 3),
('2024-08-14 07:31:33', 'disco', 68.7, 'Alertado', 3),
('2024-09-28 12:30:45', 'disco', 60.3, 'Alertado', 1),
('2024-03-07 17:43:33', 'disco', 86.4, 'Alertado', 3),
('2024-09-15 06:33:35', 'cpu', 81.3, 'Alertado', 1),
('2024-02-16 03:55:00', 'memoria', 76.7, 'Alertado', 1),
('2024-04-25 08:53:26', 'cpu', 67.2, 'Alertado', 1),
('2024-11-20 14:13:18', 'memoria', 51.0, 'Alertado', 3),
('2024-05-18 21:26:39', 'disco', 79.3, 'Alertado', 1),
('2024-09-22 11:06:19', 'cpu', 73.0, 'Alertado', 3),
('2024-11-22 07:15:12', 'cpu', 71.0, 'Alertado', 3),
('2024-05-27 09:30:44', 'cpu', 80.8, 'Alertado', 3),
('2024-02-19 00:36:42', 'memoria', 67.8, 'Alertado', 2),
('2024-08-07 00:00:51', 'disco', 90.4, 'Alertado', 3),
('2024-03-23 18:46:34', 'memoria', 94.2, 'Alertado', 1),
('2024-09-26 21:59:48', 'cpu', 53.5, 'Alertado', 1),
('2024-11-27 08:47:17', 'disco', 52.7, 'Alertado', 2),
('2024-11-02 04:22:44', 'disco', 52.2, 'Alertado', 3),
('2024-03-30 06:59:54', 'memoria', 77.3, 'Alertado', 3),
('2024-08-06 00:14:41', 'disco', 99.5, 'Alertado', 3),
('2024-06-15 19:47:24', 'disco', 90.6, 'Alertado', 3),
('2024-11-25 12:36:30', 'cpu', 71.3, 'Alertado', 2),
('2024-04-22 05:32:20', 'cpu', 97.4, 'Alertado', 2),
('2024-02-13 17:14:19', 'memoria', 60.3, 'Alertado', 2),
('2024-02-29 10:24:30', 'disco', 76.1, 'Alertado', 3),
('2024-03-25 22:08:15', 'memoria', 72.5, 'Alertado', 1),
('2024-11-16 00:38:37', 'memoria', 54.5, 'Alertado', 3),
('2024-10-10 00:42:05', 'disco', 59.7, 'Alertado', 1),
('2024-10-07 12:21:08', 'cpu', 88.5, 'Alertado', 1),
('2024-02-26 19:14:39', 'memoria', 88.5, 'Alertado', 1),
('2024-10-29 19:53:45', 'memoria', 60.4, 'Alertado', 2),
('2024-01-15 22:27:44', 'memoria', 80.5, 'Alertado', 2),
('2024-03-19 10:24:17', 'memoria', 52.2, 'Alertado', 3),
('2024-09-01 23:42:34', 'cpu', 90.1, 'Alertado', 2),
('2024-07-02 08:10:06', 'cpu', 91.0, 'Alertado', 2),
('2024-05-27 02:27:42', 'cpu', 68.6, 'Alertado', 3),
('2024-06-09 06:07:27', 'cpu', 93.8, 'Alertado', 3),
('2024-06-12 19:19:59', 'cpu', 77.2, 'Alertado', 2),
('2024-11-09 05:53:14', 'disco', 96.2, 'Alertado', 1),
('2024-07-13 11:33:25', 'cpu', 96.9, 'Alertado', 3),
('2024-10-29 10:25:04', 'cpu', 73.0, 'Alertado', 1),
('2024-05-24 16:04:45', 'disco', 66.3, 'Alertado', 2),
('2024-10-03 14:15:43', 'disco', 75.9, 'Alertado', 2),
('2024-09-15 18:22:44', 'disco', 86.4, 'Alertado', 2),
('2024-09-06 21:55:29', 'memoria', 96.5, 'Alertado', 3),
('2024-08-27 07:53:29', 'cpu', 96.1, 'Alertado', 1),
('2024-04-21 23:36:02', 'memoria', 76.9, 'Alertado', 2),
('2024-05-06 21:32:10', 'disco', 63.6, 'Alertado', 3),
('2024-09-08 12:18:17', 'memoria', 93.6, 'Alertado', 2),
('2024-11-12 00:19:07', 'cpu', 84.0, 'Alertado', 1),
('2024-08-05 05:36:43', 'memoria', 78.7, 'Alertado', 3),
('2024-07-08 23:32:20', 'memoria', 98.7, 'Alertado', 2),
('2024-03-16 10:45:03', 'cpu', 55.8, 'Alertado', 3),
('2024-02-09 05:35:16', 'cpu', 99.6, 'Alertado', 3),
('2024-06-27 14:05:57', 'disco', 90.1, 'Alertado', 2),
('2024-10-22 05:10:25', 'cpu', 52.7, 'Alertado', 1),
('2024-10-27 10:41:15', 'memoria', 69.3, 'Alertado', 1),
('2024-04-05 11:05:14', 'cpu', 56.2, 'Alertado', 3),
('2024-03-12 12:02:22', 'memoria', 88.4, 'Alertado', 1),
('2024-05-07 06:12:49', 'memoria', 96.1, 'Alertado', 2),
('2024-11-05 05:20:56', 'memoria', 56.7, 'Alertado', 3),
('2024-01-21 18:01:27', 'memoria', 60.4, 'Alertado', 1),
('2024-04-19 20:32:22', 'cpu', 87.5, 'Alertado', 2),
('2024-05-07 17:38:03', 'memoria', 70.2, 'Alertado', 2),
('2024-06-23 22:33:16', 'memoria', 96.7, 'Alertado', 2),
('2024-06-25 21:58:25', 'cpu', 98.5, 'Alertado', 1),
('2024-11-21 21:41:12', 'disco', 74.8, 'Alertado', 1),
('2024-09-15 02:56:04', 'cpu', 67.9, 'Alertado', 3),
('2024-05-19 22:55:12', 'disco', 80.9, 'Alertado', 1),
('2024-02-01 08:34:05', 'cpu', 87.1, 'Alertado', 1),
('2024-07-06 10:26:09', 'disco', 74.8, 'Alertado', 1),
('2024-06-20 06:33:52', 'disco', 99.2, 'Alertado', 1),
('2024-02-24 18:05:32', 'cpu', 55.9, 'Alertado', 1),
('2024-07-22 09:05:01', 'disco', 51.2, 'Alertado', 2),
('2024-08-09 18:32:35', 'cpu', 71.8, 'Alertado', 2),
('2024-08-12 15:31:56', 'memoria', 88.6, 'Alertado', 1),
('2024-09-12 02:02:38', 'cpu', 67.0, 'Alertado', 1),
('2024-11-25 06:49:47', 'memoria', 63.6, 'Alertado', 2),
('2024-07-30 17:29:29', 'memoria', 63.2, 'Alertado', 3),
('2024-01-14 12:02:24', 'cpu', 53.2, 'Alertado', 2),
('2024-05-10 16:56:45', 'memoria', 75.4, 'Alertado', 1),
('2024-03-10 12:32:20', 'disco', 55.5, 'Alertado', 2),
('2024-10-25 12:03:06', 'cpu', 92.4, 'Alertado', 3),
('2024-10-26 19:27:18', 'disco', 99.6, 'Alertado', 1),
('2024-03-24 12:04:45', 'disco', 88.9, 'Alertado', 2),
('2024-10-18 21:37:24', 'disco', 76.3, 'Alertado', 1),
('2024-08-26 08:10:25', 'memoria', 53.5, 'Alertado', 1),
('2024-11-15 07:22:26', 'cpu', 61.9, 'Alertado', 2),
('2024-10-09 18:34:51', 'cpu', 96.7, 'Alertado', 2),
('2024-03-22 00:00:50', 'memoria', 99.1, 'Alertado', 3),
('2024-05-29 19:46:13', 'memoria', 93.5, 'Alertado', 2),
('2024-08-28 13:01:31', 'cpu', 73.4, 'Alertado', 2),
('2024-10-17 21:57:59', 'memoria', 50.8, 'Alertado', 1),
('2024-01-26 08:58:36', 'cpu', 87.0, 'Alertado', 2),
('2024-09-15 17:46:36', 'disco', 64.3, 'Alertado', 3),
('2024-01-12 14:10:22', 'disco', 91.9, 'Alertado', 2),
('2024-03-11 00:54:05', 'disco', 60.1, 'Alertado', 3),
('2024-02-05 09:14:50', 'memoria', 73.2, 'Alertado', 3),
('2024-02-26 13:12:33', 'disco', 60.1, 'Alertado', 3),
('2024-08-26 18:54:39', 'memoria', 89.4, 'Alertado', 1),
('2024-06-08 02:42:26', 'memoria', 62.1, 'Alertado', 3),
('2024-08-30 05:19:49', 'memoria', 61.9, 'Alertado', 2),
('2024-09-25 09:25:23', 'disco', 55.3, 'Alertado', 1),
('2024-02-23 14:24:38', 'cpu', 82.6, 'Alertado', 1),
('2024-08-03 05:35:23', 'memoria', 81.5, 'Alertado', 3),
('2024-01-15 03:28:40', 'memoria', 88.0, 'Alertado', 2),
('2024-11-02 22:51:27', 'disco', 83.5, 'Alertado', 2),
('2024-10-18 08:01:31', 'cpu', 98.4, 'Alertado', 1),
('2024-09-15 22:21:45', 'cpu', 86.8, 'Alertado', 1),
('2024-09-06 20:33:15', 'memoria', 93.6, 'Alertado', 2),
('2024-10-23 13:55:53', 'cpu', 57.5, 'Alertado', 2),
('2024-03-11 00:50:52', 'cpu', 52.0, 'Alertado', 3),
('2024-09-26 16:39:29', 'memoria', 79.1, 'Alertado', 1),
('2024-04-04 03:53:40', 'cpu', 94.5, 'Alertado', 1),
('2024-10-10 02:42:27', 'cpu', 60.2, 'Alertado', 2),
('2024-09-24 22:29:54', 'memoria', 91.4, 'Alertado', 1),
('2024-01-29 15:02:04', 'disco', 95.6, 'Alertado', 2),
('2024-08-25 05:11:55', 'cpu', 84.2, 'Alertado', 2),
('2024-06-23 20:30:49', 'memoria', 52.9, 'Alertado', 2),
('2024-10-23 09:21:49', 'cpu', 52.2, 'Alertado', 1),
('2024-03-01 22:36:15', 'cpu', 85.1, 'Alertado', 3),
('2024-03-25 22:23:37', 'memoria', 88.4, 'Alertado', 3),
('2024-05-10 23:24:06', 'disco', 87.3, 'Alertado', 1),
('2024-11-13 20:54:17', 'cpu', 51.9, 'Alertado', 3),
('2024-10-18 15:09:19', 'memoria', 55.6, 'Alertado', 1),
('2024-04-08 12:02:06', 'disco', 51.6, 'Alertado', 1),
('2024-05-19 22:06:51', 'disco', 55.8, 'Alertado', 3),
('2024-11-14 02:13:25', 'memoria', 73.3, 'Alertado', 1),
('2024-02-21 08:38:41', 'memoria', 57.5, 'Alertado', 3),
('2024-11-09 08:58:44', 'memoria', 84.4, 'Alertado', 1),
('2024-08-15 10:27:31', 'cpu', 81.0, 'Alertado', 3),
('2024-01-14 04:53:26', 'cpu', 50.8, 'Alertado', 1),
('2024-06-16 01:08:41', 'cpu', 81.2, 'Alertado', 2),
('2024-06-04 13:31:30', 'memoria', 64.9, 'Alertado', 2),
('2024-01-19 17:49:53', 'cpu', 75.8, 'Alertado', 1),
('2024-11-16 00:26:23', 'memoria', 57.6, 'Alertado', 3),
('2024-02-12 04:11:55', 'disco', 59.3, 'Alertado', 3),
('2024-10-16 20:57:07', 'disco', 57.3, 'Alertado', 3),
('2024-11-17 14:41:31', 'memoria', 80.8, 'Alertado', 1),
('2024-02-17 22:48:30', 'disco', 58.5, 'Alertado', 3),
('2024-07-26 18:46:03', 'cpu', 54.6, 'Alertado', 1),
('2024-07-28 08:38:02', 'disco', 89.9, 'Alertado', 2),
('2024-11-24 17:05:53', 'disco', 97.9, 'Alertado', 1),
('2024-08-18 18:28:02', 'disco', 99.1, 'Alertado', 2),
('2024-01-22 06:58:20', 'memoria', 73.6, 'Alertado', 3),
('2024-08-03 14:23:11', 'cpu', 54.2, 'Alertado', 2),
('2024-01-10 11:15:15', 'memoria', 95.0, 'Alertado', 1),
('2024-08-01 07:28:17', 'cpu', 68.4, 'Alertado', 3),
('2024-11-02 22:09:47', 'cpu', 93.3, 'Alertado', 1),
('2024-09-30 21:49:50', 'memoria', 75.5, 'Alertado', 2),
('2024-05-05 11:44:52', 'cpu', 66.9, 'Alertado', 3),
('2024-07-06 22:46:07', 'memoria', 74.5, 'Alertado', 1),
('2024-11-30 21:26:20', 'memoria', 96.7, 'Alertado', 2),
('2024-02-09 18:59:12', 'memoria', 55.0, 'Alertado', 3),
('2024-06-07 01:20:51', 'memoria', 67.2, 'Alertado', 2),
('2024-01-29 07:39:05', 'disco', 97.6, 'Alertado', 1),
('2024-03-09 23:17:51', 'disco', 54.4, 'Alertado', 1),
('2024-08-25 19:19:57', 'memoria', 75.2, 'Alertado', 3),
('2024-11-11 02:42:40', 'memoria', 59.1, 'Alertado', 1),
('2024-10-07 00:15:56', 'memoria', 94.7, 'Alertado', 3),
('2024-09-23 06:36:02', 'cpu', 55.0, 'Alertado', 2),
('2024-06-03 23:32:53', 'memoria', 76.7, 'Alertado', 1),
('2024-10-25 23:11:00', 'memoria', 88.7, 'Alertado', 3),
('2024-06-10 03:36:04', 'disco', 99.8, 'Alertado', 3),
('2024-06-17 09:04:36', 'disco', 96.9, 'Alertado', 1),
('2024-08-07 15:23:46', 'disco', 86.6, 'Alertado', 1),
('2024-04-13 01:58:37', 'memoria', 59.9, 'Alertado', 1),
('2024-04-26 15:11:14', 'memoria', 52.5, 'Alertado', 1),
('2024-10-13 20:27:06', 'memoria', 98.9, 'Alertado', 2),
('2024-03-07 18:00:00', 'disco', 54.6, 'Alertado', 2),
('2024-07-07 10:08:25', 'memoria', 57.0, 'Alertado', 1),
('2024-03-06 11:02:25', 'cpu', 86.7, 'Alertado', 2),
('2024-05-14 02:48:36', 'cpu', 75.2, 'Alertado', 2),
('2024-04-05 03:51:45', 'disco', 75.7, 'Alertado', 3),
('2024-10-01 09:48:40', 'cpu', 91.9, 'Alertado', 2),
('2024-11-24 02:01:39', 'cpu', 55.9, 'Alertado', 3),
('2024-05-12 20:36:55', 'memoria', 80.4, 'Alertado', 2),
('2024-04-11 08:25:57', 'cpu', 81.6, 'Alertado', 3),
('2024-06-27 12:50:35', 'disco', 60.8, 'Alertado', 2),
('2024-08-24 08:22:11', 'memoria', 67.7, 'Alertado', 2),
('2024-07-24 15:41:36', 'disco', 69.3, 'Alertado', 1),
('2024-03-01 05:53:26', 'cpu', 96.9, 'Alertado', 2),
('2024-08-21 23:09:39', 'cpu', 87.1, 'Alertado', 2),
('2024-03-23 16:10:45', 'disco', 84.9, 'Alertado', 1),
('2024-05-16 06:04:27', 'disco', 81.9, 'Alertado', 2),
('2024-07-14 23:41:27', 'disco', 83.4, 'Alertado', 2),
('2024-07-06 07:01:06', 'cpu', 50.9, 'Alertado', 3),
('2024-08-09 01:22:42', 'memoria', 76.5, 'Alertado', 1),
('2024-06-03 09:53:59', 'disco', 74.9, 'Alertado', 3),
('2024-08-16 22:06:18', 'memoria', 79.2, 'Alertado', 1),
('2024-03-14 15:20:13', 'disco', 83.6, 'Alertado', 1),
('2024-09-06 12:27:09', 'disco', 88.2, 'Alertado', 1),
('2024-03-20 14:07:51', 'memoria', 71.4, 'Alertado', 3),
('2024-04-11 03:35:24', 'disco', 84.5, 'Alertado', 2),
('2024-05-06 11:53:40', 'disco', 90.4, 'Alertado', 1),
('2024-10-27 04:53:59', 'cpu', 59.2, 'Alertado', 2),
('2024-09-14 05:47:30', 'cpu', 51.6, 'Alertado', 1),
('2024-10-10 13:51:18', 'cpu', 74.1, 'Alertado', 2),
('2024-01-04 00:09:49', 'disco', 87.3, 'Alertado', 2),
('2024-11-13 03:15:35', 'disco', 79.9, 'Alertado', 2),
('2024-10-19 14:58:11', 'disco', 94.3, 'Alertado', 3),
('2024-03-17 10:57:31', 'disco', 55.8, 'Alertado', 1),
('2024-05-02 09:28:31', 'memoria', 95.2, 'Alertado', 1),
('2024-06-16 06:05:31', 'memoria', 78.5, 'Alertado', 3),
('2024-09-28 23:37:27', 'disco', 98.6, 'Alertado', 1),
('2024-03-19 17:55:53', 'disco', 55.7, 'Alertado', 3),
('2024-02-02 13:15:29', 'disco', 99.3, 'Alertado', 2),
('2024-06-17 03:12:37', 'memoria', 69.5, 'Alertado', 3),
('2024-07-12 08:28:46', 'disco', 95.3, 'Alertado', 1),
('2024-12-01 02:29:24', 'memoria', 69.7, 'Alertado', 3),
('2024-03-27 06:34:43', 'memoria', 61.9, 'Alertado', 1),
('2024-09-24 09:18:40', 'disco', 68.7, 'Alertado', 3);



-- Inserção de dados na tabela Aeroporto
INSERT INTO Aeroporto VALUES 
    (DEFAULT, 'Aeroporto de São Paulo/Congonhas', '12345678910111'),
    (DEFAULT, 'Aeroporto Internacional de Guarulhos', '11101987654321');

    select * from Aeroporto;
    select * from Companhia;


-- Inserção de dados na tabela Totem
INSERT INTO Totem VALUES
    (default, 'Totem 1', '1234', 'Dell', '2017', 1),
    (default, 'Totem 2', '5678', 'Dell', '2022', 1),
    (default, 'Totem 3', '9123', 'Dell', 2015, 1);

select * from Totem;

select * from Alerta;

select * from Desempenho;

WITH RECURSIVE DiasMes AS (
        SELECT DATE(CONCAT('2024-', 8, '-01')) AS diaMes
        UNION ALL
        SELECT DATE_ADD(diaMes, INTERVAL 1 DAY)
        FROM DiasMes
        WHERE diaMes < LAST_DAY(CONCAT('2024-', 8, '-01'))
    )
    SELECT 
        DATE_FORMAT(DiasMes.diaMes, '%d/%m') AS diaMes,
        IFNULL(COUNT(Alerta.idAlerta), 0) AS totalAlertas
    FROM DiasMes
    LEFT JOIN Alerta 
        ON DATE(Alerta.dtAlerta) = DiasMes.diaMes
        AND MONTH(Alerta.dtAlerta) = 8
        AND YEAR(Alerta.dtAlerta) = 2024
        and Alerta.fkTotem = 2
    LEFT JOIN Totem 
        ON Alerta.fkTotem = Totem.idTotem
    LEFT JOIN Companhia 
        ON Totem.fkCompanhia = Companhia.idCompanhia 
        AND Companhia.idCompanhia = 1
    GROUP BY DiasMes.diaMes
    ORDER BY DiasMes.diaMes;

    
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
        SET nomeProcesso = CASE FLOOR(1 + (RAND() * 5)) -- Gera um número aleatório entre 1 e 5
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

show tables;

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



select * from Alerta where dtAlerta like '%____-12-__%';

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



