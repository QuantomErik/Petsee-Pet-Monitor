// src/components/Login.jsx
import React, { useState } from 'react'
import PropTypes from 'prop-types'
/* import backgroundImage from '../images/background.webp' */
import FeatureCard from './FeatureCard'


// Add props parameter to your Login function
const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [flashMessage, setFlashMessage] = useState('')
    const [showFlash, setShowFlash] = useState(false)

     const features = [
        { title: 'Diet Monitoring', description: 'Track and manage your pet’s dietary needs.' },
        { title: 'Activity Monitoring', description: 'Monitor your pet’s physical activities.' },
        { title: 'Nutritional Facts', description: 'Get insights into the nutritional values.' },
        { title: 'Routine Planning', description: 'Plan and schedule your pet’s daily routines.' }
    ]

    async function loginUser(credentials) {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        if (response.ok) {
            return response.json()
        } else {
            const errorData = await response.json()
            if (response.status === 401) {
                setFlashMessage('Incorrect password')
            } else if (response.status === 404) {
                setFlashMessage("The username doesn't exist")
            } else {
                setFlashMessage('Invalid login')
            }
            setShowFlash(true);
            return Promise.reject(errorData)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setShowFlash(false)

// Check for empty fields before sending a request
if (!username.trim() || !password.trim()) {
    setFlashMessage('Username and password required')
    setShowFlash(true)
    return
}

        try {
            const data = await loginUser({ username, password })
            console.log('Login successful:', data)
            localStorage.setItem('token', data.accessToken) // Store the token
            // Call the onLoginSuccess function passed as a prop
            props.onLoginSuccess();
        } catch (error) {
            console.error('Login error:', error)
        }
    }
    
    /* const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      } */

    return (
        
<div className="login-background flex flex-col overflow-hidden">
            <div className="login-container mx-auto my-auto">


            <div className="px-8 py-6 w-full max-w-md"> {/* Control the width of the form here */}
            <div className="text-center mb-6">
                        <h3 className="text-7xl font-bold text-white varela-round-regular whitespace-nowrap">Welcome to</h3>
                        <h3 className="text-7xl font-bold text-white petsee-text varela-round-regular">Petsee</h3>
                        </div>

                        {showFlash && <div className="flash-message text-red-500">{flashMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        {/* <label className="block" htmlFor="username">Username</label> */}
                        <input type="text" placeholder="Username"
                               className="w-3/4 px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                               value={username} onChange={e => setUsername(e.target.value)} />
                    </div>

                    <div className="mt-4">
                        {/* <label className="block">Password</label> */}
                        <input type="password" placeholder="Password"
                               className="w-3/4 px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                               value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="mt-4">
                        <button type="submit" className="w-3/4 px-4 py-2 mt-2 text-white nav-link">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>


        <div className="feature-cards-container absolute bottom-0 right-0 p-8">
            <div className="feature-cards varela-round-regular">
                {features.map((feature, index) => (
                    <FeatureCard key={index} title={feature.title} description={feature.description} />
                ))}
            </div>
        </div>

    </div>

    
)
}


Login.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,
};


export default Login;

