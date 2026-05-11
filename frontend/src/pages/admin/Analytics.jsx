import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export default function Analytics() {

  const [topics, setTopics] = useState([]);
  const [principles, setPrinciples] = useState({});
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {

    fetchTopics();
    fetchPrinciples();
    fetchTrends();

  }, []);

  const fetchTopics = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/topics"
      );

      setTopics(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const fetchPrinciples = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/principle-analysis"
      );

      setPrinciples(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  const fetchTrends = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/principle-trends"
      );

      const formatted = [];

      Object.entries(res.data).forEach(
        ([month, values]) => {

          formatted.push({
            month,
            ...values,
          });

        }
      );

      setTrendData(formatted);

    } catch (err) {
      console.error(err);
    }
  };

  const chartData = Object.keys(principles).map(
    (key) => ({
      principle: key,
      count: principles[key].count,
    })
  );

  const maxReviews = Math.max(
    ...Object.values(principles).map(
      (p) => p.count
    ),
    1
  );

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#9333ea",
    "#ea580c",
    "#dc2626",
    "#0891b2",
  ];

  const radarData = Object.keys(principles).map(
    (key) => ({
      principle: key,
      score: Math.round(
        principles[key].avg_confidence * 100
      ),
    })
  );

  return (
    <div
      style={{
        padding: "40px",
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >

      <h1
        style={{
          fontSize: "52px",
          marginBottom: "40px",
          color: "#2563eb",
          fontWeight: "bold",
        }}
      >
        AI UX Improvement Analytics
      </h1>

      {/* BAR CHART */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "40px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
            fontSize: "30px",
          }}
        >
          Norman Principle Distribution
        </h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="principle"
              angle={-15}
              textAnchor="end"
              interval={0}
              height={100}
            />

            <YAxis />

            <Tooltip />

            <Bar dataKey="count" />

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* PIE CHART */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "40px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
            fontSize: "30px",
          }}
        >
          Principle Contribution Share
        </h2>

        <ResponsiveContainer width="100%" height={400}>

          <PieChart>

            <Pie
              data={chartData}
              dataKey="count"
              nameKey="principle"
              cx="50%"
              cy="50%"
              outerRadius={140}
              label
            >

              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* RADAR CHART */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "40px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
            fontSize: "30px",
          }}
        >
          UX Health Radar
        </h2>

        <ResponsiveContainer width="100%" height={500}>

          <RadarChart data={radarData}>

            <PolarGrid />

            <PolarAngleAxis dataKey="principle" />

            <PolarRadiusAxis />

            <Radar
              name="UX Score"
              dataKey="score"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.6}
            />

            <Tooltip />

          </RadarChart>

        </ResponsiveContainer>

      </div>

      {/* TREND CHART */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "40px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
            fontSize: "30px",
          }}
        >
          UX Principle Trends Over Time
        </h2>

        <ResponsiveContainer width="100%" height={400}>
  <LineChart data={trendData}>
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis dataKey="month" />

    <YAxis />

    <Tooltip />

    <Legend />

    <Line
      type="monotone"
      dataKey="Visibility of System Status"
      stroke="#2563eb"
      strokeWidth={3}
    />

    <Line
      type="monotone"
      dataKey="Consistency and Standards"
      stroke="#9333ea"
      strokeWidth={3}
    />

    <Line
      type="monotone"
      dataKey="Help and Documentation"
      stroke="#16a34a"
      strokeWidth={3}
    />

    <Line
      type="monotone"
      dataKey="Flexibility and Efficiency"
      stroke="#ea580c"
      strokeWidth={3}
    />

    <Line
      type="monotone"
      dataKey="Error Prevention"
      stroke="#dc2626"
      strokeWidth={3}
    />

    <Line
      type="monotone"
      dataKey="Recognition Rather Than Recall"
      stroke="#0891b2"
      strokeWidth={3}
    />

    <Line
      type="monotone"
      dataKey="User Control and Freedom"
      stroke="#7c3aed"
      strokeWidth={3}
    />

    <Line
      type="monotone"
      dataKey="Aesthetic and Minimalist Design"
      stroke="#ca8a04"
      strokeWidth={3}
    />
  </LineChart>
</ResponsiveContainer>

      </div>

      {/* PRINCIPLE CARDS */}

      {Object.entries(principles).map(
        ([name, data], index) => {

          const score = Math.round(
            data.avg_confidence * 100
          );

          return (

            <div
              key={index}
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "22px",
                marginBottom: "30px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >

              <h2
                style={{
                  fontSize: "34px",
                  marginBottom: "25px",
                }}
              >
                {name}
              </h2>

              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginBottom: "25px",
                  flexWrap: "wrap",
                }}
              >

                <div
                  style={{
                    background: "#dbeafe",
                    padding: "14px 20px",
                    borderRadius: "14px",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Reviews: {data.count}
                </div>

                <div
                  style={{
                    background: "#dcfce7",
                    padding: "14px 20px",
                    borderRadius: "14px",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Confidence: {data.avg_confidence}
                </div>

                <div
                  style={{
                    background: "#ede9fe",
                    padding: "14px 20px",
                    borderRadius: "14px",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Improvement Score: {score}%
                </div>

              </div>

              <div
                style={{
                  height: "18px",
                  background: "#e5e7eb",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >

                <div
                  style={{
                    width: `${
                      (data.count / maxReviews) * 100
                    }%`,
                    height: "100%",
                    background: "#2563eb",
                    borderRadius: "20px",
                    transition: "0.5s",
                  }}
                />

              </div>

            </div>

          );
        }
      )}

      

    </div>
  );
}