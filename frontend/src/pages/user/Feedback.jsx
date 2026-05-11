import { useState } from "react";

function Feedback() {

  const [formData, setFormData] = useState({
    name: "",
    section: "",
    rating: "",
    review: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/submit-feedback",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();

    console.log(result);

    alert("Feedback submitted successfully!");

  } catch (error) {

    console.error(error);

    alert("Error submitting feedback");

  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Submit Website Feedback
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block mb-2 font-semibold">
              Your Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Website Section
            </label>

            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select Section</option>

              <option value="Admissions">
                Admissions
              </option>

              <option value="Examinations">
                Examinations
              </option>

              <option value="Fee Portal">
                Fee Portal
              </option>

              <option value="Results">
                Results
              </option>

              <option value="Library">
                Library
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Rating
            </label>

            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="">Select Rating</option>

              <option value="1">1 - Very Poor</option>
              <option value="2">2 - Poor</option>
              <option value="3">3 - Average</option>
              <option value="4">4 - Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Review
            </label>

            <textarea
              name="review"
              rows="6"
              placeholder="Describe your experience with the university website..."
              value={formData.review}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Submit Feedback
          </button>

        </form>

      </div>

    </div>
  );
}

export default Feedback;