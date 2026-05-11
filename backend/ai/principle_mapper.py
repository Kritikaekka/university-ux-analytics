from transformers import pipeline

classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

principles = [
    "Visibility of System Status",
    "Help and Documentation",
    "Consistency and Standards",
    "Aesthetic and Minimalist Design",
    "Error Recognition & Recovery",
    "Match System and Real World",
    "Recognition Rather Than Recall",
    "Flexibility and Efficiency",
    "Error Prevention",
    "User Control and Freedom"
]

def map_to_principle(review_text):

    result = classifier(
        review_text,
        principles
    )

    return {
        "principle": result["labels"][0],
        "confidence": float(result["scores"][0])
    }