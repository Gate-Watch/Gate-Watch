const express = require('express');
const router = express.Router();
const dashController = require('../controllers/dashController');

router.get('/diaria', dashController.getMetricasDiaria);
router.get('/semanal', dashController.getMetricasSemanal);
router.get('/mensal', dashController.getMetricasMensal);

router.get('/totem/:codigo_serie', dashController.getMetricasTotem);

module.exports = router;
