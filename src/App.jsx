// src/App.jsx
import React, { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Homepage from './components/Homepage'
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

      

<div className="full-screen-background text-gray-800">  {/* Changed class here */}
        <nav className="bg-white bg-opacity-75 shadow">

          
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                {/* Logo and application name */}
                <div>
                  <a href="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                    <span className="font-bold">Petsee</span>
                  </a>
                </div>
                {/* Primary Nav */}
                <div className="hidden md:flex items-center space-x-1">
                  {isAuthenticated ? (
                    <a href="/" onClick={handleLogout} className="py-5 px-3 text-gray-700 hover:text-gray-900">Logout</a>
                  ) : (
                    <>
                      <Link to="/login" className="py-5 px-3">Login</Link>
                      <Link to="/register" className="py-5 px-3">Register</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate replace to="/home" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate replace to="/home" />} />
          <Route path="/home" element={isAuthenticated ? <Homepage /> : <Navigate replace to="/login" />} />
          <Route path="/" element={<Navigate replace to={isAuthenticated ? "/home" : "/login"} />} />
          {/* <Route path="/login" element={isAuthenticated ? <Navigate replace to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={isAuthenticated ? <Navigate replace to="/" /> : <Register />} />
          <Route path="/" element={isAuthenticated ? <Homepage /> : <Navigate replace to="/login" />} /> */}
        </Routes>
        <Footer />  {/* Include the Footer component */}
      </div>
    </Router>
  )
}
   /*  <Router>
      <div className="text-5xl mb-4">Petsee</div>
      
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

      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate replace to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate replace to="/" /> : <Register />} />
        <Route path="/" element={isAuthenticated ? <Homepage onLogout={handleLogout} /> : <Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}; */

export default App;
