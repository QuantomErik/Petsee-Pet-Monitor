// src/App.jsx
import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
}, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // Optionally navigate to login page or perform other actions
};

  return (
    <Router>
      <div className="text-5xl mb-4">Petsee</div>
      
      {/* Navigation Links */}
      {isAuthenticated ? (
        <nav>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      ) : (
        <nav>
          <Link to="/login">Login</Link> |{' '}
          <Link to="/register">Register</Link>
        </nav>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate replace to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate replace to="/" /> : <Register />} />
        <Route path="/" element={isAuthenticated ? <Homepage onLogout={handleLogout} /> : <Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
