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

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'






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

    const [isFlipped, setIsFlipped] = useState(false)
    const handleFlip = () => {
        setIsFlipped(!isFlipped)
      }


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


    useEffect(() => {
        if (meals && meals.length > 0) {
          const validMeals = meals.filter((meal) => meal != null);
          const totals = validMeals.reduce(
            (acc, meal) => {
              acc.totalCalories += Number(meal.totalCalories);
              acc.totalQuantity += Number(meal.quantity);
              return acc;
            },
            { totalCalories: 0, totalQuantity: 0 }
          );
    
          totals.totalCalories = parseFloat(totals.totalCalories.toFixed(1));
          totals.totalQuantity = parseFloat(totals.totalQuantity.toFixed(1));
          setDietDetails(totals);
        } else {
          setDietDetails({
            totalCalories: 0,
            totalQuantity: 0,
          });
        }
      }, [meals]);

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



    const calorieGoal = currentPet?.caloriesDay
    const percentage = Math.min((dietDetails.totalCalories / calorieGoal) * 100, 100)

    const activityGoal = currentPet?.activitiesDay
    const activitiesCompleted = activitiesForWeek.length

    const activityPercentage = (activitiesCompleted / activityGoal) * 100;

    

    return (
        <div className="home-background">


<div className="custom-date-picker">
      <DatePicker selected={selectedDate} onChange={date => {
        setSelectedDate(date)
        console.log(`Date changed to: ${date.toISOString().split('T')[0]}`)
      }} />
    </div>

    {/*<div className="pet-details-cards">
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Card className="home-card">
                <Card.Img variant="top" src={addMealImage} className="card-image-top" />
                <Card.Body>
                  <Card.Title>Diet</Card.Title>
                  <button className="icon-button fas fa-edit" onClick={() => navigate('/dietdetails')}></button>
                </Card.Body>
              </Card>
            </div>
            <div className="flip-card-back">
              <div style={{ width: '200px', height: '200px', margin: 'auto' }}>
                <CircularProgressbar
                  value={percentage}
                  text={`${percentage.toFixed(0)}%`}
                  styles={buildStyles({
                    textColor: 'black',
                    pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                    trailColor: '#d6d6d6',
                  })}
                />
              </div>
              <div className="diet-card">
                <p>Total Calories: {dietDetails.totalCalories} kcal</p>
                <p>Calorie Goal: {calorieGoal} kcal</p>
                <p>Total Quantity: {dietDetails.totalQuantity} grams</p>
              </div>
            </div>
          </div>
                </div>*/}
      
                    <div className="pet-details-cards">
                        <Card className="home-card" title="Diet" style={{ width: '23rem' }}
                        onClick={() => navigate('/dietdetails')}
                        >
                <Card.Img variant="top" src={addMealImage} className="card-image-top"/>
                <Card.Body>
                    <Card.Title>Diet</Card.Title>

                    <button className="icon-button fas fa-edit" onClick={() => navigate('/dietdetails')}></button>
                </Card.Body>
            </Card>

                    





                        <Card className="home-card" title="Activity" style={{ width: '23rem' }}
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


                        <Card className="home-card" title="Schedule" style={{ width: '23rem' }}
                        onClick={() => navigate('/scheduledetails')}

                        >
                        <Card.Img variant="top" src={bowlImage} className="card-image-top"/>
                        <Card.Body>
                        <Card.Title>Schedule</Card.Title>
                     
                         <button className="icon-button fas fa-edit" onClick={() => navigate('/scheduledetails')}></button>
                    </Card.Body>
                        </Card>




                <Card className="home-card" title="ToDoList" style={{ width: '23rem'/* , height: '30rem' */ }}
                        onClick={() => navigate('/todolist')}

                        >
                        <Card.Img variant="top" src={petDetailsImage} className="card-image-top"/>
                        <Card.Body>
                        <Card.Title>ToDoList</Card.Title>
                      
                         <button className="icon-button fas fa-edit" onClick={() => navigate('/todolist')}></button>
                </Card.Body>
                        </Card>


  


                        <>
                       {/*  <div className="summary-cards-container"> */}
      {/* <Card border="primary" className="summary-card-home" style={{ width: '55rem' }}>
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

        <div className="diet-card">
          Total Calories: {dietDetails.totalCalories} kcal
                    <br />
                    Total Quantity: {dietDetails.totalQuantity} grams
            </div>
                            </div>

        </Card.Body>
      </Card> */}

<div className="summary-cards-container">
        <Card border="primary" className="summary-card-home" style={{ width: '27rem' }}>
          <Card.Header className="custom-heading-home">Diet</Card.Header>
          <Card.Body>

          <div className="progress-container">
            

            {/* <div style={{ width: '80%', height: '200px', margin: 'auto' }}> */}
            <div style={{ width: '90%', height: '270px', margin: 'auto' }}>
           {/*  <div className="progress-bar-wrapper"> */}
              <CircularProgressbar
                value={percentage}
                text={`${percentage.toFixed(0)}%`}
                styles={buildStyles({
                  textColor: 'black',
                  pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                  trailColor: '#d6d6d6',
                })}
              />
            </div>

            {/* <div className="diet-card"> */}
            <div className="progress-text">
                <p><span className="quadrant" style={{ backgroundColor: 'blue' }}></span>Total Calories: {dietDetails.totalCalories} kcal</p>
                <p><span className="quadrant" style={{ backgroundColor: 'green' }}></span>Calorie Goal: {calorieGoal} kcal</p>
                <p><span className="quadrant" style={{ backgroundColor: 'red' }}></span>Total Quantity: {dietDetails.totalQuantity} grams</p>

           {/*  <div className="diet-card">
              <p>Total Calories: {dietDetails.totalCalories} kcal</p>
              <p>Calorie Goal: {calorieGoal} kcal</p>
              <p>Total Quantity: {dietDetails.totalQuantity} grams</p> */}
            </div>

            </div>

          </Card.Body>
        </Card>


        <Card border="primary" className="summary-card-home" style={{ width: '27rem' }}>
          <Card.Header className="custom-heading-home">Active</Card.Header>
          <Card.Body>
          <div className="progress-container">
            <div style={{ width: '90%', height: '270px', margin: 'auto' }}>
              <CircularProgressbar
                value={activityPercentage}
                text={`${activityPercentage.toFixed(0)}%`}
                styles={buildStyles({
                  textColor: 'black',
                  pathColor: `rgba(62, 152, 199, ${activityPercentage / 100})`,
                  trailColor: '#d6d6d6',
                })}
              />
            </div>
            <div className="progress-text">
                <p><span className="quadrant" style={{ backgroundColor: 'blue' }}></span>Activities Completed: {activitiesCompleted}</p>
                <p><span className="quadrant" style={{ backgroundColor: 'green' }}></span>Activities Goal: {activityGoal}</p>
                
           {/*  <div className="diet-card">
            <p>Activities Completed: {activitiesCompleted}</p>
            <p>Activities Goal: {activityGoal}</p> */}
            </div>

            </div>
          </Card.Body>
        </Card>
        </div>
      
      
      

      {/* <Card border="primary" className="summary-card-home" style={{ width: '55rem' }}>
        
                                <Card.Header className="custom-heading-home">Activity Summary </Card.Header>
                                <Card.Body>
                                   

                             

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
      </Card> */}
     
    </>
    

                    </div>
            
    
        </div>
        



    )
}

export default Homepage
