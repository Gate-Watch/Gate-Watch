const express = require('express');
const router = express.Router();
const regressaoController = require('../controllers/regressaoController');

router.get('/semanal', regressaoController.getMetricasSemanal);

module.exports = router;
