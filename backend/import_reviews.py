import csv
from transformers import pipeline
from database import collection
from ai.principle_mapper import map_to_principle

# Load sentiment analysis model
sentiment_pipeline = pipeline("sentiment-analysis")

# Open CSV file
with open("datasets/synthetic_reviews.csv", "r", encoding="utf-8") as file:

    # Read CSV properly using column names
    reader = csv.DictReader(file)

    for row in reader:
        try:
            # Read fields
            name = row["name"]
            section = row["section"]
            rating = int(row["rating"])
            review = row["review"]
            created_at = row["created_at"]

            # Sentiment Analysis
            result = sentiment_pipeline(review)[0]

            sentiment = result["label"]
            sentiment_score = result["score"]

            # Norman Principle Mapping
            principle_data = map_to_principle(review)

            # Insert into MongoDB
            collection.insert_one({
                "name": name,
                "section": section,
                "rating": rating,
                "review": review,
                "created_at": created_at,
                "sentiment": sentiment,
                "sentiment_score": sentiment_score,
                "principle": principle_data["principle"],
                "principle_confidence": principle_data["confidence"]
            })

            print(f"Inserted review from {name}")

        except Exception as e:
            print("Error:", e)

print("Reviews imported successfully!")