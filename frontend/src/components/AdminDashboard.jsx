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


  // =========================================
  // LOAD ADMIN DATA
  // =========================================

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };

    const loadAdminData = async () => {

      try {

        const usersResponse = await axios.get(
          "http://localhost:8080/admin/users",
          config
        );

        const lostResponse = await axios.get(
          "http://localhost:8080/admin/lost-items",
          config
        );

        const foundResponse = await axios.get(
          "http://localhost:8080/admin/found-items",
          config
        );

        const claimsResponse = await axios.get(
          "http://localhost:8080/admin/claims",
          config
        );

        setUsers(usersResponse.data);
        setLostItems(lostResponse.data);
        setFoundItems(foundResponse.data);
        setClaims(claimsResponse.data);

      } catch (error) {

        console.log(
          "Admin dashboard error:",
          error
        );

        if (
          error.response &&
          (
            error.response.status === 401 ||
            error.response.status === 403
          )
        ) {

          alert("Access denied. Admin only.");

          navigate("/dashboard");
        }

      } finally {

        setLoading(false);

      }
    };

    loadAdminData();

  }, [navigate]);


  // =========================================
  // DELETE USER
  // =========================================

  const deleteUser = async (user) => {

    if (user.role === "ADMIN") {

      alert(
        "Admin account cannot be deleted."
      );

      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete " +
      user.name +
      "?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };

    try {

      await axios.delete(
        "http://localhost:8080/admin/users/" +
        user.id,
        config
      );

      setUsers((previousUsers) =>
        previousUsers.filter(
          (item) => item.id !== user.id
        )
      );

      alert(
        "User deleted successfully!"
      );

    } catch (error) {

      console.log(
        "Delete user error:",
        error
      );

      alert(
        "Failed to delete user."
      );
    }
  };


  // =========================================
  // DELETE LOST ITEM
  // =========================================

  const deleteLostItem = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lost item?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };

    try {

      await axios.delete(
        "http://localhost:8080/admin/lost-items/" +
        id,
        config
      );

      setLostItems((previousItems) =>
        previousItems.filter(
          (item) => item.id !== id
        )
      );

      alert(
        "Lost item deleted successfully!"
      );

    } catch (error) {

      console.log(
        "Delete lost item error:",
        error
      );

      alert(
        "Failed to delete lost item."
      );
    }
  };


  // =========================================
  // DELETE FOUND ITEM
  // =========================================

  const deleteFoundItem = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this found item?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };

    try {

      await axios.delete(
        "http://localhost:8080/admin/found-items/" +
        id,
        config
      );

      setFoundItems((previousItems) =>
        previousItems.filter(
          (item) => item.id !== id
        )
      );

      alert(
        "Found item deleted successfully!"
      );

    } catch (error) {

      console.log(
        "Delete found item error:",
        error
      );

      alert(
        "Failed to delete found item."
      );
    }
  };


  // =========================================
  // UPDATE CLAIM STATUS
  // =========================================

  const updateClaimStatus = async (
    id,
    status
  ) => {

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };

    try {

      const response = await axios.put(
        "http://localhost:8080/admin/claims/" +
        id +
        "/status?status=" +
        status,
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

      alert(
        "Claim " +
        status.toLowerCase() +
        " successfully!"
      );

    } catch (error) {

      console.log(
        "Status update error:",
        error
      );

      alert(
        "Failed to update claim."
      );
    }
  };


  // =========================================
  // LOGOUT
  // =========================================

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };


  // =========================================
  // PENDING CLAIMS
  // =========================================

  const pendingClaims = claims.filter(
    (claim) =>
      claim.status &&
      claim.status.toUpperCase() ===
      "PENDING"
  ).length;


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <div className="admin-loading">

        <div className="admin-spinner"></div>

        <p>
          Loading Admin Dashboard...
        </p>

      </div>
    );
  }


  // =========================================
  // UI
  // =========================================

  return (

    <div className="admin-page">


      {/* HEADER */}

      <header className="admin-header">

        <div className="admin-brand">

          <div className="admin-logo">
            🛡️
          </div>

          <div>

            <h1>
              Lost &amp; Found
            </h1>

            <p>
              Administrator Panel
            </p>

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


      {/* MAIN */}

      <main className="admin-container">


        {/* WELCOME */}

        <div className="admin-welcome">

          <h2>
            Admin Dashboard 👋
          </h2>

          <p>
            Manage users, lost items, found items
            and claims.
          </p>

        </div>


        {/* STATISTICS */}

        <section className="admin-stats">


          <div className="admin-stat-card blue">

            <div className="stat-icon">
              👥
            </div>

            <div>

              <p>
                Total Users
              </p>

              <h2>
                {users.length}
              </h2>

            </div>

          </div>


          <div className="admin-stat-card red">

            <div className="stat-icon">
              🔴
            </div>

            <div>

              <p>
                Lost Items
              </p>

              <h2>
                {lostItems.length}
              </h2>

            </div>

          </div>


          <div className="admin-stat-card green">

            <div className="stat-icon">
              🟢
            </div>

            <div>

              <p>
                Found Items
              </p>

              <h2>
                {foundItems.length}
              </h2>

            </div>

          </div>


          <div className="admin-stat-card orange">

            <div className="stat-icon">
              🟠
            </div>

            <div>

              <p>
                Pending Claims
              </p>

              <h2>
                {pendingClaims}
              </h2>

            </div>

          </div>

        </section>


        {/* =====================================
            USER MANAGEMENT
        ===================================== */}

        <section className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>
                User Management
              </h2>

              <p>
                View and manage registered campus users.
              </p>

            </div>

            <span className="claim-count">
              {users.length} Users
            </span>

          </div>


          <div className="claims-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>

                </tr>

              </thead>


              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>

                    <td>
                      #{user.id}
                    </td>

                    <td>
                      <strong>
                        {user.name}
                      </strong>
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>

                      <span
                        className={
                          user.role === "ADMIN"
                            ? "user-role admin-role"
                            : "user-role student-role"
                        }
                      >
                        {user.role}
                      </span>

                    </td>

                    <td>

                      {user.role === "ADMIN" ? (

                        <span className="protected-user">
                          🔒 Protected
                        </span>

                      ) : (

                        <button
                          className="delete-user-button"
                          onClick={() =>
                            deleteUser(user)
                          }
                        >
                          🗑 Delete
                        </button>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>


        {/* =====================================
            LOST ITEMS
        ===================================== */}

        <section className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>
                🔴 Lost Items
              </h2>

              <p>
                Manage items reported as lost.
              </p>

            </div>

            <span className="claim-count">
              {lostItems.length} Items
            </span>

          </div>


          {lostItems.length === 0 ? (

            <div className="admin-empty">

              <div>
                🔴
              </div>

              <h3>
                No lost items
              </h3>

              <p>
                Lost item reports will appear here.
              </p>

            </div>

          ) : (

            <div className="claims-table-wrapper">

              <table className="admin-table">

                <thead>

                  <tr>

                    <th>ID</th>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>

                </thead>


                <tbody>

                  {lostItems.map((item) => (

                    <tr key={item.id}>

                      <td>
                        #{item.id}
                      </td>

                      <td>
                        <strong>
                          {item.itemName}
                        </strong>
                      </td>

                      <td>
                        {item.description}
                      </td>

                      <td>
                        📍 {item.location}
                      </td>

                      <td>
                        {item.date}
                      </td>

                      <td>

                        <span className="admin-status rejected">
                          {item.status || "LOST"}
                        </span>

                      </td>

                      <td>

                        <button
                          className="delete-user-button"
                          onClick={() =>
                            deleteLostItem(
                              item.id
                            )
                          }
                        >
                          🗑 Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* =====================================
            FOUND ITEMS
        ===================================== */}

        <section className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>
                🟢 Found Items
              </h2>

              <p>
                Manage items reported as found.
              </p>

            </div>

            <span className="claim-count">
              {foundItems.length} Items
            </span>

          </div>


          {foundItems.length === 0 ? (

            <div className="admin-empty">

              <div>
                🟢
              </div>

              <h3>
                No found items
              </h3>

              <p>
                Found item reports will appear here.
              </p>

            </div>

          ) : (

            <div className="claims-table-wrapper">

              <table className="admin-table">

                <thead>

                  <tr>

                    <th>ID</th>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>

                </thead>


                <tbody>

                  {foundItems.map((item) => (

                    <tr key={item.id}>

                      <td>
                        #{item.id}
                      </td>

                      <td>
                        <strong>
                          {item.itemName}
                        </strong>
                      </td>

                      <td>
                        {item.description}
                      </td>

                      <td>
                        📍 {item.location}
                      </td>

                      <td>
                        {item.date}
                      </td>

                      <td>

                        <span className="admin-status approved">
                          {item.status || "FOUND"}
                        </span>

                      </td>

                      <td>

                        <button
                          className="delete-user-button"
                          onClick={() =>
                            deleteFoundItem(
                              item.id
                            )
                          }
                        >
                          🗑 Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* =====================================
            CLAIM MANAGEMENT
        ===================================== */}

        <section className="admin-section">

          <div className="admin-section-header">

            <div>

              <h2>
                Claim Management
              </h2>

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

              <div>
                📋
              </div>

              <h3>
                No claims available
              </h3>

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

                  {claims.map((claim) => {

                    const claimStatus =
                      claim.status
                        ? claim.status.toUpperCase()
                        : "PENDING";

                    return (

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

                        <td>
                          {claim.reason}
                        </td>

                        <td>

                          <span
                            className={
                              "admin-status " +
                              claimStatus.toLowerCase()
                            }
                          >
                            {claimStatus}
                          </span>

                        </td>

                        <td>

                          {claimStatus === "PENDING" ? (

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

                    );

                  })}

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
