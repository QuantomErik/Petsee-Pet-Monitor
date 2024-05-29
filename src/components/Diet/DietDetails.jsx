import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { fetchMeals } from './mealsSlice'


/**
 * DietDetails component that displays the diet details for a specific pet on a selected date.
 * Allows the user to view, edit, and create meals for the selected date.
 *
 * @component
 * @example
 * return (
 *   <DietDetails />
 * )
 */
const DietDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentPet = useSelector(state => state.pets.currentPet)
  const { meals, isLoading, error } = useSelector(state => state.meals)
  const [dietDetails, setDietDetails] = useState({
    totalCalories: 0,
    totalQuantity: 0
  })


  /**
   * Fetch meals for the selected pet and date whenever the current pet or selected date changes.
   */
  useEffect(() => {
    console.log("Current pet ID:", currentPet?.id)
    if (currentPet && currentPet.id) {
      console.log(`Fetching activities for date: ${selectedDate.toISOString().split('T')[0]}`)
      dispatch(fetchMeals({ petId: currentPet.id, date: selectedDate.toISOString().split('T')[0] }))
  }
}, [dispatch, currentPet, selectedDate])


 /**
   * Calculate total calories and quantity from the fetched meals and update the state.
   */
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
      if (!meal) return null
      return (
        <Card key={meal._id || index} className="diet-card">
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
            <Button className="btn btn-primary" onClick={() => navigate(`/dietdetails/edit/${meal._id}`)}>Edit</Button>
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
