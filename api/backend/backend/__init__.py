from dotenv import load_dotenv
import os
import requests

load_dotenv()

data = {
    "grant_type": "client_credentials",
    "client_id": os.getenv("AMADEUS_API_KEY"),
    "client_secret": os.getenv("AMADEUS_SECRET"),
}

headers = {"Content-Type": "application/x-www-form-urlencoded"}

AMADEUS_TOKEN = requests.post(
    os.getenv("AMADEUS_URL"), data=data, headers=headers
).json()["access_token"]
