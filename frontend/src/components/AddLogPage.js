import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLogPage = () => {
  const [logMessage, setLogMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // Handle adding a log manually
  const handleAddLog = async () => {
    if (!logMessage.trim()) {
      alert("Please enter a log message.");
      return;
    }

    try {
      const logEntry = { logMessage };

      await axios.post("http://localhost:8080/logs/add", logEntry);

      alert("Log added successfully.");
      setLogMessage("");
      navigate("/");
    } catch (error) {
      console.error("Error adding log:", error);
      setError("Failed to add log.");
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a .log file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post("http://localhost:8080/logs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Log file uploaded successfully.");
      setSelectedFile(null);
      navigate("/");
    } catch (error) {
      console.error("Error uploading log file:", error);
      setError("Failed to upload log file.");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Add a New Log</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="relative w-96">
        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter log message..."
          value={logMessage}
          onChange={(e) => setLogMessage(e.target.value)}
          className="search-input w-full p-2 border border-gray-700 rounded-l-lg bg-gray-800 text-white focus:outline-none"
        />

        {/* Dropdown & Buttons */}
        <div className="button absolute right-0 top-0 flex">
          <button
            onClick={handleAddLog}
            className="button-add bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg"
          >
            Add Log
          </button>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="button-add bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-r-lg border-l border-gray-700"
          >
            ▼
          </button>
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-10 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
              <label className="block px-4 py-2 cursor-pointer hover:bg-gray-700">
                Upload .log File
                <input type="file" className="upload-input hidden" accept=".log" onChange={handleFileChange} />
              </label>
              <button
                onClick={handleFileUpload}
                className="button-add block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Upload File
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLogPage;
