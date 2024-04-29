import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DietDetails = () => {
  const navigate = useNavigate()
  const [meals, setMeals] = useState([])
  const [dietDetails, setDietDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

 
  

  useEffect(() => {
    const fetchMeals = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch('http://localhost:3000/api/pet/dietdetails', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch meals')
        }
        const data = await response.json()
        console.log('Fetched meals:', data)
        if (data.meals && data.meals.length > 0) {
          const validMeals = data.meals.filter(meal => meal != null) // Filter out null values
          setMeals(validMeals)
          setDietDetails(data)
        } else {
          console.error('No valid meals received:', data)
        }
        setIsLoading(false)
      } catch (error) {
        setError(error.message)
        setIsLoading(false)
      }
    }
  
    fetchMeals()
  }, [])
  

  const deleteMeal = async (mealId) => {
    console.log('Deleting meal with ID:', mealId)
    const token = localStorage.getItem('token')
    /* const userId = localStorage.getItem('userId')
    if (!userId) {
      console.error('User ID not found')
      return
    } */
    try {
        const response = await fetch(`http://localhost:3000/api/pet/dietdetails/${mealId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        if (response.ok) {
            // Remove the meal from the local state to update the UI
            /* setMeals(prevMeals => prevMeals.filter(meal => meal.id !== mealId)) */
            /* setMeals(prevMeals => prevMeals.filter(meal => meal._id !== mealId)) */
            
        } else {
            throw new Error('Failed to delete the meal')
        }
    } catch (error) {
        console.error('Error deleting meal:', error)
    }
}




  /* const editMeal = (mealId) => {
    navigate(`/dietdetails/edit/${mealId}`)
  } */

  return (
    <div>
      <h1>Diet Details</h1>
      {isLoading ? (
        <p>Loading diet details...</p>
      ) : error ? (
        <p>Error loading diet details: {error}</p>
      ) : (
        <>

{meals.length > 0 ? meals.map((meal, index) => {
    if (!meal) return null  // Skip rendering if meal is null or undefined
    return (
        <Card key={meal._id || index} className="diet-card">
            <Card.Header className="card-headerStyle">
              {meal.mealType} - Time: {meal.time}
              </Card.Header>
            <Card.Body>

               {/*  <Card.Title>Time: {meal.time}</Card.Title> */}
                <Card.Text>
                    Brand: {meal.selectedBrand}
                    <br/>
                    Total Calories: {meal.totalCalories} kcal
                    <br/>
                    Quantity: {meal.quantity} grams
                    </Card.Text>
                {/* <Button variant="primary" onClick={() => editMeal(meal._id)}>Edit</Button> */}

                <button className="btn btn-primary" onClick={() => navigate(`/dietdetails/edit/${meal._id}`)}>Edit</button>

                {/* <Button variant="danger" onClick={() => deleteMeal(meal._id)} className="ms-2">Delete</Button> */}
            </Card.Body>
        </Card>
    )
}) : (
    <p>No meals available.</p>
)}

{/* {meals.length > 0 ? meals.map((meal, index) => {
    if (!meal) return null
    return (
        <Card key={meal._id || index} className="diet-card">
            <Card.Header>{meal.mealType}</Card.Header>
            <Card.Body>
                <Card.Title>Time: {meal.time}</Card.Title>
                <Card.Text>
                    Total Calories: {meal.totalCalories} kcal
                    <br/>
                    Quantity: {meal.quantity} grams
                </Card.Text>
                <Button variant="primary" onClick={() => editMeal(meal._id)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteMeal(meal._id)} className="ms-2">Delete</Button>
            </Card.Body>
        </Card>
    )
}) : (
    <p>No meals available.</p>
)} */}


          {/* {meals.length > 0 ? meals.map((meal, index) => (
            <Card key={index} className="diet-card">
              <Card.Header>{meal.mealType}</Card.Header>
              <Card.Body>
                <Card.Title>Time: {meal.time}</Card.Title>
                <Card.Text>
                  Total Calories: {meal.totalCalories} kcal
                  <br/>
                  Quantity: {meal.quantity} grams
                </Card.Text>
                <Button variant="primary" onClick={() => editMeal(meal.id)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteMeal(meal.id)} className="ms-2">Delete</Button>
              </Card.Body>
            </Card>
          )) : (
            <p>No meals available.</p>
          )} */}
          {dietDetails && (
            <>
              <h2>Summary</h2>
              <p>Total Calories: {dietDetails.totalCalories} kcal</p>
              <p>Total Quantity: {dietDetails.quantity} grams</p>
              <p>Name: {dietDetails.name}</p>
            </>
          )}
          {/* <Button onClick={() => navigate('/dietdetails/addmeal')} className="mt-3">Create Meal</Button> */}
        </>
        
      )}
      <Button onClick={() => navigate('/dietdetails/addmeal')} className="mt-3">Create Meal</Button>
    </div>
  )
}

export default DietDetails
