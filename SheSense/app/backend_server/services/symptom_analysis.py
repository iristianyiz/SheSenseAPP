# /backend/services/symptom_analysis.py
#  a Python script that will handle tokenizing the input and querying the Mayo Clinic API.
#  This script will receive the text from your Node.js backend, process it, and return 
#  the results as a JSON response.

import sys
import json
import requests
from google.cloud import language_v1

def query_mayo_clinic_api(symptom_keywords):
    """Queries the Mayo Clinic API for potential conditions based on symptoms."""
    url = "https://api.mayoclinic.org/v1/conditions"  # Adjust based on actual endpoint
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",  # Replace with actual API key
        "Accept": "application/json",
    }
    # You might need to adjust the query parameters based on the API documentation
    params = {
        "query": ', '.join(symptom_keywords)  # Example of sending keywords as query
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        # Parse the response JSON
        conditions = response.json().get("conditions", [])
        return [condition["name"] for condition in conditions]  # Adjust based on actual response structure
    else:
        print(f"Error: {response.status_code}")
        return []

def analyze_symptoms(text):
    """Analyzes text for symptoms and returns potential conditions."""
    client = language_v1.LanguageServiceClient()

    # Construct a request for the AnalyzeSyntax API.
    request = {
        "document": {
            "content": text,
            "type_": language_v1.Document.Type.PLAIN_TEXT,
        }
    }

    response = client.analyze_syntax(request=request)

    keywords = []
    entities = []
    for token in response.tokens:
        keywords.append(token.text.content)
        for entity_mention in token.entity_mentions:
            entities.append(entity_mention.text.content)

    # Query the Mayo Clinic API for potential conditions
    potential_conditions = query_mayo_clinic_api(keywords)

    return potential_conditions

if __name__ == "__main__":
    input_text = sys.argv[1]  # Get the text passed from Node.js
    potential_conditions = analyze_symptoms(input_text)

    # Print the result as a JSON string for Node.js to handle
    print(json.dumps({"conditions": potential_conditions}))
