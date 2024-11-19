const express = require('express');
const controller = require('../controllers/regressaoController');

const router = express.Router();

router.get('/semanal', controller.getMetricasSemanal);

module.exports = router;
