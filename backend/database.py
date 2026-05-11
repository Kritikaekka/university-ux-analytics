from pymongo import MongoClient

client = MongoClient("mongodb+srv://kritikaally_db_user:kritika123@cluster0.xefdjpv.mongodb.net/?appName=Cluster0")

db = client["ux_analytics_db"]

collection = db["reviews"]