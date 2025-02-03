import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate along with useLocation

const SearchResults = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation(); // Get the current URL to read the search query
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query'); // Get the search query from the URL

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery); // Fetch search results based on the search query
    }
  }, [searchQuery]); // Fetch results whenever the search query changes

  const fetchSearchResults = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/logs/search?keyword=${query}`);
      setLogs(response.data);
    } catch (error) {
      setError('Failed to fetch search results.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/'); // Navigate back to the main dashboard
  };

  return (
    <div className="search-results">
      <h2>Search Results for: "{searchQuery}"</h2>

      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="log-list">
        {logs.length === 0 ? (
          <p className="no-logs">No logs found matching your search.</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="log-card">
              <div className="log-card-header">
                <span className="log-message">{log.logMessage}</span>
                <br />
                <span className="log-timestamp">{log.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="button">
      <button className="button-33" onClick={handleBackToDashboard}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default SearchResults;
