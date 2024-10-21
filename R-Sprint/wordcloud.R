#### bibliotecas necessárias
install.packages("tm")
install.packages("wordcloud")
install.packages("RColorBrewer")

#### carregar bibliotecas
library(tm)
library(wordcloud)
library(RColorBrewer)
library(readr)

#### carregar arquivo csv
dadosProcessos <- read_csv("C:/Users/Aluno/Documents/Gate-Watch/R-Sprint/tasks3.csv")
head(dadosProcessos)

#### remover processos de sistema
processosSistema <- c("System", "Idle", "Registry", "smss.exe", "csrss.exe", "wininit.exe", "services.exe", "lsass.exe")

##### filtrar os processos que não são do sistema
dadosFiltrados <- dadosProcessos[!dadosProcessos$Nome_da_Imagem %in% processosSistema,]

#### exibir dados filtrados
View(dadosFiltrados)

### corpo a partir do df filtrado
corpo = Corpus(VectorSource(dadosFiltrados$Nome_da_Imagem))

#### tratamento de texto
corpo = tm_map(corpo, removePunctuation)
corpo = tm_map(corpo, removeNumbers)
corpo = tm_map(corpo, content_transformer(tolower))

#### criar a matriz de termos
tdm <- TermDocumentMatrix(corpo)
m <- as.matrix(tdm)

#### calcular a frequência das palavras e ordenar
frequenciaPalavras <- sort(rowSums(m), decreasing = TRUE)

#### criar data frame
dados_frequenciaPalavras <- data.frame(word = names(frequenciaPalavras), freq = frequenciaPalavras)

# plotar a wordcloud
wordcloud(words = dados_frequenciaPalavras$word, 
          freq = dados_frequenciaPalavras$freq, 
          min.freq = 0, 
          max.words = 20, 
          random.order = FALSE, 
          rot.per = 0.2, 
          scale = c(5, 0.5), 
          colors = brewer.pal(8, "Dark2"))
