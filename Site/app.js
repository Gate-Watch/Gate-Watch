// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();    

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuario");
var dashRegressaoRouter = require("./src/routes/dashRegressao");
var dashJoaoRouter = require("./src/routes/dashJoao");
var alertasGerenteRouter = require("./src/routes/alertasGerente")
var dashCerejoRouter = require("./src/routes/dashCerejo")
const percentualAlertasRoutes = require("./src/routes/JV-ROTAS/JV-PercentualAlertasRoutes");
const horaRoutes = require("./src/routes/JV-ROTAS/JV-HoraRota");
const estaRoutes = require("./src/routes/JV-ROTAS/JV-EstabilidadeRota")
const uptimeRoutes = require("./src/routes/JV-ROTAS/JV-UptimeRota");
const alertaRotas = require("./src/routes/JV-ROTAS/JV-AlertasRotas")
const caueRoutes = require("./src/routes/caueRoutes/caue")
const graficoLinhaRoutes = require ("./src/routes/caueRoutes/graficoLinhaRotas")



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);
app.use("/dashRegressao", dashRegressaoRouter);
app.use("/dashJoao", dashJoaoRouter);
app.use("/alertasGerente", alertasGerenteRouter);
app.use("/dashCerejo", dashCerejoRouter);
app.use("/api", percentualAlertasRoutes);
app.use("/api", horaRoutes);
app.use("/api", estaRoutes);
app.use("/api", uptimeRoutes);
app.use("/api", alertaRotas);
app.use("/apiCaue", caueRoutes);
app.use("/apiGraficoLinha", graficoLinhaRoutes);

app.listen(PORTA_APP, function () {
    console.log(`
     ____    _  _____ _____  __        ___  _____ ____ _   _ 
    / ___|  / \\|_   _| ____| \\ \\      / / \\|_   _/ ___| | | |
    | |  _  / _ \\ | | |  _|    \\ \\ /\\ / / _ \\ | || |   | |_| |
    | |_| |/ ___ \\| | | |___    \\ V  V / ___ \\| || |___|  _  |
    \\____/_/   \\_\\_| |_____|    \\_/\\_/ /   \\_\\_| \\____|_| |_|                                                          
                                                                                                 
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
