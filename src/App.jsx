// src/App.jsx
import React, { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Homepage from './components/Homepage'
import Support from './components/Support'
import Contact from './components/Contact'
import PetDetails from './components/PetDetails'
import DietDetails from './components/DietDetails'
import AddMeal from './components/AddMeal'
import EditMeal from './components/EditMeal'
import ActivityDetails from './components/ActivityDetails'
import AddActivity from './components/AddActivity'
import EditActivity from './components/EditActivity'
import ScheduleDetails from './components/ScheduleDetails'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar, Container } from 'react-bootstrap'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import Footer from './components/Footer'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
}, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
}

return (
  <Router>
  <div className="text-gray-800">
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Pet App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" variant="tabs" defaultActiveKey="/home">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/home" eventKey="/home">Home</Nav.Link>
                {/* <Nav.Link as={Link} to="/petdetails" eventKey="/petdetails">Pet Details</Nav.Link> */}
                {/* <Nav.Link as={Link} to="/dietdetails" eventKey="/dietdetails">Diet Details</Nav.Link> */}
               {/*  <Nav.Link as={Link} to="/activitydetails" eventKey="/activitydetails">Activity Details</Nav.Link> */}
                {/* <Nav.Link as={Link} to="/scheduledetails" eventKey="/scheduledetails">Schedule Details</Nav.Link> */}
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" eventKey="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" eventKey="/register">Register</Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/support" eventKey="/support">Support</Nav.Link>
            <Nav.Link as={Link} to="/contact" eventKey="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={true} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    {/* <ToastContainer position="top-right" autoClose={5000} /> */}
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate replace to="/home" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate replace to="/home" />} />
        <Route path="/home" element={isAuthenticated ? <Homepage /> : <Navigate replace to="/login" />} />

        <Route path="/petdetails" element={isAuthenticated ? <PetDetails /> : <Navigate replace to="/petdetails" />} />

        <Route path="/dietdetails" element={isAuthenticated ? <DietDetails /> : <Navigate replace to="/dietdetails" />} />
        <Route path="/dietdetails/addmeal" element={isAuthenticated ? <AddMeal/> : <Navigate replace to="/dietdetails/addmeal" />} />
        <Route path="/dietdetails/edit/:id" element={isAuthenticated ? <EditMeal /> : <Navigate replace to="/dietdetails" />} />

        <Route path="/activitydetails" element={isAuthenticated ? <ActivityDetails /> : <Navigate replace to="/activitydetails" />} />
        <Route path="/activitydetails/addactivity" element={isAuthenticated ? <AddActivity /> : <Navigate replace to="/activitydetails/addactivity" />} />
        <Route path="/activitydetails/edit/:id" element={isAuthenticated ? <EditActivity /> : <Navigate replace to="/login" />} />

        <Route path="/scheduledetails" element={isAuthenticated ? <ScheduleDetails /> : <Navigate replace to="/scheduledetails" />} />

        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Navigate replace to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    {/*   <Footer /> */}
    </div>
  </Router>
)
}

export default App