// handle the routing for mental health-related functionalities, like receiving 
// journal entries and returning analysis results.

const express = require('express');
const router = express.Router();
const { analyzeSentiment, getResources } = require('./mentalHealthService');

// POST route to analyze sentiment
router.post('/analyze', async (req, res) => {
    const { text } = req.body;
    try {
        // Analyze sentiment of the user’s text
        const sentimentScore = await analyzeSentiment(text);
        const mood = sentimentScore < 0 ? 'negative' : 'positive';

        // Fetch resources if mood is negative
        const resources = mood === 'negative' ? await getResources(mood) : [];

        // Prepare the response based on sentiment
        let responseMessage = '';
        if (mood === 'negative' && resources) {
            responseMessage = `It seems like you're having a tough day. Here are some resources that might help:\n`;
            if (resources.articles) responseMessage += `### Articles:\n${resources.articles.join('\n')}\n`;
            if (resources.podcasts) responseMessage += `### Podcasts:\n${resources.podcasts.join('\n')}\n`;
        } else {
            const positiveResponses = [
                "That's great to hear! Keep up the good work.",
                "You're doing amazing! Celebrate your accomplishments.",
                "Keep spreading positivity! It's contagious.",
            ];
            responseMessage = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
        }

        res.json({ sentimentScore, mood, resources, responseMessage });
    } catch (error) {
        console.error('Error during sentiment analysis:', error);
        res.status(500).send('Error processing sentiment analysis');
    }
});

module.exports = router;
