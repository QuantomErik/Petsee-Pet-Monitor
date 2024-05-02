import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import bowlImage from './bowl2.png'
import addMealImage from '../../images/addMeal.webp'
import activityImage from '../../images/activity.webp'
import petDetailsImage from '../../images/background.webp'
import Dock from '../Dock/Dock.jsx'

import { useDispatch, useSelector } from 'react-redux'
import { fetchMeals } from '../Diet//mealsSlice'



/* const Card = ({ title, children }) => (
    <div className="petcard">
        <h3>{title}</h3>
        <div>{children}</div>
    </div>
) */

const Homepage = ({ onLogout }) => {

    const dispatch = useDispatch() //new
    const { meals, isLoading, error } = useSelector(state => state.meals) //new

    const navigate = useNavigate()
    const [petDetails, setPetDetails] = useState(null)

    /* const [dietDetails, setDietDetails] = useState(null) */
    const [dietDetails, setDietDetails] = useState({ meals: [] })
    const [dietError, setDietError] = useState(false)

    const [activityDetails, setActivityDetails] = useState(null)
    const [activityError, setActivityError] = useState(false)

    const [scheduleDetails, setScheduleDetails] = useState(null)
    const [scheduleError, setScheduleError] = useState(false)


    useEffect(() => {
        const fetchPetDetails = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch('http://localhost:3000/api/pet/petdetails', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
                    setPetDetails(data)
                } else {
                    throw new Error('No pet details found')
                }
            } catch (error) {
                console.error('Error fetching pet details:', error)
                setPetDetails(null)
            }
        }

        fetchPetDetails()
    }, [])

    useEffect(() => {
        dispatch(fetchMeals())
    }, [dispatch])

   /*  useEffect(() => {
       
        const fetchDietDetails = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch('http://localhost:3000/api/pet/dietdetails', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log('Fetched diet details:', data) 
                   
                    setDietError(false)
                } else {
                    console.error('Failed to fetch diet details')
                    console.log(await response.text())
                }
            } catch (error) {
                console.error('Error fetching diet details:', error)
            }
        }
    
        fetchDietDetails()
    }, []) */

    useEffect(() => {
        const fetchActivityDetails = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch('http://localhost:3000/api/pet/activitydetails', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
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
        }

        fetchActivityDetails()
    }, [])


    useEffect(() => {
        const fetchScheduleDetails = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch('http://localhost:3000/api/pet/scheduledetails', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                if (response.ok) {
                    const data = await response.json()
                    setScheduleDetails(data)
                } else {
                    throw new Error('No schedule details found')
                }
            } catch (error) {
                console.error('Error fetching schedule details:', error)
                setScheduleDetails(null)
                setScheduleError(true)
            }
        }
    
        fetchScheduleDetails()
    }, [])
    

    return (
        <div className="home-background">
            {petDetails ? (
                <>
                    {/* <div className="pet-image-section">
                        <img src={`data:image/jpegbase64,${petDetails.image}`} alt="Pet" className="pet-image-circle" />
                    </div> */}
                    <div className="pet-details-cards">
                        <Card title="Pet Details" style={{ width: '23rem' }}
                        onClick={() => navigate('/petdetails')}

                        >
                        <Card.Img variant="top" src={petDetailsImage} className="card-image-top"/>
                        <Card.Body>
                        <Card.Title>Profile</Card.Title>
                        {/* <div>
                            <p>Name: {petDetails.name}</p>
                            <p>Animal Type: {petDetails.animalType}</p>
                            <p>Age: {petDetails.age}</p>
                            <p>Weight: {petDetails.weight}</p>
                            <p>Length: {petDetails.length}</p>
                            <p>Favourite Food: {petDetails.favouriteFood}</p>
                            <p>Favourite Toy: {petDetails.favouriteToy}</p>
                            <p>Breed: {petDetails.breed}</p>
                            <p>Medical Notes: {petDetails.medicalNotes}</p>
                            </div> */}
                            <button className="icon-button fas fa-edit" onClick={() => navigate('/petdetails')}></button>
                            </Card.Body>
                        </Card>

                        <Card title="Diet" style={{ width: '23rem' }}
                        onClick={() => navigate('/dietdetails')}

                        >
                <Card.Img variant="top" src={addMealImage} className="card-image-top"/>
                <Card.Body>
                    <Card.Title>Diet</Card.Title>

                   {/*  <div>
                        {isLoading ? (
                            <p>Loading diet details...</p>
                        ) : error ? (
                            <p>Error loading diet details. Please try again.</p>
                        ) : (
                            <ul>
                                {meals.map((meal, index) => (
                                    <li key={index}>{`${meal.mealType}: ${meal.time}`}</li>
                                ))}
                            </ul>
                        )}
                    </div> */}

                    <button className="icon-button fas fa-edit" onClick={() => navigate('/dietdetails')}></button>
                </Card.Body>
            </Card>

                    
{/* 
                        <Card title="Diet" style={{ width: '23rem' }}>
  <Card.Img variant="top" src={addMealImage} className="card-image-top"/>
  <Card.Body>
    <Card.Title>Diet</Card.Title>
   
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
</Card> */}





                        <Card title="Activity" style={{ width: '23rem' }}
                        onClick={() => navigate('/activitydetails')}

                        >
                        <Card.Img variant="top" src={activityImage} className="card-image-top"/>
                        <Card.Body>
                        <Card.Title>Activity</Card.Title>
                        {/* <div>

                        {activityDetails ? (
                            <>

                            <p>Type: {activityDetails.type}</p>
                            <p>Duration: {activityDetails.duration}</p>
                            <p>Intensity: {activityDetails.intensity}</p>
                            <p>Date: {activityDetails.date}</p>
                            <p>Notes: {activityDetails.notes}</p>
                            
                            

                            </>
                    ) : activityError ? (
                    <p>Error loading activity details. Please try again.</p>
                    ) : (
                        <p>Loading activity details...</p>
                        )}
                    </div> */}
                            <button className="icon-button fas fa-edit" onClick={() => navigate('/activitydetails')}></button>
                    </Card.Body>
                        </Card>


                        <Card title="Schedule" style={{ width: '23rem' }}
                        onClick={() => navigate('/scheduledetails')}

                        >
                        <Card.Img variant="top" src={bowlImage} className="card-image-top"/>
                        <Card.Body>
                        <Card.Title>Schedule</Card.Title>
                       {/*  <div>

                        {scheduleDetails ? (
                        <>
                            <p>Date: {new Date(scheduleDetails.date).toLocaleDateString()}</p>
                        <p>Note: {scheduleDetails.note}</p>
                        
                             </>
                        ) : scheduleError ? (
                        <p>Error loading schedule details. Please try again.</p>
                        ) : (
                        <p>Loading schedule details...</p>
                        )}
                    </div> */}
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

            <CardGroup>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This card has supporting text below as a natural lead-in to
            additional content.{' '}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This card has even longer content than the
            first to show that equal height action.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    </CardGroup>

    {/* <Dock /> */}
        </div>



    )
}

export default Homepage
