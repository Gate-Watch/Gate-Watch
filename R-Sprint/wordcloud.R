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
dadosProcessosT1 <- read_csv("C:/Users/Aluno/Documents/Gate-Watch/R-Sprint/tasksT1.csv")
head(dadosProcessosT1)

dadosProcessosT2 <- read_csv("C:/Users/Aluno/Documents/Gate-Watch/R-Sprint/tasksT2.csv")
head(dadosProcessosT2)

dadosProcessosT3 <- read_csv("C:/Users/Aluno/Documents/Gate-Watch/R-Sprint/tasksT3.csv")
head(dadosProcessosT3)

#### juntar os dados dos processos
dadosProcessos <- rbind(dadosProcessosT1, dadosProcessosT2, dadosProcessosT3)

#### remover processos de sistema
processosSistema <- c("System", "Idle", "Registry", "smss.exe", "csrss.exe", "wininit.exe", "services.exe", "lsass.exe", "svchost.exe")

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
num_cores <- min(8, nrow(dados_frequenciaPalavras))  # Ajusta o número de cores para o menor entre 8 ou o número de palavras
cores <- brewer.pal(num_cores, "Dark2")

wordcloud(words = dados_frequenciaPalavras$word, 
          freq = dados_frequenciaPalavras$freq, 
          min.freq = 1,  # ajuste conforme necessário
          max.words = 15,  # mais palavras para dar um efeito mais denso
          random.order = FALSE, 
          rot.per = 0.2,  # mais inclinação nas palavras
          scale = c(3, 0.5),  # escala de tamanhos
          colors = rep(cores, length.out = nrow(dados_frequenciaPalavras)),  # Garante que tenhamos cores suficientes
          family = "mono",  # tipo de fonte
          ordered.colors = TRUE,  # para que as cores sejam ordenadas pela frequência
          use.r.layout = FALSE)  # estilo de layout
