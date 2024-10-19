# Instalar bibliotecas necessárias
install.packages("tm")
install.packages("wordcloud")
install.packages("RColorBrewer")

# Carregar as bibliotecas
library(tm)
library(wordcloud)
library(RColorBrewer)
library(readr)

# Carregar o arquivo CSV
dados_processos <- read_csv("C:/Users/Glauro/Documents/Gate-Watch/R-Sprint/tasks3.csv")

# Visualizar as primeiras linhas do arquivo
head(dados_processos)

# Filtrar para remover processos de sistema
processos_excluidos <- c("System", "Idle", "Registry", "smss.exe", "csrss.exe", "wininit.exe", "services.exe", "lsass.exe")

# Filtrar os processos que não são do sistema
dados_filtrados <- dados_processos[!dados_processos$Nome_da_Imagem %in% processos_excluidos,]

# Exibir os dados filtrados para conferir
View(dados_filtrados)

# Criar o corpus a partir dos nomes dos processos
corpo = Corpus(VectorSource(dados_filtrados$Nome_da_Imagem))

# Tratamento do texto
corpo = tm_map(corpo, removePunctuation)
corpo = tm_map(corpo, removeNumbers)
corpo = tm_map(corpo, content_transformer(tolower))

# Criar a matriz de termos
tdm <- TermDocumentMatrix(corpo)
m <- as.matrix(tdm)

# Calcular a frequência das palavras e ordenar
frequencia_palavras <- sort(rowSums(m), decreasing = TRUE)

# Converter para data frame
frequencia_palavras_df <- data.frame(word = names(frequencia_palavras), freq = frequencia_palavras)

# Exibir a word cloud
wordcloud(words = frequencia_palavras_df$word, 
          freq = frequencia_palavras_df$freq, 
          min.freq = 0, 
          max.words = 200, 
          random.order = FALSE, 
          rot.per = 0.2, 
          scale = c(5, 0.5), 
          colors = brewer.pal(8, "Dark2"))
