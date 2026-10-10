
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          email: email,
          password: password,
        }
      );

      // Get JWT token from backend
      const token = String(response.data).trim();

      // Check whether the token is valid
      const parts = token.split(".");

      if (parts.length !== 3) {
        throw new Error("Invalid token received from server");
      }

      // Decode JWT payload safely
      let base64Payload = parts[1]
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      base64Payload += "=".repeat(
        (4 - (base64Payload.length % 4)) % 4
      );

      const payload = JSON.parse(atob(base64Payload));

      // Get user role
      const role = String(payload.role || "").replace("ROLE_", "");

      if (!role) {
        throw new Error("User role not found in token");
      }

      // Save token and role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Login successful!");

      // Navigate according to role
      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        alert(
          error.response.status === 401
            ? "Invalid email or password"
            : `Login failed. Server error: ${error.response.status}`
        );
      } else if (error.response === undefined && error.request) {
        alert("Cannot connect to the backend. Please check whether Spring Boot is running.");
      } else {
        alert(
          error.message || "Login failed. Please try again."
        );
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="brand-section">
          <div className="brand-icon">🔎</div>

          <h1>Lost &amp; Found</h1>

          <p>Campus Lost &amp; Found Portal</p>
        </div>

        <div className="welcome-text">
          <h2>
            Find what you lost.
            <br />
            Return what you found.
          </h2>

          <p>
            A smarter and safer way to manage
            lost and found items across your campus.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back 👋</h2>

            <p>Login to your campus account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>
          </form>

          <div className="register-link">
            <span>Don't have an account?</span>

            <Link to="/register">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
