import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import bowlImage from './bowl2.png';
import addMealImage from '../images/addMeal.webp';
import activityImage from '../images/activity.webp';
import petDetailsImage from '../images/background.webp';



/* const Card = ({ title, children }) => (
    <div className="petcard">
        <h3>{title}</h3>
        <div>{children}</div>
    </div>
) */

const Homepage = ({ onLogout }) => {
    const navigate = useNavigate()
    const [petDetails, setPetDetails] = useState(null)

    /* const [dietDetails, setDietDetails] = useState(null) */
    const [dietDetails, setDietDetails] = useState({ meals: [] }); 
    const [dietError, setDietError] = useState(false)

    const [activityDetails, setActivityDetails] = useState(null)
    const [activityError, setActivityError] = useState(false)

    const [scheduleDetails, setScheduleDetails] = useState(null);
    const [scheduleError, setScheduleError] = useState(false);


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
                    console.log(data) // Log the data to see its structure
                    setPetDetails(data)
                } else {
                    throw new Error('No pet details found');
                }
            } catch (error) {
                console.error('Error fetching pet details:', error);
                setPetDetails(null) // Ensures that petDetails is null if there's an error
            }
        };

        fetchPetDetails();
    }, [])

    useEffect(() => {
        // Existing code to fetch pet details...
        const fetchDietDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3000/api/pet/dietdetails', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json()
                    console.log('Fetched diet details:', data); 
                    /* setDietDetails(data) */
                    setDietDetails({ meals: data, totalCalories: data.reduce((sum, item) => sum + item.totalCalories, 0) });
                    setDietError(false)
                } else {
                    console.error('Failed to fetch diet details')
                    console.log(await response.text())
                }
            } catch (error) {
                console.error('Error fetching diet details:', error)
            }
        };
    
        fetchDietDetails();
    }, [])

    useEffect(() => {
        const fetchActivityDetails = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch('http://localhost:3000/api/pet/activitydetails', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json()
                    console.log(data) // Log the data to see its structure
                    setActivityDetails(data)
                } else {
                    throw new Error('No activity details found')
                }
            } catch (error) {
                console.error('Error fetching activity details:', error)
                setActivityDetails(null)
            }
        };

        fetchActivityDetails();
    }, [])


    useEffect(() => {
        const fetchScheduleDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3000/api/pet/scheduledetails', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json()
                    setScheduleDetails(data)
                } else {
                    throw new Error('No schedule details found')
                }
            } catch (error) {
                console.error('Error fetching schedule details:', error)
                setScheduleDetails(null);
                setScheduleError(true);
            }
        };
    
        fetchScheduleDetails();
    }, [])
    

    return (
        <div className="home-background">
            {petDetails ? (
                <>
                    <div className="pet-image-section">
                        <img src={`data:image/jpeg;base64,${petDetails.image}`} alt="Pet" className="pet-image-circle" />
                    </div>
                    <div className="pet-details-cards">
                        <Card title="Pet Details" style={{ width: '23rem' }}>
                        <Card.Img variant="top" src={petDetailsImage} className="card-image-top"/>
                        <Card.Body>
                        <Card.Title>Pet Details</Card.Title>
                        <div>
                            <p>Name: {petDetails.name}</p>
                            <p>Animal Type: {petDetails.animalType}</p>
                            <p>Age: {petDetails.age}</p>
                            <p>Weight: {petDetails.weight}</p>
                            <p>Length: {petDetails.length}</p>
                            <p>Favourite Food: {petDetails.favouriteFood}</p>
                            <p>Favourite Toy: {petDetails.favouriteToy}</p>
                            <p>Breed: {petDetails.breed}</p>
                            <p>Medical Notes: {petDetails.medicalNotes}</p>
                            </div>
                            <button className="icon-button fas fa-edit" onClick={() => navigate('/petdetails')}></button>
                            </Card.Body>
                        </Card>

                    

                        <Card title="Diet" style={{ width: '23rem' }}>
  <Card.Img variant="top" src={addMealImage} className="card-image-top"/>
  <Card.Body>
    <Card.Title>Diet</Card.Title>
    {/* Use a div or omit the container tag entirely instead of Card.Text when nesting ul or div */}
    <div>
      {dietDetails ? (
        <>
          <ul>
            {dietDetails.meals.map((meal, index) => (
              <li key={index}>{`${meal.mealType}: ${meal.time}`}</li>
            ))}
          </ul>
          <div>Total Calories: {dietDetails.totalCalories} kcal</div>
          <div>Total Quantity: {dietDetails.quantity} grams</div>
          <div>Name: {dietDetails.name}</div>
        </>
      ) : dietError ? (
        "Error loading diet details. Please try again."
      ) : (
        "Loading diet details..."
      )}
    </div>
    <button className="icon-button fas fa-edit" onClick={() => navigate('/dietdetails')}></button>
  </Card.Body>
</Card>





                        <Card title="Activity" style={{ width: '23rem' }}>
                        <Card.Img variant="top" src={activityImage} className="card-image-top"/>
                        <Card.Body>
                        <Card.Title>Activity</Card.Title>
                        <div>

                        {activityDetails ? (
                            <>

                            <p>Type: {activityDetails.type}</p>
                            <p>Duration: {activityDetails.duration}</p>
                            <p>Intensity: {activityDetails.intensity}</p>
                            <p>Date: {activityDetails.date}</p>
                            <p>Notes: {activityDetails.notes}</p>
                            
                            {/* <button className="icon-button fas fa-edit" onClick={() => navigate('/activitydetails')}></button> */}

                            </>
                    ) : activityError ? (
                    <p>Error loading activity details. Please try again.</p>
                    ) : (
                        <p>Loading activity details...</p>
                        )}
                    </div>
                            <button className="icon-button fas fa-edit" onClick={() => navigate('/activitydetails')}></button>
                    </Card.Body>
                        </Card>


                        <Card title="Schedule" style={{ width: '23rem' }}>
                        <Card.Img variant="top" src={bowlImage} className="card-image-top"/>
                        <Card.Body>
                        <Card.Title>Schedule</Card.Title>
                        <div>

                        {scheduleDetails ? (
                        <>
                            <p>Date: {new Date(scheduleDetails.date).toLocaleDateString()}</p>
                        <p>Note: {scheduleDetails.note}</p>
                        {/* <button className="icon-button fas fa-edit" onClick={() => navigate('/scheduledetails')}></button> */}
                             </>
                        ) : scheduleError ? (
                        <p>Error loading schedule details. Please try again.</p>
                        ) : (
                        <p>Loading schedule details...</p>
                        )}
                    </div>
                            <button className="icon-button fas fa-edit" onClick={() => navigate('/scheduledetails')}></button>
                    </Card.Body>
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

                    {/* <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the cards content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    </Card> */}

            <div className="pet-functions-section">
                <button onClick={() => {/* function to add food */}}>Add Food</button>
                <button onClick={() => {/* function to add activity */}}>Add Activity</button>
            </div>

            
        </div>
    );
};

export default Homepage;
