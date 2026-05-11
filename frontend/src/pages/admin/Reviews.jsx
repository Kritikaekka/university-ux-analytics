import { useEffect, useState } from "react";

function Reviews() {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/reviews"
      );

      const data = await response.json();

      setReviews(data);

    } catch (error) {

      console.error(error);

    }
  };

  const getSentimentColor = (sentiment) => {

    if (sentiment === "POSITIVE") {
      return "bg-green-100 text-green-700";
    }

    if (sentiment === "NEGATIVE") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div>

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        User Reviews
      </h1>

      <div className="grid gap-6">

        {reviews.map((review) => (

          <div
            key={review._id}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-2xl font-semibold">
                {review.name}
              </h2>

              <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full">
                {review.section}
              </span>

            </div>

            <div className="flex gap-4 mb-4">

              <div className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full">
                Rating: {review.rating}/5
              </div>

              <div
                className={`px-4 py-1 rounded-full ${getSentimentColor(review.sentiment)}`}
              >
                {review.sentiment}
              </div>

            </div>

            <p className="text-gray-700 leading-relaxed">
              {review.review}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Reviews;