# SheSense Rasa Chatbot

This is the conversational AI component of the **SheSense** health monitoring app, powered by [Rasa](https://rasa.com/). The chatbot provides personalized, empathetic mental health support by analyzing user input with Google Cloud Natural Language API and dynamically responding based on sentiment.

---

## 📁 Project Structure
rasa/
├── actions/
│   └── mental_health_action.py     # Custom Rasa action for sentiment-aware replies
├── data/
│   ├── nlu.yml                     # User intent and example phrases
│   ├── rules.yml                   # Rule-based dialogue logic
│   └── stories.yml                 # Conversational stories
├── domain.yml                      # Intents, entities, responses, actions
├── config.yml                      # NLP pipeline and policies
├── endpoints.yml                   # Action server endpoint config

---

## Features

- **Intent recognition**: Detects mood-related phrases via Rasa NLU.
- **Sentiment analysis**: Integrates Google Cloud NLP to evaluate user emotional tone.
- 💬 **Dynamic replies**: Sends uplifting messages or suggests resources based on sentiment score.
- **Expandable**: Can connect to the Node.js backend or be embedded in the mobile app.

---

## Installation & Setup

> Make sure you have Python ≥ 3.8 and Rasa ≥ 3.1 installed.

# Install dependencies
pip install rasa
pip install google-cloud-language

How to Run

1. Train the model
rasa train
2. Start the custom action server (in a new terminal)
rasa run actions
3. Talk to the bot!
rasa shell

- API Key Setup (Google NLP)
This bot uses Google Cloud’s Natural Language API.
	1.	Set up your Google Cloud project.
	2.	Download your service account JSON key.
	3.	Set the environment variable before running the action server:

# bash
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your-key.json

Connecting to Frontend / Backend
If you’d like to connect this bot to your Node.js backend or React frontend:
	•	Use Rasa REST API
	•	Or embed the bot with rasa-webchat in your frontend

Author
Created as part of the Google Women Techmakers Hackathon 2024, by Iris Zhang and team. ✨