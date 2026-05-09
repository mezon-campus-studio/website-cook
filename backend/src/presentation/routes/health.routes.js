const express = require('express');
const { HealthController } = require('../controllers/health.controller');

const router = express.Router();

const controller = new HealthController();

router.get('/', controller.getHealth.bind(controller));

const healthRouter = router;

module.exports = { healthRouter };

