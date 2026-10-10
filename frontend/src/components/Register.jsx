import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8080/register",
        {
          name: name,
          email: email,
          password: password
        }
      );

      alert("Account created successfully!");

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data ||
        "Registration failed"
      );

    }
  };

  return (
    <div className="register-page">

      {/* LEFT SIDE */}

      <div className="register-left">

        <div className="register-brand">

          <div className="register-icon">
            🔎
          </div>

          <h1>Lost & Found</h1>

          <p>
            Campus Lost & Found Portal
          </p>

        </div>

        <div className="register-message">

          <h2>
            Join your campus
            <br />
            lost & found community.
          </h2>

          <p>
            Report lost items, discover found items,
            and help return belongings to their owners.
          </p>

          <div className="feature-list">

            <div className="feature">
              <span>🔴</span>
              <p>Report lost belongings</p>
            </div>

            <div className="feature">
              <span>🟢</span>
              <p>Discover found items</p>
            </div>

            <div className="feature">
              <span>🔐</span>
              <p>Secure campus access</p>
            </div>

          </div>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="register-right">

        <div className="register-card">

          <div className="register-header">

            <h2>Create Account ✨</h2>

            <p>
              Register to use the campus portal
            </p>

          </div>


          <form onSubmit={handleRegister}>

            <div className="register-input">

              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

            </div>


            <div className="register-input">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>


            <div className="register-input">

              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>


            <button
              type="submit"
              className="register-button"
            >
              Create Account
            </button>

          </form>


          <div className="login-link">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;