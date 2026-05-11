import { useEffect, useState } from "react";
import axios from "axios";

function Improvement() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchImprovementData();
  }, []);

  const fetchImprovementData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/improvement-analysis"
      );

      setData(response.data);
    } catch (error) {
      console.error("Error fetching improvement data:", error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          color: "#2563eb",
          fontSize: "50px",
          marginBottom: "30px",
        }}
      >
        UX Improvement Trends
      </h1>

      {Object.keys(data).map((month, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            marginBottom: "25px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ fontSize: "35px" }}>
            {month}
          </h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                background: "#dcfce7",
                padding: "20px",
                borderRadius: "15px",
                minWidth: "180px",
              }}
            >
              <h3>Positive</h3>

              <p
                style={{
                  fontSize: "35px",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                {data[month].positive}
              </p>
            </div>

            <div
              style={{
                background: "#fee2e2",
                padding: "20px",
                borderRadius: "15px",
                minWidth: "180px",
              }}
            >
              <h3>Negative</h3>

              <p
                style={{
                  fontSize: "35px",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {data[month].negative}
              </p>
            </div>

            <div
              style={{
                background: "#f3f4f6",
                padding: "20px",
                borderRadius: "15px",
                minWidth: "180px",
              }}
            >
              <h3>Total Reviews</h3>

              <p
                style={{
                  fontSize: "35px",
                  fontWeight: "bold",
                }}
              >
                {data[month].total}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Improvement;