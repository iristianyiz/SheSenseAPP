// Business Logic Layer
// contains the logic for sentiment analysis and fetching resources. 
// It interacts with Google Cloud Natural Language API and external APIs.

// version 2: 
// mentalHealthService.js
const { LanguageServiceClient } = require('@google-cloud/language');
const { get } = require('axios');

// Sentiment analysis function using Google Cloud NLP
class MentalHealthService {
  static async analyzeSentiment(text) {
    const client = new LanguageServiceClient();
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    const [result] = await client.analyzeSentiment({ document });
    return result.documentSentiment.score;  // Return sentiment score
  }

  // Fetch resources (articles, podcasts) if the mood is negative
  static async getResources(mood) {
    if (mood === 'negative') {
      try {
        const articlesResponse = await get('https://www.healthline.com/search?q1=mood');
        const podcastsResponse = await get('https://open.spotify.com/search/mental%20health');
        
        return {
          articles: articlesResponse.data.slice(0, 3),  // Return top 3 articles
          podcasts: podcastsResponse.data.slice(0, 3),  // Return top 3 podcasts
        };
      } catch (error) {
        console.error('Error fetching resources:', error);
        return null;
      }
    }
    return null;
  }

  // Generate a response based on sentiment and resources
  static async generateResponse(sentimentScore, resources) {
    if (sentimentScore < 0) {
      let responseMessage = `It seems like you're having a tough day. Here are some resources that might help:\n`;

      // Check if resources are available
      if (resources) {
        if (resources.articles && resources.articles.length > 0) {
          responseMessage += `### Articles:\n${resources.articles.join('\n')}\n`;
        }
        if (resources.podcasts && resources.podcasts.length > 0) {
          responseMessage += `### Podcasts:\n${resources.podcasts.join('\n')}\n`;
        }
      }

      // Fallback if no resources found
      if (!resources || (!resources.articles && !resources.podcasts)) {
        responseMessage = (
          "I couldn't find specific resources, but you might enjoy some calming classical music. "
          + "You can explore a variety of soothing tracks on YouTube. "
          + "Listen to classical music [here](https://www.youtube.com/results?search_query=classical+music)."
        );
      }

      return responseMessage;
    } else {
      // Positive response logic
      const positiveResponses = [
        "That's great to hear! Keep up the good work.",
        "You're doing amazing! Celebrate your accomplishments.",
        "Keep spreading positivity! It's contagious.",
      ];
      return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    }
  }
}

module.exports = MentalHealthService;
