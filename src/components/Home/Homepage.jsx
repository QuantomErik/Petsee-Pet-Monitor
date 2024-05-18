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
import { fetchActivitiesForWeek } from '../Activity/activitiesSlice'

import { fetchActivitiess } from '../Activity/activitiesSlice'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'






/* const Card = ({ title, children }) => (
    <div className="petcard">
        <h3>{title}</h3>
        <div>{children}</div>
    </div>
) */

const Homepage = ({ onLogout }) => {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const dispatch = useDispatch() //new
    

    const navigate = useNavigate()
    const [petDetails, setPetDetails] = useState(null)

    /* const [dietDetails, setDietDetails] = useState(null) */
    const [dietDetails, setDietDetails] = useState({ meals: [] })
    const [dietError, setDietError] = useState(false)

    const [activityDetails, setActivityDetails] = useState(null)
    const [activityError, setActivityError] = useState(false)

    const [scheduleDetails, setScheduleDetails] = useState(null)
    const [scheduleError, setScheduleError] = useState(false)

    const { activitiesForWeek = [], isLoading: isActivitiesLoading, error: activitiesError } = useSelector(state => state.activities)
    const { meals, isLoading: isMealsLoading, error: mealsError } = useSelector(state => state.meals)
    const currentPet = useSelector(state => state.pets.currentPet)

    const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)))
    const [endDate, setEndDate] = useState(new Date())
    const [date, setDate] = useState(new Date())


    /* useEffect(() => {
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
    }, []) */

    /* useEffect(() => {
        dispatch(fetchMeals())
    }, [dispatch]) */

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

   /*  useEffect(() => {
        if (currentPet && currentPet.id) {
            console.log(`Fetching activities for date: ${selectedDate.toISOString().split('T')[0]}`)
            dispatch(fetchActivitiess({ petId: currentPet.id, date: selectedDate.toISOString().split('T')[0] }))
        }
    }, [dispatch, currentPet, selectedDate]) */

    useEffect(() => {
        if (currentPet && currentPet.id) {
            console.log('Fetching activities for week with pet ID:', currentPet.id)
            dispatch(fetchActivitiesForWeek({
                petId: currentPet.id,
                startDate,
                endDate,
                date: selectedDate.toISOString().split('T')[0],
              
            }))
        }
    }, [dispatch, currentPet, date, startDate, endDate, selectedDate])

    useEffect(() => {
        if (currentPet && currentPet.id) {
            console.log('Fetching activities for week with pet ID:', currentPet.id)
            dispatch(fetchMeals({
                petId: currentPet.id,
                
                date: selectedDate.toISOString().split('T')[0],
              
            }))
        }
    }, [dispatch, currentPet, selectedDate])

   /*  useEffect(() => {
        if (currentPet && currentPet.id) {
            dispatch(fetchActivitiesForWeek({ petId: currentPet.id }))
        }
    }, [dispatch, currentPet]) */

    console.log('Rendered Homepage with state:', { meals, activitiesForWeek, currentPet })

    /* useEffect(() => {
        const fetchActivityDetails = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch('https://cscloud7-95.lnu.se/petsee/pet/activitydetails', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    console.log(data)
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
    }, []) */


    useEffect(() => {
        const fetchScheduleDetails = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch('https://cscloud7-95.lnu.se/petsee/pet/scheduledetails', {
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


<div className="custom-date-picker">
      <DatePicker selected={selectedDate} onChange={date => {
        setSelectedDate(date)
        console.log(`Date changed to: ${date.toISOString().split('T')[0]}`)
      }} />
    </div>

            {/* {petDetails ? (
                <> */}
                    {/* <div className="pet-image-section">
                        <img src={`data:image/jpegbase64,${petDetails.image}`} alt="Pet" className="pet-image-circle" />
                    </div> */}
                    <div className="pet-details-cards">
                        {/* <Card title="Pet Details" style={{ width: '23rem' }}
                        onClick={() => navigate('/petdetails')}

                        >
                        <Card.Img variant="top" src={petDetailsImage} className="card-image-top"/>
                        <Card.Body>
                        <Card.Title>Profile</Card.Title>
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
                        </Card> */}

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




                <Card title="Schedule" style={{ width: '23rem' }}
                        onClick={() => navigate('/todolist')}

                        >
                        <Card.Img variant="top" src={petDetailsImage} className="card-image-top"/>
                        <Card.Body>
                        <Card.Title>ToDoList</Card.Title>
                      
                         <button className="icon-button fas fa-edit" onClick={() => navigate('/todolist')}></button>
                </Card.Body>
                        </Card>


                       {/*  <div className="date-picker-container">
                            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                            <DatePicker selected={date} onChange={date => setDate(date)} />
                        </div> */}

{/* <div className="date-picker-container">
      <DatePicker selected={selectedDate} onChange={date => {
        setSelectedDate(date)
        console.log(`Date changed to: ${date.toISOString().split('T')[0]}`)
      }} />
    </div> */}


                        <>
                       {/*  <div className="summary-cards-container"> */}
      <Card border="primary" className="summary-card-home" style={{ width: '53rem' }}>
        <Card.Header className="custom-heading-home">Diet Summary</Card.Header>
        <Card.Body>
        <div>
                                {isMealsLoading ? (
                                    <div>Loading...</div>
                                ) : mealsError ? (
                                    <div>Error: {mealsError}</div>
                                ) : meals.length > 0 ? (
                                    meals.map((meal, index) => (
                                        <div key={index}>
                                            <strong>{meal.mealType}</strong>: {meal.time} - {meal.quantity} grams - {meal.totalCalories} kcal
                                        </div>
                                    ))
                                ) : (
                                    <p>No meals found for this date</p>
                                )}
                            </div>
        </Card.Body>
      </Card>
      
      

      <Card border="primary" className="summary-card-home" style={{ width: '53rem' }}>
        
                                <Card.Header className="custom-heading-home">Activity Summary </Card.Header>
                                <Card.Body>
                                    {/* <Card.Title>Activities This Week</Card.Title> */}

                             

                                    <div>
                                        {isActivitiesLoading ? (
                                            <div>Loading...</div>
                                        ) : activitiesError ? (
                                            <div>Error: {activitiesError}</div>
                                        ) : activitiesForWeek.length > 0 ? (
                                            activitiesForWeek.map((activity, index) => (
                                                <div key={index}>
                                                    <strong>{activity.type}</strong>: {activity.duration} minutes - {activity.intensity}
                                                </div>
                                            ))
                                        ) : (
                                            <p>No activities found for this date</p>
                                        )}
                                    </div>
        </Card.Body>
      </Card>
     {/*  </div> */}
    </>
    

                    </div>
            {/*     </>
            ) : ( */}
                {/* <>
                    <p>Loading pet details...</p>
                    <div>
                        <p>No pet details found. Add your pets details to get started.</p>
                        <button onClick={() => navigate('/petdetails')} className="add-pet-details-button">Add Pet Details</button>
                    </div>
                </>
            )} */}

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
    

{/* <>
      <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Primary Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </Card.Text>
        </Card.Body>
      </Card>
      

      <Card border="light" style={{ width: '18rem' }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Light Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </Card.Text>
        </Card.Body>
      </Card>
      
    </> */}

            

    {/* <Dock /> */}
        </div>
        



    )
}

export default Homepage
