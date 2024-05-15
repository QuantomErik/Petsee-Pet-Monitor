import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'

const DietDetails = () => {
  const navigate = useNavigate()
  const currentPet = useSelector(state => state.pets.currentPet)
  const [meals, setMeals] = useState([])
 /*  const [dietDetails, setDietDetails] = useState(null) */
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dietDetails, setDietDetails] = useState({
    totalCalories: 0,
    totalQuantity: 0
  })

 
  

  useEffect(() => {
    console.log("Current pet ID:", currentPet?.id)

    
    
    const fetchMeals = async () => {
      
      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${currentPet.id}/dietdetails`, {
        /* const response = await fetch('http://localhost:3000/api/pet/dietdetails', { */
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
          const validMeals = data.meals.filter(meal => meal != null)
          setMeals(validMeals)

// Calculate totals
const totals = validMeals.reduce((acc, meal) => {
  acc.totalCalories += Number(meal.totalCalories)
  acc.totalQuantity += Number(meal.quantity)
  return acc
}, { totalCalories: 0, totalQuantity: 0 })

totals.totalCalories = parseFloat(totals.totalCalories.toFixed(1))
totals.totalQuantity = parseFloat(totals.totalQuantity.toFixed(1))

setDietDetails(totals)
          /* setDietDetails(data) */
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

    console.log("Component mounted, checking for flash message.")
    const message = localStorage.getItem('flashMessage')
    if (message) {
      console.log('Flash message found:', message)
      toast.success(message)
      localStorage.removeItem('flashMessage')
    } else {
      console.log('No flash message found.')
    }
    
  },  [currentPet])
  

  const deleteMeal = async (mealId) => {
    console.log('Deleting meal with ID:', mealId)
    const token = localStorage.getItem('token')
    /* const userId = localStorage.getItem('userId')
    if (!userId) {
      console.error('User ID not found')
      return
    } */
    try {
        const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/dietdetails/${mealId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        if (response.ok) {
           console.log('Deleted')
            
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
      <h1 className="custom-heading">Diet Details</h1>
     
        <>

{meals.length > 0 ? meals.map((meal, index) => {
    if (!meal) return null  // Skip rendering if meal is null or undefined
    return (
        <Card key={meal.id || index} className="diet-card">
            <Card.Header className="card-headerStyle">
              {meal.mealType} - Time: {meal.time}
              </Card.Header>
            <Card.Body>

               {/*  <Card.Title>Time: {meal.time}</Card.Title> */}
                <Card.Text>
                    Brand: {meal.selectedBrand}
                    <br/>
                    Total Calories: {parseFloat(meal.totalCalories).toFixed(1)} kcal
                    <br/>
                    Quantity: {parseFloat(meal.quantity).toFixed(1)} grams
                    </Card.Text>
                {/* <Button variant="primary" onClick={() => editMeal(meal._id)}>Edit</Button> */}
                
                <button className="btn btn-primary" onClick={() => navigate(`/dietdetails/edit/${meal.id}`)}>Edit</button>

                {/* <Button variant="danger" onClick={() => deleteMeal(meal._id)} className="ms-2">Delete</Button> */}
            </Card.Body>
        </Card>
    )
}) : (
    <p>No meals available.</p>
)}


          {dietDetails && (
            <>
            <Card className="diet-card summary-card">
            <Card.Header className="card-headerStyle">
              Summary
              </Card.Header>
              <Card.Text>
             Total Calories: {dietDetails.totalCalories} kcal
              Total Quantity: {dietDetails.quantity} grams
            </Card.Text>
              </Card>
            </>
            
          )}
          
          {/* <Button onClick={() => navigate('/dietdetails/addmeal')} className="mt-3">Create Meal</Button> */}
        </>
        
      
      <Button onClick={() => navigate('/dietdetails/addmeal')} className="mt-3">Create Meal</Button>
    </div>
  )
}

export default DietDetails
