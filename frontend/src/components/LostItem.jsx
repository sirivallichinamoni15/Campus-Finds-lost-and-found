import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LostItem.css";

function LostItem() {

  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {

      await axios.post(
        "http://localhost:8080/lost-items",
        {
          itemName: itemName,
          description: description,
          location: location,
          date: date,
          status: "LOST"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Lost item reported successfully!");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Failed to report lost item");

    }
  };


  return (
    <div className="lost-page">

      {/* Header */}

      <div className="lost-header">

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="lost-title">

          <div className="lost-title-icon">
            🔴
          </div>

          <div>

            <h1>Report Lost Item</h1>

            <p>
              Tell us about the item you lost
            </p>

          </div>

        </div>

      </div>


      {/* Form */}

      <div className="lost-container">

        <div className="lost-card">

          <div className="form-heading">

            <h2>Lost Item Details</h2>

            <p>
              Please provide accurate information so
              others can help you find your item.
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* Item Name */}

            <div className="form-group">

              <label>
                Item Name
              </label>

              <input
                type="text"
                placeholder="Example: Black Wallet"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />

            </div>


            {/* Description */}

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                placeholder="Describe your item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                required
              />

            </div>


            {/* Location */}

            <div className="form-group">

              <label>
                Last Seen Location
              </label>

              <input
                type="text"
                placeholder="Example: College Library"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

            </div>


            {/* Date */}

            <div className="form-group">

              <label>
                Date Lost
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

            </div>


            {/* Status */}

            <div className="status-info">

              <span>
                🔴
              </span>

              <div>

                <strong>
                  Status: LOST
                </strong>

                <p>
                  Your item will be marked as lost.
                </p>

              </div>

            </div>


            {/* Buttons */}

            <div className="form-buttons">

              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-lost-button"
              >
                Report Lost Item
              </button>

            </div>

          </form>

        </div>


        {/* Information Card */}

        <div className="lost-info-card">

          <div className="info-icon">
            💡
          </div>

          <h3>
            Tips for finding your item
          </h3>

          <ul>

            <li>
              Give a clear description of the item.
            </li>

            <li>
              Mention the exact location where you last saw it.
            </li>

            <li>
              Add any unique identifying details.
            </li>

            <li>
              Check the Found Items section regularly.
            </li>

          </ul>

        </div>

      </div>

    </div>
  );
}

export default LostItem;