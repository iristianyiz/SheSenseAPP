// the Main Server File

import express from 'express';
import { json } from 'body-parser';
const app = express();

import connectDB from './db.js';
connectDB(); // <- establishes connection at server start

// Import route modules
import symptomCheckerRoute from './routes/symptomCheckerRoute';
import communitySupportRoute from './routes/communitySupportRoute';
import healthMonitoringRoute from './routes/healthMonitoringRoute';
import mentalHealthRoutes from './routes/mentalHealthRoute';

// Middleware to parse JSON request bodies
app.use(json());

// Mount routes at different paths
app.use('/api', symptomCheckerRoute);  // Handles routes under /api/symptom-checker
app.use('/api', communitySupportRoute); // Handles routes under /api/community-support
app.use('/api', healthMonitoringRoute); // Handles routes under /api/health-monitoring
app.use('/api/mentalHealth', mentalHealthRoutes); // Mental health route

// Root endpoint for health check or other info (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Health App API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

