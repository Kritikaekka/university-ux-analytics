from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import collection
from datetime import datetime
from pydantic import BaseModel
from ai.principle_mapper import map_to_principle

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "UX Analytics API Running"}

@app.get("/principle-analysis")
def principle_analysis():

    data = list(collection.find())

    result = {}

    for item in data:

        principle = item.get("principle", "Unknown")

        if principle not in result:
            result[principle] = {
                "count": 0,
                "avg_confidence": 0
            }

        result[principle]["count"] += 1
        result[principle]["avg_confidence"] += item.get("principle_confidence", 0)

    for principle in result:

        result[principle]["avg_confidence"] = round(
            result[principle]["avg_confidence"] /
            result[principle]["count"],
            2
        )

    return result

@app.get("/principle-trends")
def principle_trends():

    data = list(collection.find())

    trends = {}

    for item in data:

        date = item.get("created_at", "")

        if len(date) >= 7:
            month = date[:7]
        else:
            month = "Unknown"

        principle = item.get("principle", "Unknown")

        if month not in trends:
            trends[month] = {}

        if principle not in trends[month]:
            trends[month][principle] = 0

        trends[month][principle] += 1

    return trends

@app.get("/topics")
def get_topics():

    return [
        {
            "Topic": 0,
            "Count": 53,
            "Representation": [
                "navigation",
                "mobile",
                "homepage",
                "important",
                "menus"
            ],
            "Representative_Docs": [
                "Navigation is smooth now",
                "Homepage links are easier to find",
                "Mobile menu is more user friendly"
            ]
        }
    ]

from pydantic import BaseModel
from datetime import datetime

class Review(BaseModel):
    name: str
    section: str
    rating: str
    review: str


@app.post("/submit-review")
def submit_review(data: Review):

    sentiment = "POSITIVE"
    sentiment_score = 0.95

    principle_result = map_to_principle(data.review)

    new_review = {
        "name": data.name,
        "section": data.section,
        "rating": data.rating,
        "review": data.review,
        "created_at": str(datetime.now().date()),
        "sentiment": sentiment,
        "sentiment_score": sentiment_score,
        "principle": principle_result["principle"],
        "principle_confidence": principle_result["confidence"],
    }

    collection.insert_one(new_review)

    return {
        "message": "Review submitted successfully"
    }