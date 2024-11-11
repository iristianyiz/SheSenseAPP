from flask import Flask, request, jsonify
from toxicity import check_toxicity
from notion_publisher import publish_content_to_notion
from confluence_publisher import publish_content_to_confluence 

app = Flask(__name__)

# Step 2: Moderation Logic
def moderate_and_publish_content(text):
    """Moderates content based on its toxicity and publishes it if it's safe."""
    toxicity_score = check_toxicity(text)

    # Set a toxicity threshold
    toxicity_threshold = 0.7

    if toxicity_score >= toxicity_threshold:
        print("Content flagged: Too toxic for publication.")
        return False  # Flagged for review
    else:
        print("Content accepted: Safe to publish.")
        # Call function to publish content to Notion or Confluence here
        publish_content_to_notion(text)  # Or publish_content_to_confluence(text)
        return True

@app.route('/api/submit-content', methods=['POST'])
def submit_content():
    """Handles content submission from users, moderates it, and publishes if safe."""
    data = request.json
    text = data.get('text', '')

    if not text:
        return jsonify({"success": False, "message": "No content provided."}), 400

    # Moderate content and publish if safe
    if moderate_and_publish_content(text):
        return jsonify({"success": True, "message": "Your content has been successfully published!"})
    else:
        return jsonify({"success": False, "message": "Your content was flagged for inappropriate language."})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)