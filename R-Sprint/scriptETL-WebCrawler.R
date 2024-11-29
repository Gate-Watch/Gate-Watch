# Tratamento do raw pro trusted dos dados de movimentacao

caminho_arquivo <- "C:\\Users\\Samsung\\Downloads\\DadosCompletosMovimentacao (1).csv"

dados1 <- read.csv(caminho_arquivo, stringsAsFactors = FALSE, sep = ";", fileEncoding = "UTF-8")

colnames(dados1)

dados_movimentacao <- subset(dados1, select = -c(`Aeronave..un.`, `Carga.aérea..kg.`, `Mala.postal..kg.`, `Grupo.de.voo`, `Município.UF`))

dados_movimentacao <- subset(dados_movimentacao, `Sentido` != "Desembarque")

dados_movimentacao <- subset(dados_movimentacao, `Passageiro..un.` != "NA")

library(dplyr)

dados_movimentacao <- rename(dados_movimentacao, `Tipo de Voo` = `Tipo.de.voo`)

dados_movimentacao <- rename(dados_movimentacao, `Passageiro (un)` = `Passageiro..un.`)

caminho_novo_arquivo <- "C:/Users/Admin/Downloads/DadosCompletosMovimentacaoTrusted.csv"

write.csv(dados_movimentacao, caminho_novo_arquivo, row.names = FALSE, fileEncoding = "UTF-8")


#######################################################

# Tratamento do raw pro trusted dos dados dos consumidores

caminho_arquivo <- "C:/Users/Admin/Downloads/dadosconsumidor2023.csv"

dados2 <- read.csv(caminho_arquivo, sep = ";", quote = "\"", header = TRUE, stringsAsFactors = FALSE, skip = 1, fill = TRUE)

dados_consumidores <- subset(dados2, select = -c(
  Gestor, UF, Data.e.Hora.Resposta, Data.Finalização, Prazo.Resposta,
  Prazo.Análise.Gestor..em.dias., Procurou.Empresa, Respondida, 
  Avaliação.Reclamação, Nota.do.Consumidor, Edição.de.Conteúdo, 
  Interação.do.Gestor, Código.Classificador.ANAC,
  Data.e.Hora.Análise, Data.e.Hora.Recusa, Tempo.Resposta..em.dias.
))

colnames(dados_consumidores)

dados_consumidores <- rename(dados_consumidores, `Ano Abertura` = `Ano.Abertura`)

dados_consumidores <- rename(dados_consumidores, `Mês Abertura` = `Mês.Abertura`)

dados_consumidores <- rename(dados_consumidores, `Data Abertura` = `Data.Abertura`)

dados_consumidores <- rename(dados_consumidores, `Nome Abertura` = `Nome.Fantasia`)

dados_consumidores <- rename(dados_consumidores, `Grupo Problema` = `Grupo.Problema`)

dados_consumidores <- rename(dados_consumidores, `Forma de Contato` = `Forma.Contrato`)

write.csv(dados_consumidores, "C:/Users/Admin/Downloads/DadosConsumidoresTrusted.csv", row.names = FALSE)

cat("Arquivo CSV modificado salvo com sucesso!")

#######################################################

# Tratamento do trusted pro client dos dados de movimentacao

dados_movimentacao <- subset(dados_movimentacao, `ICAO` == "SBGR")

write.csv(dados_movimentacao, "C:/Users/knogu/Downloads/DadosCompletosMovimentacaoClient.csv", row.names = FALSE)

#######################################################

# Tratamento do trusted pro client dos dados dos consumidores

dados_consumidores <- subset(dados_consumidores, `Cidade` == "Guarulhos")

write.csv(dados_consumidores, "C:/Users/Admin/Downloads/DadosConsumidoresClient.csv", row.names = FALSE)

########################################################

# Gráfico de evolução de 2004 à 2024

library(dplyr)
library(ggplot2)

# Agrupar os dados por ano e somar os passageiros
dados_anuais <- dados_movimentacao %>%
  group_by(Ano) %>%
  summarise(Total_Passageiros = sum(`Passageiro (un)`))

# Gerar o gráfico de linha com os ajustes
ggplot(dados_anuais, aes(x = Ano, y = Total_Passageiros)) +
  geom_line(color = "blue", size = 1) +
  geom_point(color = "red", size = 2) +
  labs(title = "Movimentação Anual de Passageiros", x = "Ano", y = "Total de Passageiros") +
  scale_y_continuous(labels = scales::comma, limits = c(0, 25000000)) +  
  scale_x_continuous(breaks = dados_anuais$Ano) + 
  theme_minimal()

# Gráfico de movimentação mensal de passageiros do ano de 2024

library(ggplot2)
library(dplyr)
library(scales)

# Filtrar dados para o ano de 2024
dados_2024 <- dados_movimentacao %>%
  filter(Ano == 2024)

# Agrupar e somar por Tipo de Voo e Mês
dados_mensais <- dados_2024 %>%
  group_by(`Tipo de Voo`, Mês) %>%
  summarise(Total_Passageiros = sum(`Passageiro (un)`, na.rm = TRUE))

# Ordenar os meses na ordem correta
dados_mensais$Mês <- factor(dados_mensais$Mês, levels = c(
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
  "Julho", "Agosto", "Setembro"
))

# Verificar se há dados faltantes
dados_mensais <- na.omit(dados_mensais)

# Plotar o gráfico com ggplot
ggplot(dados_mensais, aes(x = Mês, y = Total_Passageiros, fill = `Tipo de Voo`)) +
  geom_bar(stat = "identity", position = "dodge") +
  labs(
    title = "Movimentação Mensal de Passageiros no Aeroporto de Guarulhos 2024",
    x = "Mês",
    y = "Passageiros (un)"
  ) +
  scale_y_continuous(labels = scales::comma, limits = c(0, 1500000)) +  # Aumentado para 1.400.000
  scale_fill_manual(values = c("Doméstico" = "#18204b", "Internacional" = "#006494")) +
  theme(axis.text.x = element_text(angle = 45, hjust = 1))
  




















