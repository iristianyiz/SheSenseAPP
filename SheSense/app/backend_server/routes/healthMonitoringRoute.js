// backend_server/routes/healthDataRoute.js
// This will house endpoints for logging and retrieving health data.

const express = require('express');
const router = express.Router();
const healthMonitoringService = require('../services/healthMonitoringService');

// Endpoint to log health data
router.post('/log', async (req, res) => {
    try {
        const healthData = req.body;
        await healthMonitoringService.logHealthData(healthData);
        res.status(201).send('Health data logged successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Endpoint to get health data for a user
router.get('/data/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const data = await healthMonitoringService.getHealthData(userId);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Additional routes for trend analysis and predictive analytics: 

module.exports = router;