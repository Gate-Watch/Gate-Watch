const express = require('express');
const controller = require('../controllers/regressaoController');

const router = express.Router();

router.get('/semanal/:totem/:componente', controller.getMetricasPorTotemEComponente);
router.get('/ranking', controller.getRankingTotens);
router.get('/diario/:totem/:componente/:dia', controller.getDadosDiarios);

module.exports = router;