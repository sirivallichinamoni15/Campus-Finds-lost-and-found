import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SearchItems.css";

function SearchItems() {

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {

    e.preventDefault();

    if (!searchText.trim()) {
      return;
    }

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

      const lostResponse = await axios.get(
        `http://localhost:8080/lost-items/search?itemName=${encodeURIComponent(searchText)}`,
        config
      );

      const foundResponse = await axios.get(
        `http://localhost:8080/found-items/search?itemName=${encodeURIComponent(searchText)}`,
        config
      );

      setLostItems(lostResponse.data);
      setFoundItems(foundResponse.data);
      setSearched(true);

    } catch (error) {

      console.log("Search error:", error);

    }
  };


  const clearSearch = () => {

    setSearchText("");
    setLostItems([]);
    setFoundItems([]);
    setSearched(false);

  };


  return (
    <div className="search-page">

      {/* Header */}

      <div className="search-header">

        <button
          className="search-back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="search-title">

          <div className="search-title-icon">
            🔍
          </div>

          <div>
            <h1>Search Items</h1>

            <p>
              Find lost and found belongings on campus
            </p>
          </div>

        </div>

      </div>


      {/* Main */}

      <main className="search-container">

        {/* Search Box */}

        <section className="search-box-card">

          <h2>Find an Item</h2>

          <p>
            Search using the item name.
          </p>

          <form
            className="search-form"
            onSubmit={handleSearch}
          >

            <input
              type="text"
              placeholder="Example: Wallet, ID Card, Backpack..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <button type="submit">
              🔍 Search
            </button>

            {searched && (
              <button
                type="button"
                className="clear-button"
                onClick={clearSearch}
              >
                Clear
              </button>
            )}

          </form>

        </section>


        {/* Results */}

        {searched && (

          <section className="results-section">

            <div className="results-heading">

              <div>
                <h2>Search Results</h2>

                <p>
                  Results for "{searchText}"
                </p>
              </div>

              <div className="result-count">
                {lostItems.length + foundItems.length} items
              </div>

            </div>


            {/* Lost Results */}

            {lostItems.length > 0 && (

              <div className="result-group">

                <h3 className="lost-heading">
                  🔴 Lost Items
                </h3>

                <div className="search-items-grid">

                  {lostItems.map((item) => (

                    <div
                      className="search-item-card"
                      key={`lost-${item.id}`}
                    >

                      <div className="search-card-top">

                        <div className="search-item-icon lost-result-icon">
                          🔴
                        </div>

                        <span className="search-status lost-status">
                          LOST
                        </span>

                      </div>

                      <h3>
                        {item.itemName}
                      </h3>

                      <p>
                        {item.description}
                      </p>

                      <div className="search-details">

                        <span>
                          📍 {item.location}
                        </span>

                        <span>
                          📅 {item.date}
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}


            {/* Found Results */}

            {foundItems.length > 0 && (

              <div className="result-group">

                <h3 className="found-heading">
                  🟢 Found Items
                </h3>

                <div className="search-items-grid">

                  {foundItems.map((item) => (

                    <div
                      className="search-item-card"
                      key={`found-${item.id}`}
                    >

                      <div className="search-card-top">

                        <div className="search-item-icon found-result-icon">
                          🟢
                        </div>

                        <span className="search-status found-status">
                          FOUND
                        </span>

                      </div>

                      <h3>
                        {item.itemName}
                      </h3>

                      <p>
                        {item.description}
                      </p>

                      <div className="search-details">

                        <span>
                          📍 {item.location}
                        </span>

                        <span>
                          📅 {item.date}
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}


            {/* No Results */}

            {lostItems.length === 0 &&
              foundItems.length === 0 && (

                <div className="no-results">

                  <div className="no-results-icon">
                    🔎
                  </div>

                  <h3>
                    No items found
                  </h3>

                  <p>
                    Try searching with another item name.
                  </p>

                </div>

              )}

          </section>

        )}

      </main>

    </div>
  );
}

export default SearchItems;