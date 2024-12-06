import psutil
import time
from datetime import datetime
import mysql.connector as sql
import requests
import json
from dotenv import load_dotenv
import os
import boto3
import tempfile
import subprocess

# Carregar variáveis de ambiente
load_dotenv("C:\\Users\\Samsung\\Downloads\\Gate-Watch\\configuracoes.env")
email_jira = os.getenv('JIRA_EMAIL')
chave_jira = os.getenv('CHAVE_DO_JIRA')

# Conexão com o banco de dados
def conectarDb():
    return sql.connect(
        host='localhost',
        port="3306",
        user='root',
        password='Sk8long2077#',
        database="GateWatch"
    )

# Limites de alerta
limiteCPU = 0.1
limiteMEM = 85.0
limiteDSK = 85.0

# FK do Totem
idTotem = 1

# Função para abrir chamado no Jira
def abrir_chamado_jira(categoria, tipo, limite_atual):
    url = "https://gate-watch.atlassian.net/rest/api/2/issue"
    auth = (email_jira, chave_jira)
    headers = {"Content-Type": "application/json"}
    descricao = f"O uso de {categoria} ultrapassou o limite de {tipo}. Utilização atual: {limite_atual:.2f}%."

    dados_chamado = {
        "fields": {
            "project": {"key": "GW"},
            "summary": f"Limite de {categoria} excedido no Totem {idTotem} - Uso atual: {limite_atual:.2f}%",
            "description": descricao,
            "issuetype": {"name": "Task"}
        }
    }

    response = requests.post(url, auth=auth, headers=headers, data=json.dumps(dados_chamado))

    if response.status_code == 201:
        print(f"Chamado criado com sucesso no Jira para {categoria}!")
    else:
        print(f"Falha ao criar chamado para {categoria}. Status: {response.status_code}, Erro: {response.text}")

# Inserir dados no banco de dados
def inserir_alerta(idTotem, componente, medida):
    banco = conectarDb()
    cursor = banco.cursor()
    query = """INSERT INTO Alerta (componente, medida, statusTotem, fkTotem) VALUES (%s, %s, %s, %s)"""
    val = (componente, medida, "Alertado", idTotem)
    cursor.execute(query, val)
    banco.commit()
    print("Alerta inserido no banco de dados.")

# Enviar JSON para o S3
def enviar_para_s3(dados):
    nome_arquivo = os.path.join(tempfile.gettempdir(), 'dados_sistema.json')

    with open(nome_arquivo, mode='wt') as f:
        json.dump(dados, f)

    s3 = boto3.client('s3')
    try:
        s3.upload_file(
            Filename=nome_arquivo,
            Bucket='s3-raw-gatewatch',
            Key='dados-maquina.json'
        )
        print("Arquivo JSON enviado para o S3 com sucesso!")
    except Exception as e:
        print(f"Erro ao enviar arquivo para o S3: {e}")

# Capturar processos da máquina e enviar ao banco
def capturar_processos():
    banco = conectarDb()
    cursor = banco.cursor()

    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_info']):
        try:
            pid = proc.info['pid']
            nome = proc.info['name']
            cpu = proc.info['cpu_percent']
            mem_mb = proc.info['memory_info'].rss / 1024 / 1024
            disk_mb = 0.0  # Simulação: psutil não captura dados de disco por processo diretamente

            query = """INSERT INTO Processos (pId, nomeProcesso, cpu_percent, memory_mb, disk_mb, fkTotem)
                       VALUES (%s, %s, %s, %s, %s, %s)"""
            val = (pid, nome, cpu, mem_mb, disk_mb, idTotem)
            cursor.execute(query, val)
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue

    banco.commit()
    print("Processos inseridos no banco de dados.")

# Inserir desempenho no banco de dados
def inserir_desempenho(cpu_usage, cpu_freq, memory_usage, memory_total, disk_usage, disk_total, fkTotem):
    banco = conectarDb()
    cursor = banco.cursor()
    
    # Calcular percentuais
    memory_perc = (memory_usage / memory_total) * 100
    disk_perc = (disk_usage / disk_total) * 100
    
    # Inserir na tabela Desempenho
    query = """
        INSERT INTO Desempenho (cpu_usage, cpu_freq, memory_usage, memory_total, memory_perc, 
                                disk_usage, disk_total, disk_perc, fkTotem)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    valores = (cpu_usage, cpu_freq, memory_usage, memory_total, memory_perc, 
               disk_usage, disk_total, disk_perc, fkTotem)
    cursor.execute(query, valores)
    banco.commit()
    print("Desempenho registrado no banco de dados.")

# Atualização da função monitorar para incluir a inserção em Desempenho
def monitorar():
    dados_capturados = []
    countCPU = 0
    countMEM = 0
    countDSK = 0

    while True:
        cpu_usage = psutil.cpu_percent(interval=1)
        cpu_freq = psutil.cpu_freq().current

        memory_info = psutil.virtual_memory()
        memory_usage = memory_info.percent  # Em bytes
        memory_total = memory_info.total  # Em bytes

        disk = psutil.disk_usage('/')
        disk_usage = disk.percent  # Em bytes
        disk_total = disk.total  # Em bytes

        print("\n===============================")
        print(f"DADOS DA MÁQUINA - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("===============================\n")
        print(f"CPU: {cpu_usage:.2f}% | Frequência: {cpu_freq:.2f} MHz")
        print(f"Memória: {memory_usage / (1024 ** 3):.2f} GB de {memory_total / (1024 ** 3):.2f} GB ({(memory_usage / memory_total) * 100:.2f}%)")
        print(f"Disco: {disk_usage / (1024 ** 3):.2f} GB de {disk_total / (1024 ** 3):.2f} GB ({(disk_usage / disk_total) * 100:.2f}%)")

        # Inserir dados na tabela Desempenho
        inserir_desempenho(cpu_usage, cpu_freq, memory_usage, memory_total, disk_usage, disk_total, idTotem)

        # Verificar limites e agir
        if cpu_usage > limiteCPU:
            countCPU += 1
            if countCPU >= 5:
                inserir_alerta(idTotem, "CPU", cpu_usage)
                abrir_chamado_jira("CPU", "limite", cpu_usage)
                countCPU = 0
        else:
            countCPU = 0

        if memory_usage > limiteMEM:
            countMEM += 1
            if countMEM >= 5:
                inserir_alerta(idTotem, "Memória", memory_usage)
                abrir_chamado_jira("Memória", "limite", memory_usage)
                countMEM = 0
        else:
            countMEM = 0

        if disk_usage > limiteDSK:
            countDSK += 1
            if countDSK >= 5:
                inserir_alerta(idTotem, "Disco", disk_usage)
                abrir_chamado_jira("Disco", "limite", disk_usage)
                countDSK = 0
        else:
            countDSK = 0

        # Capturar dados para S3
        dados_capturados.append({
            'idMaquina': idTotem,
            'momento': datetime.now().strftime('%Y-%m-%dT%H:%M:%S'),
            'cpu_usage': cpu_usage,
            'cpu_freq': cpu_freq,
            'memory_usage': memory_usage,
            'memory_total': memory_total,
            'disk_usage': disk_usage,
            'disk_total': disk_total
        })

        # Inserir processos no banco
        capturar_processos()

        # Enviar para S3 a cada 10 ciclos
        if len(dados_capturados) >= 10:
            enviar_para_s3(dados_capturados)
            dados_capturados = []

        time.sleep(5)

# Iniciar monitoramento
monitorar()