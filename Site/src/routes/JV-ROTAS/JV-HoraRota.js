const express = require("express");
const router = express.Router();
const horaController = require("../../controllers/JV-CTRL/JV-HoraCTRL");

router.get("/hora-picos", horaController.calcularFaixaHorarioMaiorUso);

module.exports = router;
