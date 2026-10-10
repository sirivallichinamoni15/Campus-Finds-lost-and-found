import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FoundItem.css";

function FoundItem() {

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
        "http://localhost:8080/found-items",
        {
          itemName: itemName,
          description: description,
          location: location,
          date: date,
          status: "FOUND"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Found item reported successfully!");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Failed to report found item");

    }
  };


  return (
    <div className="found-page">

      {/* Header */}

      <div className="found-header">

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="found-title">

          <div className="found-title-icon">
            🟢
          </div>

          <div>

            <h1>Report Found Item</h1>

            <p>
              Help someone find their lost belongings
            </p>

          </div>

        </div>

      </div>


      {/* Main Content */}

      <div className="found-container">

        <div className="found-card">

          <div className="form-heading">

            <h2>Found Item Details</h2>

            <p>
              Please provide accurate information about
              the item you found.
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
                placeholder="Example: Student ID Card"
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
                placeholder="Describe the item you found..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                required
              />

            </div>


            {/* Location */}

            <div className="form-group">

              <label>
                Found Location
              </label>

              <input
                type="text"
                placeholder="Example: College Canteen"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

            </div>


            {/* Date */}

            <div className="form-group">

              <label>
                Date Found
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

            </div>


            {/* Status */}

            <div className="status-info found-status">

              <span>
                🟢
              </span>

              <div>

                <strong>
                  Status: FOUND
                </strong>

                <p>
                  Your item will be marked as found.
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
                className="submit-found-button"
              >
                Report Found Item
              </button>

            </div>

          </form>

        </div>


        {/* Information Card */}

        <div className="found-info-card">

          <div className="info-icon">
            💚
          </div>

          <h3>
            Help return the item
          </h3>

          <ul>

            <li>
              Give a clear description of the item.
            </li>

            <li>
              Mention exactly where you found it.
            </li>

            <li>
              Include any identifying details.
            </li>

            <li>
              The owner can submit a claim later.
            </li>

          </ul>

        </div>

      </div>

    </div>
  );
}

export default FoundItem;