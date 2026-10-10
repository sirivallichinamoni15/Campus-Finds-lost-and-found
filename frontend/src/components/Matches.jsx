
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check login token
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // Fetch matching items from backend
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/matches",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMatches(response.data);
      } catch (err) {
        console.error("Error loading matches:", err);

        if (
          err.response?.status === 401 ||
          err.response?.status === 403
        ) {
          setError(
            "Login session expired or access denied. Please log in again."
          );
        } else {
          setError(
            "Unable to load matches. Please check whether Spring Boot is running."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "#f5f6fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "10px 18px",
          border: "none",
          borderRadius: "8px",
          background: "#4834d4",
          color: "white",
          cursor: "pointer",
          fontSize: "15px",
        }}
      >
        ← Back to Dashboard
      </button>

      {/* Page Heading */}
      <h1 style={{ color: "#4834d4", marginTop: "25px" }}>
        🤖 AI Lost & Found Matching
      </h1>

      <p>
        Find possible matches between lost and found items on campus.
      </p>

      {/* Loading */}
      {loading && (
        <h3>Finding matching items...</h3>
      )}

      {/* Error */}
      {!loading && error && (
        <div
          style={{
            background: "#fff0f0",
            padding: "20px",
            borderRadius: "10px",
            color: "#c0392b",
          }}
        >
          <p>{error}</p>

          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 15px",
              border: "none",
              borderRadius: "6px",
              background: "#4834d4",
              color: "white",
              cursor: "pointer",
            }}
          >
            Go to Login
          </button>
        </div>
      )}

      {/* No Matches */}
      {!loading && !error && matches.length === 0 && (
        <div
          style={{
            background: "white",
            padding: "25px",
            marginTop: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h2>No matching items found yet.</h2>
          <p>
            Matching items will appear here when lost and found
            reports have enough details in common.
          </p>
        </div>
      )}

      {/* Display Matches */}
      {!loading &&
        !error &&
        matches.length > 0 &&
        matches.map((match, index) => (
          <div
            key={index}
            style={{
              background: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "22px",
              marginTop: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ color: "#4834d4" }}>
              🎯 Potential Match: {match.similarityScore}% similarity
            </h2>

            <hr />

            {/* Lost Item */}
            <h3 style={{ color: "#d63031" }}>
              🔴 Lost Item
            </h3>

            <p>
              <strong>Name:</strong>{" "}
              {match.lostItem?.itemName || "Not available"}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {match.lostItem?.description || "Not available"}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {match.lostItem?.location || "Not available"}
            </p>

            {/* Found Item */}
            <h3 style={{ color: "#00a86b", marginTop: "20px" }}>
              🟢 Found Item
            </h3>

            <p>
              <strong>Name:</strong>{" "}
              {match.foundItem?.itemName || "Not available"}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {match.foundItem?.description || "Not available"}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {match.foundItem?.location || "Not available"}
            </p>
          </div>
        ))}
    </div>
  );
}

export default Matches;
