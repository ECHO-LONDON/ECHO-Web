import requests
import time
import json

API_URL = "https://mastodon.social/api/v1/timelines/tag/"
result = []

i = 0
for query in ["politics", "technology", "science", "food", "sports", "music", "art", "movies", "books", "gaming"]:

  last_id = None

  for _ in range(5):
    response = requests.get(API_URL + query + f"?limit=40&max_id={last_id or ''}", proxies={"https": "http://localhost:8080"}, verify=False)
    data = response.json()

    for post in data:
      result.append({
        "search": query,
        "content": post["content"],
        "relevance": 0
      })

    last_id = data[-1]["id"]

    i += 1

    print(len(result))

  with open("mastodon_data.json", "w") as f:
    f.write(json.dumps(result))
