// communitySupportRoute.js
const express = require('express');
const router = express.Router();

// POST route for community support (could be for posting a message)
router.post('/community-support', (req, res) => {
  const { message, user } = req.body;

  if (!message || !user) {
    return res.status(400).json({ error: 'Please provide a message and user info' });
  }

  // Simulating storing a community message (you would normally connect to a DB)
  res.status(200).json({
    message: 'Message posted to the community!',
    user: user,
    content: message,
  });
});

module.exports = router;
