import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import React Router
import LogDashboard from './components/LogDashboard';
import AddLogPage from './components/AddLogPage';
import SearchResults from './components/SearchResults';
import LogDetail from "./components/LogDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="dashboard-title">Real-Time Log Analytics</h1>
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<LogDashboard />} /> {/* Main dashboard page */}
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/add-log" element={<AddLogPage />} />
          <Route path="/log/:logId" element={<LogDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;