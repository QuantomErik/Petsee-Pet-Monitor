// src/components/Register.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Function to handle user registration
export async function registerUser(userData) {

    if (!userData.username) {
        throw new Error('Username is required')
      }
      if (!userData.email) {
        throw new Error('Email is required');
      }
      if (!userData.password) {
        throw new Error('Password is required');
      }

    const response = await fetch('https://cscloud7-95.lnu.se/petsee/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Registration failed')
    }
    return response.json()
}

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: ''
    
    })
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const data = await registerUser(userData)
            console.log('Registration successful:', data)
            navigate('/login')
            
        } catch (error) {
            setErrorMessage(error.message)
            console.error('Registration error:', error)
        }
    }


    return (
        
        <div className="max-w-sm mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                    />
                </div>
                {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Register
                    </button>
                </div>
            </form>
        </div>
        
    )
}



export default Register
