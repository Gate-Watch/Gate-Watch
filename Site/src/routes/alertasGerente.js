var express = require("express");
var router = express.Router();

var alertasGerenteController = require("../controllers/alertasGerenteController");

// Rota para listar os totens, recebendo o parâmetro 'fkCompanhia'
router.get("/listarTotens/:fkCompanhia/:mesSelecionado", function (req, res) {
  alertasGerenteController.listarTotens(req, res); // Chama a função no controlador
});

router.get("/totemMaiorAlerta/:fkCompanhia/:mesSelecionado", function (req, res) {
    alertasGerenteController.totemMaiorAlerta(req, res); // Chama a função no controlador
  });

router.get("/diaMaiorAlerta/:fkCompanhia/:mesSelecionado", function (req, res) {
    alertasGerenteController.diaMaiorAlerta(req, res); // Chama a função no controlador
  });

router.get("/listarMeses/:fkCompanhia", function (req, res) {
    alertasGerenteController.listarMeses(req, res); // Chama a função no controlador
  });




// Rotas que estão plotando os gráficos
router.get("/gerarGraficoPassageirosPorMes", function (req, res) {
  alertasGerenteController.gerarGraficoPassageirosPorMes(req, res); // Chama a função no controlador
});

router.get("/gerarGraficoFrequenciaAlertas/:fkCompanhia/:mesSelecionado/:totemSelecionado", function (req, res) {
  alertasGerenteController.gerarGraficoFrequenciaAlertas(req, res); // Chama a função no controlador
});

module.exports = router;
