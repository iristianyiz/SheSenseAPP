import requests
from requests.auth import HTTPBasicAuth
from config import CONFLUENCE_URL, CONFLUENCE_USERNAME, CONFLUENCE_API_TOKEN

def publish_content_to_confluence(content):
    """Publishes the given content to Confluence."""
    data = {
        "type": "page",
        "title": "Health Tip Submission",
        "ancestors": [{"id": "parent_page_id"}],  # Add parent page ID if needed
        "body": {
            "storage": {
                "value": f"<h2>{content}</h2>",
                "representation": "storage"
            }
        }
    }

    response = requests.post(
        CONFLUENCE_URL,
        auth=HTTPBasicAuth(CONFLUENCE_USERNAME, CONFLUENCE_API_TOKEN),
        json=data
    )

    if response.status_code == 200:
        print("Content successfully published to Confluence!")
    else:
        print(f"Failed to publish content to Confluence. Status code: {response.status_code}")
