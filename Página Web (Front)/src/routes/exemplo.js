var express = require("express");
var router = express.Router();

var exemploController = require("../controllers/exemploController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/exemplo", function (req, res) {
    exemploController.exemplo(req, res);
});

module.exports = router;