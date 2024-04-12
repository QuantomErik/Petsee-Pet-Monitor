import React, { useState, useEffect } from 'react';

const Homepage = ({ onLogout }) => {
    const [petProfile, setPetProfile] = useState(null);

    useEffect(() => {
        const fetchPetProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3000/api/pet/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data); // Log the data to see its structure
                    setPetProfile(data);
                } else {
                    throw new Error('Failed to fetch pet profile');
                }
            } catch (error) {
                console.error('Error fetching pet profile:', error);
            }
        };

        fetchPetProfile();
    }, []);

    return (
        <div className="home-background">
            <div className="pet-details-section">
                <h2>Pet Details</h2>
                {petProfile ? (
                    <>
                        <img src={`data:image/jpeg;base64,${petProfile.image}`} alt="Pet" className="pet-image-circle" />
                        <p>Name: {petProfile.name}</p>
                        <p>Age: {petProfile.age}</p>
                        <p>Weight: {petProfile.weight}</p>
                        {/* Add more details as needed */}
                    </>
                ) : (
                    <p>Loading pet details...</p>
                )}
            </div>

            <div className="pet-functions-section">
                <button onClick={() => {/* function to add food */}}>Add Food</button>
                <button onClick={() => {/* function to add activity */}}>Add Activity</button>
            </div>

            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Homepage;
