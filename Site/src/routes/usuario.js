var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", usuarioController.cadastrar);

router.post("/autenticar", usuarioController.autenticar);

router.post("/verificarCodigoSeguranca", usuarioController.verificarCodigoSeguranca);

module.exports = router;
