import requests
from config import PERSPECTIVE_API_KEY

def check_toxicity(text):
    """Checks the toxicity of the given text using the Perspective API."""
    url = "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze"
    data = {
        "comment": {
            "text": text
        },
        "languages": ["en"],
        "requestedAttributes": {
            "TOXICITY": {}
        }
    }
    params = {
        "key": PERSPECTIVE_API_KEY
    }

    response = requests.post(url, params=params, json=data)
    response_data = response.json()

    toxicity_score = response_data['attributeScores']['TOXICITY']['summaryScore']['value']
    return toxicity_score