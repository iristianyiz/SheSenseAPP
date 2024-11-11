// moodTrackingRoute.js
const express = require('express');
const router = express.Router();

// POST route for mood tracking
router.post('/mood-tracking', (req, res) => {
  const { mood, date } = req.body;

  if (!mood || !date) {
    return res.status(400).json({ error: 'Please provide mood and date' });
  }

  // Store or process the mood data (this can be connected to a database)
  res.status(200).json({
    message: 'Mood data submitted successfully!',
    mood: mood,
    date: date,
  });
});

module.exports = router;
