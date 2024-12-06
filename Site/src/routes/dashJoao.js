var express = require("express");
var router = express.Router();

var dashJoaoController = require("../controllers/dashJoaoController");

router.get("/dashCpu", function (req, res) {
    dashJoaoController.dashCpu(req, res);
});
router.get("/dashCpu2", function (req, res) {
    dashJoaoController.dashCpu2(req, res);
});
router.get("/dashCpu3", function (req, res) {
    dashJoaoController.dashCpu3(req, res);
});

router.get("/dashRam", function (req, res) {
    dashJoaoController.dashRam(req, res);
});
router.get("/dashRam2", function (req, res) {
    dashJoaoController.dashRam2(req, res);
});
router.get("/dashRam3", function (req, res) {
    dashJoaoController.dashRam3(req, res);
});

router.get("/dashDisco", function (req, res) {
    dashJoaoController.dashDisco(req, res);
});
router.get("/dashDisco2", function (req, res) {
    dashJoaoController.dashDisco2(req, res);
});
router.get("/dashDisco3", function (req, res) {
    dashJoaoController.dashDisco3(req, res);
});

router.get("/alertas", function (req, res) {
    dashJoaoController.alerta(req, res);
});

router.post("/atualizarStatus/:idAlerta", function (req, res) {
    usuarioController.pontos(req, res);
})

module.exports = router;
