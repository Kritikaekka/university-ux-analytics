import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from "./pages/admin/Analytics";
import { useState } from "react";
import axios from "axios";

function FeedbackForm() {
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

  const submitFeedback = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/submit-review",
        formData
      );

      alert("Feedback submitted successfully!");

      setFormData({
        name: "",
        section: "",
        rating: "",
        review: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={headerSection}>
          <h1 style={titleStyle}>UX Feedback Analytics</h1>

          <p style={subtitleStyle}>
            Help improve the university digital experience
            through intelligent usability feedback.
          </p>
        </div>

        <form style={formStyle} onSubmit={submitFeedback}>
          <div style={fieldGroup}>
            <label style={labelStyle}>Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              style={inputStyle}
            />
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>Portal Section</label>

            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">
                Select Portal Section
              </option>

              <option>Admissions</option>
              <option>Library</option>
              <option>Results</option>
              <option>Attendance Portal</option>
              <option>Exam Portal</option>
              <option>Hostel Portal</option>
              <option>Fee Payment</option>
              <option>Student Dashboard</option>
              <option>Course Registration</option>
              <option>Website Navigation</option>
            </select>
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>
              Experience Rating
            </label>

            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rate from 1 to 5"
              style={inputStyle}
            />
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>
              Your Feedback
            </label>

            <textarea
              rows="5"
              name="review"
              value={formData.review}
              onChange={handleChange}
              placeholder="Describe your experience..."
              style={textareaStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(135deg, #dbeafe, #eff6ff, #f8fafc)",
  fontFamily: "'Inter', sans-serif",
  padding: "20px",
};

const cardStyle = {
  width: "520px",
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(12px)",
  borderRadius: "28px",
  padding: "45px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
};

const headerSection = {
  marginBottom: "35px",
};

const titleStyle = {
  margin: 0,
  fontSize: "34px",
  fontWeight: "700",
  color: "#1e3a8a",
};

const subtitleStyle = {
  marginTop: "12px",
  color: "#475569",
  fontSize: "16px",
  lineHeight: "1.6",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "22px",
};

const fieldGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const labelStyle = {
  fontWeight: "600",
  color: "#334155",
  fontSize: "14px",
};

const inputStyle = {
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  outline: "none",
};

const textareaStyle = {
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  outline: "none",
  resize: "none",
};

const buttonStyle = {
  padding: "16px",
  borderRadius: "16px",
  border: "none",
  background:
    "linear-gradient(135deg, #2563eb, #1d4ed8)",
  color: "white",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />

        <Route
          path="/admin/analytics"
          element={<Analytics />}
        />
      </Routes>
    </BrowserRouter>
  );
}