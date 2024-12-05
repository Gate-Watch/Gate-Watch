const express = require('express');
const router = express.Router();
const dashRankController = require('../../controllers/CAUECONTROLA/dashRankController');
const { route } = require('./graficoLinhaRotas');


// Rota para buscar os totens
router.get('/totens', dashRankController.getTotens);
router.get('/quantidadeTotens', dashRankController.getQuantidadeTotem);
router.get('/processosWordCloud', dashRankController.getProcessosWordCloud);
router.get('/anoDisponivelWord', dashRankController.getAnoDisponivelWord);
router.get('/anoDisponivelGraficoLinha', dashRankController.getAnoDisponivelGraficoLinha);
router.get('/anoDisponivelBarraLateral', dashRankController.getAnoDisponivelGraficoBarrasLateral);
router.get('/mesDisponivelBarraLateral', dashRankController.getMesDisponivelGraficoBarrasLateral);

module.exports = router;    
