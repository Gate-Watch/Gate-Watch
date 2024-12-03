var express = require("express");
var router = express.Router();

var alertaController = require("../../controllers/JV-CTRL/JV-PercentualAlertasCtrl");
router.get("/percentuais-alertas", alertaController.calcularPercentuaisAlertas);

module.exports = router;
