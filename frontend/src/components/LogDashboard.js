import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from 'react-icons/fa';

const LogDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
    const [showInfo, setShowInfo] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery) {
      fetchLogs();  // Fetch logs only if there's no search query
    }
    const interval = setInterval(fetchLogs, 5000); // Fetch logs every 5 seconds
    return () => clearInterval(interval);
  }, [searchQuery]);

  const fetchLogs = async () => {
    if (searchQuery) return;  // Prevent fetching if search query exists

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/logs/latest"); // Adjust to your API
      setLogs(response.data);  // Assuming logs are returned as an array
    } catch (error) {
      setError("Failed to fetch logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search-results?query=${searchQuery}`);  // Use navigate for routing
  };

  const handleAddLogRedirect = () => {
    navigate('/add-log');  // Redirects to the Add Log page
  };
  const handleLogClick = (logId) => {
    navigate(`/log/${logId}`);  // Navigate to the page displaying the log content
  };

  return (
    <div className="log-dashboard">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search logs..."
        className="search-input"
      />
      <div className="button">
        <button className="button-33" onClick={handleSearchSubmit}>Search</button>
        <div className="info-icon" onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
                  <FaInfoCircle size={20} />
                  {showInfo && (
                    <div className="tooltip">
                      <p>Enter keywords to search. The system will filter logs based on your query using OpenSearch.</p>
                    </div>
                  )}
                </div>
        <button className="button-33" onClick={handleAddLogRedirect}>Add Log</button>
      </div>
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="log-list">
        {logs.length === 0 ? (
          <p className="no-logs">No logs available.</p>
        ) : (
          logs.map((log) => {
            const parsedMessage = JSON.parse(log.message); // Parse JSON string

            return (
              <div key={log.id} className="log-card" onClick={() => handleLogClick(log.id)}>
                <span className="log-title">{parsedMessage.title}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};


export default LogDashboard;
