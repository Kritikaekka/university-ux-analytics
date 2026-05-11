import { useEffect, useState } from "react";

function Dashboard() {

  const [analytics, setAnalytics] = useState({
    total_reviews: 0,
    positive_reviews: 0,
    negative_reviews: 0,
    neutral_reviews: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/analytics"
      );

      const data = await response.json();

      setAnalytics(data);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div>

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        UX Analytics Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-semibold mb-2">
            Total Reviews
          </h2>

          <p className="text-4xl font-bold text-blue-600">
            {analytics.total_reviews}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-semibold mb-2">
            Positive
          </h2>

          <p className="text-4xl font-bold text-green-600">
            {analytics.positive_reviews}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-semibold mb-2">
            Negative
          </h2>

          <p className="text-4xl font-bold text-red-600">
            {analytics.negative_reviews}
          </p>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-semibold mb-2">
            Neutral
          </h2>

          <p className="text-4xl font-bold text-gray-600">
            {analytics.neutral_reviews}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;