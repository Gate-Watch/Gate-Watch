const express = require("express");
const router = express.Router();
const uptimeController = require("../../controllers/JV-CTRL/JV-UptimeController");

router.get("/semanal/:ano/:mes", uptimeController.obterDisponibilidadeSemanal);

router.get("/anos", uptimeController.obterAnosDisponiveis);
router.get("/meses/:ano", uptimeController.obterMesesDisponiveis);
router.get('/anoMesMaisRecente', uptimeController.obterAnoMesMaisRecente);


module.exports = router;
