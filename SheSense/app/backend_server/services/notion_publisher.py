from notion_client import Client # type: ignore
from config import NOTION_TOKEN, NOTION_DATABASE_ID

notion = Client(auth=NOTION_TOKEN)

def publish_content_to_notion(content):
    """Publishes the given content to Notion."""
    database_id = NOTION_DATABASE_ID

    # Create a new page in Notion
    notion.pages.create(
        parent={"database_id": database_id},
        properties={
            "Title": {
                "title": [{"text": {"content": "Health Tip Submission"}}]
            },
            "Content": {
                "rich_text": [{"text": {"content": content}}]
            }
        }
    )
    print("Content successfully published to Notion!")
