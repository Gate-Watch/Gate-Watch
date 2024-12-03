const express = require("express");
const router = express.Router();
const estabilidadeController = require("../../controllers/JV-CTRL/JV-EstabilidadeCTRL");

router.get("/estabilidade", estabilidadeController.calcularMedia);

module.exports = router;
