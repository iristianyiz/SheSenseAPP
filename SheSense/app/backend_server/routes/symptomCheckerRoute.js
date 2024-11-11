// Step 2: Handling the Symptom Input (Backend)
// /backend/routes/symptomCheckerRoute.js
const express = require('express');
const router = express.Router();
const { analyzeSymptomsWithPython } = require('../services/symptomAnalysis');  // Import the Python integration

// POST route to handle symptom data
router.post('/symptom-checker', (req, res) => {
  const { symptoms } = req.body;

  // Validate input
  if (!symptoms || symptoms.length === 0) {
    return res.status(400).json({ message: 'Please provide symptoms' });
  }

  // Call the Python script to analyze the symptoms
  analyzeSymptomsWithPython(symptoms, (error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error processing symptoms', error });
    }

    // Return the conditions received from the Python script
    res.status(200).json({
      conditions: result.conditions,  // This is the result returned by the Python script
    });
  });
});

module.exports = router;
