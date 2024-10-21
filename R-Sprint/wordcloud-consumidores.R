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
dadosConsumidores <- read_csv("C:/Users/Aluno/Documents/Gate-Watch/R-Sprint/DadosConsumidoresClient.csv")
head(dadosConsumidores)

#### exibir dados filtrados
View(dadosConsumidores)

### corpo a partir do df filtrado
corpo = Corpus(VectorSource(dadosConsumidores$`Grupo Problema`))

#### tratamento de texto
corpo = tm_map(corpo, removePunctuation)
corpo = tm_map(corpo, removeNumbers)
corpo = tm_map(corpo, content_transformer(tolower))
corpo = tm_map(corpo, removeWords,"sac")


#### criar a matriz de termos
tdm <- TermDocumentMatrix(corpo)
m <- as.matrix(tdm)

#### calcular a frequência das palavras e ordenar
frequenciaPalavras <- sort(rowSums(m), decreasing = TRUE)

#### criar data frame
dados_frequenciaPalavras <- data.frame(word = names(frequenciaPalavras), freq = frequenciaPalavras)

# plotar a wordcloud
num_cores <- min(8, nrow(dados_frequenciaPalavras))
cores <- brewer.pal(num_cores, "Dark2")

wordcloud(words = dados_frequenciaPalavras$word, 
          freq = dados_frequenciaPalavras$freq, 
          min.freq = 1,
          max.words = 100,
          random.order = FALSE, 
          rot.per = 0.2,
          scale = c(2, 0.5),
          colors = rep(cores, length.out = nrow(dados_frequenciaPalavras)),
          family = "mono",
          ordered.colors = TRUE,
          use.r.layout = FALSE)
