const express = require("express");
const router = express.Router();
const alertaController = require("../../controllers/JV-CTRL/JV-AlertasController");

router.get("/top5", alertaController.totenAlertas5);

module.exports = router;
