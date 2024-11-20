const express = require('express');
const controller = require('../controllers/regressaoController');

const router = express.Router();

router.get('/semanal/:totem/:componente', controller.getMetricasPorTotemEComponente);

module.exports = router;
