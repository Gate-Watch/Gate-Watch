const express = require('express');
const router = express.Router();
const graficoLinhaController = require('../../controllers/CAUECONTROLA/graficoLinhaController');


// Rota para buscar os totens
router.get('/totens/anoLinha', graficoLinhaController.getGraficoLinha);
router.get('/barraLateral', graficoLinhaController.getGraficoBarraLateral);
router.get('/graficoDonut', graficoLinhaController.getGraficoDonut);
router.get('/ultimoAlerta', graficoLinhaController.getUltimoAlerta);
router.get('/graficoComparacao', graficoLinhaController.getGraficoComparacao);
router.get('/anoComparacao', graficoLinhaController.getAnoComparacao );

module.exports = router;