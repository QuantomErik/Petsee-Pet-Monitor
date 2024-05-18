import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { fetchMeals } from './mealsSlice'

const DietDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentPet = useSelector(state => state.pets.currentPet)
  const { meals, isLoading, error } = useSelector(state => state.meals)
  /* const [meals, setMeals] = useState([]) */
 /*  const [dietDetails, setDietDetails] = useState(null) */
 /*  const [isLoading, setIsLoading] = useState(true) */
  /* const [error, setError] = useState(null) */
  const [dietDetails, setDietDetails] = useState({
    totalCalories: 0,
    totalQuantity: 0
  })

 
  

  useEffect(() => {
    console.log("Current pet ID:", currentPet?.id)
    if (currentPet && currentPet.id) {
      console.log(`Fetching activities for date: ${selectedDate.toISOString().split('T')[0]}`)
      dispatch(fetchMeals({ petId: currentPet.id, date: selectedDate.toISOString().split('T')[0] }))
  }
}, [dispatch, currentPet, selectedDate])

useEffect(() => {
  if (meals && meals.length > 0) {
    const validMeals = meals.filter(meal => meal != null)
    const totals = validMeals.reduce((acc, meal) => {
      acc.totalCalories += Number(meal.totalCalories)
      acc.totalQuantity += Number(meal.quantity)
      return acc
    }, { totalCalories: 0, totalQuantity: 0 })

    totals.totalCalories = parseFloat(totals.totalCalories.toFixed(1))
    totals.totalQuantity = parseFloat(totals.totalQuantity.toFixed(1))
    setDietDetails(totals)
  } else {
    setDietDetails({
        totalCalories: 0,
        totalQuantity: 0
    })
}
}, [meals])

    
    
    /* const fetchMeals = async () => {
      
      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${currentPet.id}/dietdetails`, {
       
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


const totals = validMeals.reduce((acc, meal) => {
  acc.totalCalories += Number(meal.totalCalories)
  acc.totalQuantity += Number(meal.quantity)
  return acc
}, { totalCalories: 0, totalQuantity: 0 })

totals.totalCalories = parseFloat(totals.totalCalories.toFixed(1))
totals.totalQuantity = parseFloat(totals.totalQuantity.toFixed(1))

setDietDetails(totals)
        
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
   */

  




  /* const editMeal = (mealId) => {
    navigate(`/dietdetails/edit/${mealId}`)
  } */

  return (
    <div>
    <h1 className="custom-heading">Diet Details</h1>

    <div className="custom-date-picker">
      <DatePicker selected={selectedDate} onChange={date => {
        setSelectedDate(date)
        console.log(`Date changed to: ${date.toISOString().split('T')[0]}`)
      }} />
    </div>

    {isLoading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>Error: {error}</div>
    ) : meals.length > 0 ? meals.map((meal, index) => {
      if (!meal) return null  // Skip rendering if meal is null or undefined
      return (
        <Card key={meal.id || index} className="diet-card">
          <Card.Header className="card-headerStyle">
            {meal.mealType} - Time: {meal.time}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              Brand: {meal.selectedBrand}
              <br />
              Total Calories: {parseFloat(meal.totalCalories).toFixed(1)} kcal
              <br />
              Quantity: {parseFloat(meal.quantity).toFixed(1)} grams
            </Card.Text>
            <Button className="btn btn-primary" onClick={() => navigate(`/dietdetails/edit/${meal.id}`)}>Edit</Button>
          </Card.Body>
        </Card>
      )
    }) : (
      <p>No meals available.</p>
    )}

    {dietDetails && (
      <Card className="diet-card summary-card">
        <Card.Header className="card-headerStyle">
          Summary
        </Card.Header>
        <Card.Text>
          Total Calories: {dietDetails.totalCalories} kcal
          Total Quantity: {dietDetails.totalQuantity} grams
        </Card.Text>
      </Card>
    )}

    <Button onClick={() => navigate('/dietdetails/addmeal')} className="mt-3">Create Meal</Button>
  </div>
)
}

export default DietDetails
