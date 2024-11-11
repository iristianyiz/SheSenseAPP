// Business Logic Layer
// contains the logic for sentiment analysis and fetching resources. 
// It interacts with Google Cloud Natural Language API and external APIs.

const { LanguageServiceClient } = require('@google-cloud/language');
const axios = require('axios');

const analyzeSentiment = async (text) => {
    const client = new LanguageServiceClient();
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };
    const [result] = await client.analyzeSentiment({ document });
    return result.documentSentiment.score;
};

const getResources = async (mood) => {
    if (mood === 'negative') {
        try {
            // Fetch articles and podcasts (replace with actual URLs and API keys)
            const articlesResponse = await axios.get('https://api.example.com/articles?mood=negative');
            const podcastsResponse = await axios.get('https://api.example.com/podcasts?mood=negative');
            return {
                articles: articlesResponse.data.slice(0, 3),
                podcasts: podcastsResponse.data.slice(0, 3),
            };
        } catch (error) {
            console.error('Error fetching resources:', error);
            return null;
        }
    }
    return null;
};

module.exports = { analyzeSentiment, getResources };
