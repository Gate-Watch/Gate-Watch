const express = require('express');
const controller = require('../controllers/dashCerejoController');
const router = express.Router();

// Rota para obter a frequência de processos
router.get('/frequencia', controller.getProcessFrequency);

// Rota para obter o total de CPU por processo
router.get('/cpu', controller.getProcessCpuUsage);

// Rota para obter o total de processos
router.get('/totalProcessos', controller.getTotalProcessCount);

module.exports = router;
