// the Main Server File

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Import route modules
const symptomCheckerRoute = require('./routes/symptomCheckerRoute');
const communitySupportRoute = require('./routes/communitySupportRoute');
const healthMonitoringRoute = require('./routes/healthMonitoringRoute');
const mentalHealthRoutes = require('./routes/mentalHealthRoute');


// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Mount routes at different paths
app.use('/api', symptomCheckerRoute);  // Handles routes under /api/symptom-checker
app.use('/api', moodTrackingRoute);    // Handles routes under /api/mood-tracking
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
