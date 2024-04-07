// src/components/Login.jsx
import React, { useState } from 'react'
import PropTypes from 'prop-types'
/* import backgroundImage from '../images/background.webp' */


// Add props parameter to your Login function
const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(credentials) {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await loginUser({ username, password });
            console.log('Login successful:', data);
            localStorage.setItem('token', data.accessToken) // Store the token
            // Call the onLoginSuccess function passed as a prop
            props.onLoginSuccess();
        } catch (error) {
            console.error('Login error:', error);
        }
    }
    
    /* const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      } */

    return (
        


             <div className="login-background flex min-h-screen overflow-hidden">
        <div className="login-container">

            
            <div className="px-8 py-6 w-full max-w-md"> {/* Control the width of the form here */}
            <div className="text-center mb-6">
                        <h3 className="text-4xl font-bold">Welcome to</h3>
                        <h3 className="text-4xl font-bold text-blue-600">Petsee</h3>
                        </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label className="block" htmlFor="username">Username</label>
                        <input type="text" placeholder="Username"
                               className="w-3/4 px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                               value={username} onChange={e => setUsername(e.target.value)} />
                    </div>

                    <div className="mt-4">
                        <label className="block">Password</label>
                        <input type="password" placeholder="Password"
                               className="w-3/4 px-4 py-2 mt-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                               value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="flex justify-start mt-6">
                        <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        
    </div>
);
};
        {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">Welcome to Petsee</h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="username">Username</label>
                <input type="text" placeholder="Username"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input type="password" placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="flex items-baseline justify-between">
                <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }; */}
       /*  <div className="max-w-sm mx-auto mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="******************"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}; */

Login.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,
};


export default Login;

