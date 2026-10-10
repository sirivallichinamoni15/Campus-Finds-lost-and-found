import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchItems = async () => {

      try {

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const lostResponse = await axios.get(
          "http://localhost:8080/lost-items",
          config
        );

        const foundResponse = await axios.get(
          "http://localhost:8080/found-items",
          config
        );

        setLostItems(lostResponse.data);
        setFoundItems(foundResponse.data);

      } catch (error) {

        console.log("Error loading items:", error);

      }
    };

    fetchItems();

  }, [navigate]);


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");

  };


  return (
    <div className="dashboard-page">

      {/* Navbar */}

      <nav className="dashboard-navbar">

        <div className="dashboard-brand">

          <div className="dashboard-logo">
            🔎
          </div>

          <div>
            <h2>Lost & Found</h2>
            <span>Campus Portal</span>
          </div>

        </div>


        <div className="dashboard-nav-right">

          <span className="user-name">
            👋 Sirivalli
          </span>

          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* Main Content */}

      <main className="dashboard-container">

        {/* Welcome */}

        <section className="welcome-section">

          <div>

            <p className="welcome-small">
              CAMPUS LOST & FOUND
            </p>

            <h1>
              Welcome back, Sirivalli 👋
            </h1>

            <p className="welcome-description">
              Find lost belongings, report items you've lost,
              and help return found items to their owners.
            </p>

          </div>

        </section>


        {/* Statistics */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon lost-icon">
              🔴
            </div>

            <div>
              <p>Lost Items</p>
              <h2>{lostItems.length}</h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon found-icon">
              🟢
            </div>

            <div>
              <p>Found Items</p>
              <h2>{foundItems.length}</h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon pending-icon">
              🟠
            </div>

            <div>
              <p>Pending Claims</p>
              <h2>0</h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon total-icon">
              📦
            </div>

            <div>
              <p>Total Items</p>
              <h2>
                {lostItems.length + foundItems.length}
              </h2>
            </div>

          </div>

        </section>


        {/* Quick Actions */}

        <section className="quick-section">

          <div className="section-heading">

            <div>
              <h2>Quick Actions</h2>
              <p>What would you like to do?</p>
            </div>

          </div>


          <div className="action-grid">

            {/* REPORT LOST ITEM */}

            <button
              className="action-card lost-action"
              onClick={() => navigate("/report-lost")}
            >

              <div className="action-icon">
                🔴
              </div>

              <div>
                <h3>Report Lost Item</h3>
                <p>Tell us what you lost</p>
              </div>

              <span className="action-arrow">
                →
              </span>

            </button>


            {/* REPORT FOUND ITEM */}

            <button
              className="action-card found-action"
              onClick={() => navigate("/report-found")}
            >

              <div className="action-icon">
                🟢
              </div>

              <div>
                <h3>Report Found Item</h3>
                <p>Help someone find their item</p>
              </div>

              <span className="action-arrow">
                →
              </span>

            </button>


            {/* SEARCH */}

            <button
              className="action-card search-action"
              onClick={() => navigate("/search")}
            >

              <div className="action-icon">
                🔍
              </div>

              <div>
                <h3>Search Items</h3>
                <p>Find lost or found belongings</p>
              </div>

              <span className="action-arrow">
                →
              </span>

            </button>


            {/* MY CLAIMS */}

            <button
              className="action-card claim-action"
              onClick={() => navigate("/claims")}
            >

              <div className="action-icon">
                🟠
              </div>

              <div>
                <h3>My Claims</h3>
                <p>Track your item claims</p>
              </div>

              <span className="action-arrow">
                →
              </span>

            </button>


            {/* AI MATCHING BUTTON */}

            <button
              className="action-card"
              onClick={() => navigate("/matches")}
              style={{
                background: "linear-gradient(135deg, #6c5ce7, #4834d4)",
                color: "white",
                border: "none"
              }}
            >

              <div className="action-icon">
                🤖
              </div>

              <div>
                <h3>AI Item Matching</h3>
                <p>Find possible lost and found matches</p>
              </div>

              <span className="action-arrow">
                →
              </span>

            </button>

          </div>

        </section>


        {/* Recent Lost Items */}

        <section className="items-section">

          <div className="section-heading">

            <div>
              <h2>Recent Lost Items</h2>
              <p>Recently reported lost belongings</p>
            </div>

          </div>


          <div className="items-grid">

            {lostItems.length === 0 ? (

              <div className="empty-card">

                <div>🔎</div>

                <h3>No lost items yet</h3>

                <p>
                  Report a lost item to see it here.
                </p>

              </div>

            ) : (

              lostItems.map((item) => (

                <div
                  className="item-card"
                  key={item.id}
                >

                  <div className="item-card-top">

                    <div className="item-image lost-image">
                      🔴
                    </div>

                    <span className="status-badge lost-badge">
                      LOST
                    </span>

                  </div>

                  <h3>
                    {item.itemName}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <div className="item-details">

                    <span>
                      📍 {item.location}
                    </span>

                    <span>
                      📅 {item.date}
                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>


        {/* Found Items */}

        <section className="items-section">

          <div className="section-heading">

            <div>
              <h2>Recently Found Items</h2>
              <p>Items reported by students</p>
            </div>

          </div>


          <div className="items-grid">

            {foundItems.length === 0 ? (

              <div className="empty-card">

                <div>📦</div>

                <h3>No found items yet</h3>

                <p>
                  Found items will appear here.
                </p>

              </div>

            ) : (

              foundItems.map((item) => (

                <div
                  className="item-card"
                  key={item.id}
                >

                  <div className="item-card-top">

                    <div className="item-image found-image">
                      🟢
                    </div>

                    <span className="status-badge found-badge">
                      FOUND
                    </span>

                  </div>

                  <h3>
                    {item.itemName}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <div className="item-details">

                    <span>
                      📍 {item.location}
                    </span>

                    <span>
                      📅 {item.date}
                    </span>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;
