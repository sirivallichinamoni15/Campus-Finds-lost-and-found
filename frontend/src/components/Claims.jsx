import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Claims.css";

function Claims() {

  const navigate = useNavigate();

  const [foundItems, setFoundItems] = useState([]);
  const [claims, setClaims] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [reason, setReason] = useState("");

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

    const loadData = async () => {

      try {

        const foundResponse = await axios.get(
          "http://localhost:8080/found-items",
          config
        );

        // Get only logged-in user's claims
        const claimsResponse = await axios.get(
          "http://localhost:8080/claims/my",
          config
        );

        setFoundItems(foundResponse.data);
        setClaims(claimsResponse.data);

      } catch (error) {

        console.log("Error loading claims:", error.response?.status, error.response?.data || error.message);

      }
    };

    loadData();

  }, [navigate]);


  const openClaimForm = (item) => {

    setSelectedItem(item);
    setReason("");

  };


  const closeClaimForm = () => {

    setSelectedItem(null);
    setReason("");

  };


  const submitClaim = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Submit claim
      // User ID is automatically taken from JWT by backend
      await axios.post(
        "http://localhost:8080/claims",
        {
          foundItemId: selectedItem.id,
          reason: reason
        },
        config
      );

      alert("Claim submitted successfully!");

      closeClaimForm();

      // Refresh only logged-in user's claims
      const response = await axios.get(
        "http://localhost:8080/claims/my",
        config
      );

      setClaims(response.data);

    } catch (error) {

      console.log("Claim error:", error);

      alert("Failed to submit claim");

    }
  };


  return (
    <div className="claims-page">

      {/* Header */}

      <div className="claims-header">

        <button
          className="claims-back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="claims-title">

          <div className="claims-title-icon">
            🟠
          </div>

          <div>

            <h1>Item Claims</h1>

            <p>
              Claim a found item that belongs to you
            </p>

          </div>

        </div>

      </div>


      <main className="claims-container">

        {/* Available Found Items */}

        <section>

          <div className="claims-section-heading">

            <div>

              <h2>Available Found Items</h2>

              <p>
                Is one of these items yours?
              </p>

            </div>

          </div>


          <div className="claims-items-grid">

            {foundItems.length === 0 ? (

              <div className="claims-empty">

                <div>📦</div>

                <h3>No found items available</h3>

                <p>
                  Found items will appear here.
                </p>

              </div>

            ) : (

              foundItems.map((item) => (

                <div
                  className="claim-item-card"
                  key={item.id}
                >

                  <div className="claim-card-top">

                    <div className="claim-item-icon">
                      🟢
                    </div>

                    <span className="found-status-badge">
                      FOUND
                    </span>

                  </div>


                  <h3>
                    {item.itemName}
                  </h3>


                  <p>
                    {item.description}
                  </p>


                  <div className="claim-details">

                    <span>
                      📍 {item.location}
                    </span>

                    <span>
                      📅 {item.date}
                    </span>

                  </div>


                  <button
                    className="claim-button"
                    onClick={() => openClaimForm(item)}
                  >
                    🟠 Claim This Item
                  </button>

                </div>

              ))

            )}

          </div>

        </section>


        {/* My Claims */}

        <section className="my-claims-section">

          <div className="claims-section-heading">

            <div>

              <h2>My Claims</h2>

              <p>
                Track your submitted claims
              </p>

            </div>

          </div>


          <div className="my-claims-list">

            {claims.length === 0 ? (

              <div className="claims-empty">

                <div>📋</div>

                <h3>No claims submitted</h3>

                <p>
                  Your claims will appear here.
                </p>

              </div>

            ) : (

              claims.map((claim) => (

                <div
                  className="claim-row"
                  key={claim.id}
                >

                  <div>

                    <h3>
                      Claim #{claim.id}
                    </h3>

                    <p>
                      Found Item ID: {claim.foundItemId}
                    </p>

                    <p>
                      {claim.reason}
                    </p>

                  </div>


                  <span
                    className={`claim-status ${
                      claim.status?.toLowerCase()
                    }`}
                  >
                    {claim.status}
                  </span>

                </div>

              ))

            )}

          </div>

        </section>

      </main>


      {/* Claim Modal */}

      {selectedItem && (

        <div className="claim-modal-overlay">

          <div className="claim-modal">

            <button
              className="close-modal"
              onClick={closeClaimForm}
            >
              ×
            </button>


            <div className="modal-icon">
              🟠
            </div>


            <h2>
              Claim This Item
            </h2>


            <p className="modal-item-name">
              {selectedItem.itemName}
            </p>


            <form onSubmit={submitClaim}>

              <label>
                Why is this item yours?
              </label>


              <textarea
                placeholder="Explain where you lost it and describe any unique details..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="5"
                required
              />


              <div className="modal-buttons">

                <button
                  type="button"
                  className="modal-cancel"
                  onClick={closeClaimForm}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="modal-submit"
                >
                  Submit Claim
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Claims;
