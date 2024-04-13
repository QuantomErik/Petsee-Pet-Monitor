import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const Card = ({ title, children }) => (
    <div className="petcard">
        <h3>{title}</h3>
        <div>{children}</div>
    </div>
)

const Homepage = ({ onLogout }) => {
    const navigate = useNavigate();
    const [petDetails, setPetDetails] = useState(null);

    useEffect(() => {
        const fetchPetDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3000/api/pet/petdetails', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data); // Log the data to see its structure
                    setPetDetails(data);
                } else {
                    throw new Error('No pet details found');
                }
            } catch (error) {
                console.error('Error fetching pet details:', error);
                setPetDetails(null); // Ensures that petDetails is null if there's an error
            }
        };

        fetchPetDetails();
    }, []);

    return (
        <div className="home-background">
            {petDetails ? (
                <>
                    <div className="pet-image-section">
                        <img src={`data:image/jpeg;base64,${petDetails.image}`} alt="Pet" className="pet-image-circle" />
                    </div>
                    <div className="pet-details-cards">
                        <Card title="Pet Details">
                            <p>Name: {petDetails.name}</p>
                            <p>Age: {petDetails.age}</p>
                            <p>Weight: {petDetails.weight}</p>
                            <p>Length: {petDetails.length}</p>
                            <p>Favourite Food: {petDetails.favouriteFood}</p>
                            <p>Favourite Toy: {petDetails.favouriteToy}</p>
                            <button className="icon-button fas fa-edit" onClick={() => navigate('/petdetails')}></button>
                        </Card>
                        {/* Placeholder for other cards */}
                        <Card title="Diet">
                            <button className="icon-button fas fa-edit" onClick={() => console.log('Edit Details')}></button>
                        </Card>
                        <Card title="Activity">
                            <button className="icon-button fas fa-edit" onClick={() => console.log('Edit Details')}></button>
                        </Card>
                        <Card title="Schedule">
                            <button className="icon-button fas fa-edit" onClick={() => console.log('Edit Details')}></button>
                        </Card>
                    </div>
                </>
            ) : (
                <>
                    <p>Loading pet details...</p>
                    <div>
                        <p>No pet details found. Add your pets details to get started.</p>
                        <button onClick={() => navigate('/petdetails')} className="add-pet-details-button">Add Pet Details</button>
                    </div>
                </>
            )}

            <div className="pet-functions-section">
                <button onClick={() => {/* function to add food */}}>Add Food</button>
                <button onClick={() => {/* function to add activity */}}>Add Activity</button>
            </div>

            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Homepage;
