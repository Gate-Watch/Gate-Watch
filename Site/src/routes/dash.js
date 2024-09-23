const express = require('express');
const router = express.Router();
const dashController = require('../controllers/dashController');

router.get('/dashGerenteMetricas/media/:periodo', dashController.media);

module.exports = router;
