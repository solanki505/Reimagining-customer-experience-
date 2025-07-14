import React, { useEffect, useRef, useState } from "react";
import "./ThreeD.css";
import { useNavigate } from "react-router-dom";

const ThreeDViewer = ({ height = 700 }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("product"); // ✅ default type
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const SKETCHFAB_TOKEN = "14eeb1ade0c94321b1f018c248572d9c";

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.sketchfab.com/v3/search?type=models&q=${encodeURIComponent(
          `${searchQuery} ${filter}`
        )}`,
        {
          headers: {
            Authorization: `Token ${SKETCHFAB_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      const found = data.results.map((m) => ({
        name: m.name,
        uid: m.uid,
        thumbnail: m.thumbnails.images[0]?.url || "",
      }));
      setResults(found);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleModelClick = (model) => {
    navigate(`/model/${model.uid}`, { state: { name: model.name } });
  };

  return (
    <div className="viewer-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Sketchfab models..."
          className="search-input"
        />
        
        {/* ✅ Filter dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="product">Product</option>
          <option value="furniture">Furniture</option>
          <option value="electronics">Electronics</option>
          <option value="vehicle">Vehicle</option>
          <option value="appliance">Appliance</option>
        </select>

        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="results-grid">
        {results.map((model, idx) => (
          <div
            key={model.uid}
            className="result-item"
            onClick={() => handleModelClick(model)}
          >
            <img
              src={model.thumbnail}
              alt={model.name}
              className="result-thumbnail"
            />
            <p className="result-name">{model.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeDViewer;
