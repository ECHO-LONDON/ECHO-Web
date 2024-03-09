import requests
import time
import json

API_URL = "https://oauth.reddit.com/r/all/search?limit=100&q="
TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzEwMDcyMDMyLjYzMDAzNywiaWF0IjoxNzA5OTg1NjMyLjYzMDAzNywianRpIjoiYnpNekZmUnhVQnVERjdMZmlMa0R3R1pZbzBjZXlRIiwiY2lkIjoiZFcwRnFHX2RPWm95UFZ0dXB5bWNYdyIsImxpZCI6InQyXzEwMzlndyIsImFpZCI6InQyXzEwMzlndyIsImxjYSI6MTQ3MDIyNDI2Mjk2NSwic2NwIjoiZUp5S1ZpcEtUVXhSMGxIS3JTd3VUU3BLVFVuSkxDbFcwbEhLVEVuTks4a3NxVlNLQlFRQUFQX196V01NQWciLCJyY2lkIjoiT252bkZRMkwwbEplS3lJYWxVcTRYUHdVdHliOGdSMmlEcWRGN2FjNEptZyIsImZsbyI6OH0.etz4qO6nHMQXAiwCJaROk3Yv15y9HIEvX6apKbVR0orKacqeN3BSt2gHDUdS_wnqreLv4kK7rgVqgYNFj_7c3fAQ4_0gjwKZIWm9Lg8nG_cwHQvDZY8455L7LoyH9sr_grvW5G5fwFsvAGTRGYFJEkbGWwOQolnl6T-co_eFyLX7iFofMARNBQfv2LxWxZ0JHzIEgWM_jja33NzQ2Kvkmn994BShiukoQDPdT4w4_4bKRgq1CVe9fSbqqmmRwqDnvm9tkXaIzCuQqDyVaVpncwIq482wSoNmsac_ncgHVpl_494N7w50eqDCPUskw26YNqifdZ6P2yRupBeJN2X3vw"

result = []
result = json.loads(open("reddit_data.json").read())

i = 0
i = 5
# for query in ["politics", "solana news", "machine learning", "computer vision", "global warming", "international space station"]:
for query in ["international space station"]:
  response = requests.get(API_URL + query, headers={"Authorization": f"bearer {TOKEN}"}, proxies={"https": "http://localhost:8080"}, verify=False)
  data = response.json()['data']

  for post in data['children']:
    result.append({
      "search": i,
      "content": post["data"]["title"] + " " + post["data"]["selftext"],
      "relevance": 0
    })

  i += 1

  with open("reddit_data.json", "w") as f:
    f.write(json.dumps(result))
  
  time.sleep(120)