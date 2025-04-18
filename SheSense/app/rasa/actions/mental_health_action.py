
# version 1: a. Chatbot integration: fully integrated with Rasa
#            b. Personalization/Conversation: designed for dialog interaction (improved)

import random
import requests
from rasa_sdk import Action
from google.cloud import language_v1

def analyze_sentiment(text):
    """Analyzes text for sentiment."""
    client = language_v1.LanguageServiceClient()
    request = {
        "document": {
            "content": text,
            "type_": language_v1.Document.Type.PLAIN_TEXT,
        }
    }
    response = client.analyze_sentiment(request=request)
    score = response.document_sentiment.score
    return score

def get_resources(mood):
    """Fetches articles and podcasts based on mood."""
    if mood == "negative":
        try:
            # Example API calls (replace with actual URLs and API keys)
            articles = requests.get("https://www.healthline.com/search?q1=mood").json()
            podcasts = requests.get("https://open.spotify.com/search/mental%20health").json()

            # Check if we received articles or podcasts
            article_titles = [article['title'] for article in articles.get('articles', [])]
            podcast_titles = [podcast['title'] for podcast in podcasts.get('results', [])]

            # If no resources found, return None
            if not article_titles and not podcast_titles:
                return None

            return article_titles[:3], podcast_titles[:3]  # Limit to top 3
        except Exception:
            # In case of an error (e.g., network issue), return None
            return None
    return [], []

class ActionAnalyzeSentiment(Action):
    def name(self) -> str:
        return "action_analyze_sentiment"

    def run(self, dispatcher, tracker, domain):
        user_text = tracker.latest_message.get('text')
        sentiment_score = analyze_sentiment(user_text)

        # Define responses
        negative_responses = [
            "It seems like you're having a tough day. Let’s try some relaxation techniques: meditation, yoga, or keeping a diary.",
            "Why don't you try some deep breathing exercises? It can help calm your nerves.",
            "Taking a short walk can also help clear your mind. Maybe go for a stroll outside.",
        ]
        positive_responses = [
            "That's great to hear! Keep up the good work.",
            "You're doing amazing! Celebrate your accomplishments.",
            "Keep spreading positivity! It's contagious.",
        ]
        # Choose a response based on sentiment score
        if sentiment_score < 0:
            resources = get_resources("negative")
            if resources:
                articles, podcasts = resources
                response = "It seems like you're having a tough day. Here are some resources that might help:\n"
                if articles:
                    response += "### Articles:\n" + "\n".join(articles) + "\n"
                if podcasts:
                    response += "### Podcasts:\n" + "\n".join(podcasts) + "\n"
            else:
                # Fallback to YouTube classical music page
                response = (
                    "I couldn't find specific resources, but you might enjoy some calming classical music. "
                    "You can explore a variety of soothing tracks on YouTube. "
                    "Listen to classical music [here](https://www.youtube.com/results?search_query=classical+music)."
                )
        else:
            response = random.choice(positive_responses)

        dispatcher.utter_message(text=response)
        return []