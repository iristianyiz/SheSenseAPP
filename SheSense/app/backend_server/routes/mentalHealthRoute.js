// handle the routing for mental health-related functionalities, like receiving 
// journal entries and returning analysis results.

// routes/mentalHealth.js
import { Router } from 'express';
const router = Router();
import { analyzeSentiment, getResources, generateResponse } from '../services/mentalHealthService';

// POST route to analyze sentiment
router.post('/analyze', async (req, res) => {
  const { text } = req.body;

  try {
    // Analyze sentiment of the user's text
    const sentimentScore = await analyzeSentiment(text);
    const mood = sentimentScore < 0 ? 'negative' : 'positive';

    // Fetch resources if mood is negative
    let resources = [];
    if (mood === 'negative') {
      resources = await getResources(mood);
    }

    // Generate response based on sentiment and resources
    const responseMessage = await generateResponse(sentimentScore, resources);

    // Return the analysis results
    res.json({
      sentimentScore,
      mood,
      resources,
      responseMessage,
    });
  } catch (error) {
    console.error('Error during sentiment analysis:', error);
    res.status(500).send('Error processing sentiment analysis');
  }
});

export default router;