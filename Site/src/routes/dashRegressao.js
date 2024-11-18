const express = require('express');
const controller = require('../controllers/regressaoController');

const router = express.Router();

router.get('/mediaSemanal', controller.getMetricasSemanal);

module.exports = router;
