import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [claims, setClaims] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const loadAdminData = async () => {

      try {

        const [
          usersResponse,
          lostResponse,
          foundResponse,
          claimsResponse
        ] = await Promise.all([

          axios.get(
            "http://localhost:8080/admin/users",
            config
          ),

          axios.get(
            "http://localhost:8080/admin/lost-items",
            config
          ),

          axios.get(
            "http://localhost:8080/admin/found-items",
            config
          ),

          axios.get(
            "http://localhost:8080/admin/claims",
            config
          )

        ]);

        setUsers(usersResponse.data);
        setLostItems(lostResponse.data);
        setFoundItems(foundResponse.data);
        setClaims(claimsResponse.data);

      } catch (error) {

        console.log("Admin dashboard error:", error);

        if (error.response?.status === 403) {

          alert("Access denied. Admin only.");

          navigate("/dashboard");
        }

      } finally {

        setLoading(false);

      }
    };

    loadAdminData();

  }, [navigate]);

  const updateClaimStatus = async (id, status) => {

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {

      const response = await axios.put(
        `http://localhost:8080/admin/claims/${id}/status?status=${status}`,
        {},
        config
      );

      setClaims((previousClaims) =>
        previousClaims.map((claim) =>
          claim.id === id
            ? response.data
            : claim
        )
      );

      alert(`Claim ${status.toLowerCase()} successfully!`);

    } catch (error) {

      console.log("Status update error:", error);

      alert("Failed to update claim.");

    }
  };

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  const pendingClaims = claims.filter(
    (claim) =>
      claim.status?.toUpperCase() === "PENDING"
  ).length;

  if (loading) {

    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );

  }

  return (

    <div className="admin-page">

      {/* Header */}

      <header className="admin-header">

        <div className="admin-brand">

          <div className="admin-logo">
            🛡️
          </div>

          <div>
            <h1>Lost & Found</h1>
            <p>Administrator Panel</p>
          </div>

        </div>

        <div className="admin-header-right">

          <span className="admin-badge">
            ADMIN
          </span>

          <button
            className="admin-logout"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* Main */}

      <main className="admin-container">

        <div className="admin-welcome">

          <div>
            <h2>Admin Dashboard 👋</h2>

            <p>
              Manage users, lost items, found items and claims.
            </p>
          </div>

        </div>


        {/* Statistics */}

        <section className="admin-stats">

          <div className="admin-stat-card blue">

            <div className="stat-icon">
              👥
            </div>

            <div>
              <p>Total Users</p>
              <h2>{users.length}</h2>
            </div>

          </div>


          <div className="admin-stat-card red">

            <div className="stat-icon">
              🔴
            </div>

            <div>
              <p>Lost Items</p>
              <h2>{lostItems.length}</h2>
            </div>

          </div>


          <div className="admin-stat-card green">

            <div className="stat-icon">
              🟢
            </div>

            <div>
              <p>Found Items</p>
              <h2>{foundItems.length}</h2>
            </div>

          </div>


          <div className="admin-stat-card orange">

            <div className="stat-icon">
              🟠
            </div>

            <div>
              <p>Pending Claims</p>
              <h2>{pendingClaims}</h2>
            </div>

          </div>

        </section>


        {/* Claims */}

        <section className="admin-section">

          <div className="admin-section-header">

            <div>
              <h2>Claim Management</h2>

              <p>
                Review and manage submitted claims.
              </p>
            </div>

            <span className="claim-count">
              {claims.length} Claims
            </span>

          </div>


          {claims.length === 0 ? (

            <div className="admin-empty">

              <div>📋</div>

              <h3>No claims available</h3>

              <p>
                Submitted claims will appear here.
              </p>

            </div>

          ) : (

            <div className="claims-table-wrapper">

              <table className="admin-table">

                <thead>

                  <tr>
                    <th>Claim ID</th>
                    <th>User ID</th>
                    <th>Found Item</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {claims.map((claim) => (

                    <tr key={claim.id}>

                      <td>
                        <strong>
                          #{claim.id}
                        </strong>
                      </td>

                      <td>
                        User #{claim.userId}
                      </td>

                      <td>
                        Item #{claim.foundItemId}
                      </td>

                      <td className="reason-cell">
                        {claim.reason}
                      </td>

                      <td>

                        <span
                          className={`admin-status ${
                            claim.status?.toLowerCase()
                          }`}
                        >
                          {claim.status}
                        </span>

                      </td>

                      <td>

                        {claim.status?.toUpperCase() ===
                        "PENDING" ? (

                          <div className="claim-actions">

                            <button
                              className="approve-button"
                              onClick={() =>
                                updateClaimStatus(
                                  claim.id,
                                  "APPROVED"
                                )
                              }
                            >
                              ✓ Approve
                            </button>

                            <button
                              className="reject-button"
                              onClick={() =>
                                updateClaimStatus(
                                  claim.id,
                                  "REJECTED"
                                )
                              }
                            >
                              ✕ Reject
                            </button>

                          </div>

                        ) : (

                          <span className="completed-action">
                            Completed
                          </span>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>

  );
}

export default AdminDashboard;
