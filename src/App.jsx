// src/App.jsx
import React, { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Homepage from './components/Homepage'
import Support from './components/Support'
import Contact from './components/Contact'
import PetDetails from './components/PetDetails'
import DietDetails from './components/DietDetails'
import ActivityDetails from './components/ActivityDetails'
import ScheduleDetails from './components/ScheduleDetails'

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react';
import './App.css'
import Footer from './components/Footer'

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
};

return (
  <Router>
    <div className="text-gray-800">
      <nav className="bg-white">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/home" className="nav-link">Home</Link>
                {/* <Link to="/petdetails" className="nav-link">PetDetails</Link> */}
                <a href="/" onClick={handleLogout} className="nav-link">Logout</a>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link px-6">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
              </>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-1 right-nav-links">
            <Link to="/support" className="nav-link">Support</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>
      
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate replace to="/home" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate replace to="/home" />} />
        <Route path="/home" element={isAuthenticated ? <Homepage /> : <Navigate replace to="/login" />} />

        <Route path="/petdetails" element={isAuthenticated ? <PetDetails /> : <Navigate replace to="/login" />} />
        <Route path="/dietdetails" element={isAuthenticated ? <DietDetails /> : <Navigate replace to="/login" />} />
        <Route path="/activitydetails" element={isAuthenticated ? <ActivityDetails /> : <Navigate replace to="/login" />} />
        <Route path="/scheduledetails" element={isAuthenticated ? <ScheduleDetails /> : <Navigate replace to="/login" />} />

        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Navigate replace to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);
};

export default App;
