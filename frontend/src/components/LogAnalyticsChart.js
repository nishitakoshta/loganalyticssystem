import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [logMessage, setLogMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery) {
      fetchLogs();
    }
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, [searchQuery]);

  const fetchLogs = async () => {
    if (searchQuery) return;

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/logs/latest");
      setLogs(response.data);
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
    navigate(`/search-results?query=${searchQuery}`);
  };
  const handleAddLogRedirect = () => {
    navigate('/add-log');
  };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post("http://localhost:8080/logs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSelectedFile(null);
      fetchLogs();
    } catch (error) {
      setError("Failed to upload log file.");
    }
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
      <div className="button-group">
        <button className="button-33" onClick={handleSearchSubmit}>Search</button>
        <button className="button-33" onClick={handleAddLog}>Add Log</button>
      </div>

      <div className="add-log-section">

      </div>

      <div className="file-upload-section">
        <input type="file" accept=".log" onChange={handleFileChange} />
        <button className="button-33" onClick={handleFileUpload}>Upload .log File</button>
      </div>

      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="log-list">
        {logs.length === 0 ? (
          <p className="no-logs">No logs available.</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="log-card">
              <div className="log-card-header">
                <span className="log-message">{log.message}</span>
                <span className="log-timestamp">{log.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogDashboard;
