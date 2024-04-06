// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';  // Assume you have a Login component
import Register from './components/Register';  // Assume you have a Register component
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="text-5xl mb-4">Petsee</div>
            <nav>
                <Link to="/login">Login</Link> |{' '}
                <Link to="/register">Register</Link>
            </nav>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;









/* import React, { useState } from 'react';
import './App.css'

const App = () => {
  // State for Login form fields
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });

  // State for Register form fields
  const [register, setRegister] = useState({
    username: '',
    password: '',
    email: ''
  });

  // State to toggle between forms
  const [showLogin, setShowLogin] = useState(true);

  // Handle login input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // Handle registration input changes
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  // Handle form submissions (for demonstration)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (showLogin) {
      console.log('Login Details:', login);
    } else {
      console.log('Register Details:', register);
    }
  };

  // Toggle between Login and Register form
  const toggleForms = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      <div className="text-5xl mb-4">Petsee</div>

      {showLogin ? (
        <div>
          <h2>Login Form</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleLoginChange}
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleLoginChange}
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
          <button onClick={toggleForms}>Register a new user</button>
        </div>
      ) : (
        <div>
          <h2>Register Form</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={register.username}
              onChange={handleRegisterChange}
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={register.email}
              onChange={handleRegisterChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={register.password}
              onChange={handleRegisterChange}
              placeholder="Password"
            />
            <button type="submit">Register</button>
          </form>
          <button onClick={toggleForms}>Back to Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
 */