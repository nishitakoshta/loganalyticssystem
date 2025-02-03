import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import './LogDetail.css';

const LogDetail = () => {
  const { logId } = useParams();
  const [logContent, setLogContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLogContent();
  }, [logId]);

  // Handle search term input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to fetch log content from backend
  const fetchLogContent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/logs/${logId}`);
      const rawLogMessage = response.data.logMessage;
      const parsedLogMessage = JSON.parse(rawLogMessage);
      setLogContent(parsedLogMessage);
    } catch (error) {
      setError("Failed to fetch log content.");
    } finally {
      setLoading(false);
    }
  };

  // Function to highlight search term in the log message
  const highlightSearchTerm = (text) => {
    if (!searchQuery) return text; // Return original text if no search query

    const regex = new RegExp(`(${searchQuery})`, 'gi'); // Create a case-insensitive regex
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <mark key={index} style={{ backgroundColor: '#f1c40f', color: '#2c3e50' }}>{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search logs..."
        className="search-input"
      />
      {loading && (
        <div className="flex items-center space-x-2">
          <div className="spinner"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {logContent && (
        <div className="log-container">
          <h2 className="title">Log Details</h2>
          <div className="log-item">
            <p className="label">Log Message:</p>
            {/* Apply highlightSearchTerm function to the log message */}
            <p className="value">{highlightSearchTerm(logContent.logMessage)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogDetail;
