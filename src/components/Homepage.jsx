import React, { useState } from 'react';

const Homepage = ({ onLogout }) => {
    const [petImage, setPetImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPetImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="home-background">
            {/* <div className="pet-image-section">
                <input type="file" onChange={handleImageChange} />
                {petImage && (
                    <div className="pet-image-container">
                        <img src={petImage} alt="Pet" className="pet-image" />
                    </div>
                )}
            </div> */}

            <div className="pet-details-section">
                <h2>Pet Details</h2>
                {/* Placeholder details, replace with actual data */}
                <p>Name: Fluffy</p>
                <p>Height: 30cm</p>
                <p>Weight: 5kg</p>
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
