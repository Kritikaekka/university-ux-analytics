from bertopic import BERTopic

from sklearn.feature_extraction.text import CountVectorizer


vectorizer_model = CountVectorizer(
    stop_words="english"
)


topic_model = BERTopic(
    vectorizer_model=vectorizer_model
)


def generate_topics(reviews):

    topics, probs = topic_model.fit_transform(
        reviews
    )

    topic_info = topic_model.get_topic_info()

    return topic_info.to_dict(
        orient="records"
    )