
import React, { useReducer, useEffect, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'



const brandsData = {
  brands: [
    {
      name: "Acana",
      caloriesPerGram: 3405 / 1000,
      nutrients: {
        CrudeProtein: 31,
        FatContent: 17,
        CrudeAsh: 9,
        CrudeFibre: 6,
        Moisture: 12,
        Calcium: 1.5,
        Phosphorus: 1.1,
        Omega3FattyAcids: 1,
        Omega6FattyAcids: 1.2
      }
    },
  ]
}

const dietReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        currentMeal: {
          ...state.currentMeal,
          [action.field]: action.value,
        }
      }
    case 'ADD_MEAL':
      return {
        ...state,
        meals: [...state.meals, action.meal],
        currentMeal: { mealType: '', time: '', quantity: '0' }
      }
    case 'UPDATE_NUTRIENTS':
      return {
        ...state,
        nutrients: action.nutrients,
        totalCalories: action.totalCalories
      }
    default:
      return state
  }
}


const useSaveDietDetails = (isSubmitting, dietDetails, currentPet) => {
  const navigate = useNavigate()
  
  useEffect(() => {
    /* if (!isSubmitting || !dietDetails) return */
    if (!isSubmitting || !dietDetails || !currentPet || !currentPet.id) return

    const saveDietDetails = async () => {
      const payload = { 
       
        mealType: dietDetails.currentMeal?.mealType,
    time: dietDetails.currentMeal.time,
    quantity: parseFloat(dietDetails.quantity),
    totalCalories: parseFloat(dietDetails.totalCalories),
    selectedBrand: dietDetails.selectedBrand,
    name: dietDetails.name
      }
      const method = 'POST'
     /*  const endpoint = 'http://localhost:3000/api/pet/dietdetails/' */
      const endpoint = `https://cscloud7-95.lnu.se/petsee/pet/${currentPet.id}/dietdetails`
  
      try {
        console.log("Sending payload:", JSON.stringify(payload))

        const response = await fetch(endpoint, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(payload)
        })
  
        if (!response.ok) throw new Error('Failed to save/update diet details')
  
        const result = await response.json()
        console.log('Operation successful:', result)
        
        
      } catch (error) {
        console.error('Error saving/updating diet details:', error)
      } finally {
        
        navigate('/dietdetails', { state: { refresh: true } })
      }
    }

    saveDietDetails()
  }, [isSubmitting, dietDetails, navigate, currentPet])
}

const DietDetails = () => {
  const navigate = useNavigate()
  const [dietDetails, dispatch] = useReducer(dietReducer, {
    quantity: '',
    totalCalories: 0,
    selectedBrand: '',
    nutrients: {},
    /* meals: [], */
    currentMeal: { mealType: '', time: '', quantity: '0' },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const currentPet = useSelector(state => state.pets.currentPet)
  

  useSaveDietDetails(isSubmitting, dietDetails)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    dispatch({ type: 'SET_FIELD', field: name, value: value })
    if (name === 'quantity' || name === 'selectedBrand') {
      calculateNutrients(value, name, dietDetails, dispatch)
    }
    console.log(`Updated ${name} to ${value}`)
  }
  

  const calculateNutrients = (value, name, dietDetails, dispatch) => {
    console.log('Calculating nutrients for:', name, value)
    const quantity = name === 'quantity' ? parseFloat(value) : parseFloat(dietDetails.quantity)
    const selectedBrand = name === 'selectedBrand' ? value : dietDetails.selectedBrand
    const brand = brandsData.brands.find(brand => brand.name === selectedBrand)
  
    if (brand && quantity) {
      const nutrients = {}
      Object.entries(brand.nutrients).forEach(([key, percent]) => {
        nutrients[key] = ((quantity * percent) / 100).toFixed(2)
      })
      const totalCalories = (brand.caloriesPerGram * quantity).toFixed(2)
      
      console.log('Calculated nutrients:', nutrients)
  
      dispatch({
        type: 'UPDATE_NUTRIENTS',
        nutrients,
        totalCalories
      })
    }
  }

  const calculateTotalCalories = (quantity, brandName) => {
    const brand = brandsData.brands.find(b => b.name === brandName)
    return brand ? (brand.caloriesPerGram * parseFloat(quantity)).toFixed(2) : 0
  }

  


 
  const handleSubmit = async () => {
    console.log("Sending payload:", JSON.stringify(payload))

    if (!currentPet) {
      alert("Please select a pet first.")
      return
    }

    if (isSubmitting) {
      console.log('Submission blocked, already submitting.')
      return
    }
    setIsSubmitting(true)

    const payload = {
      ...dietDetails,
      meals: dietDetails.meals.map(meal => ({
        ...meal,
        quantity: parseFloat(meal.quantity),
        totalCalories: parseFloat(meal.totalCalories),
        petId: currentPet.id
      }))
    }

    try {
      console.log("Sending payload:", JSON.stringify(payload))
      console.log("URL:", `https://cscloud7-95.lnu.se/petsee/pet/${currentPet.id}/dietdetails`)
console.log("Payload:", JSON.stringify(payload))

      const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${currentPet.id}/dietdetails`, {
      /* const response = await fetch('http://localhost:3000/api/pet/dietdetails/', { */
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) throw new Error('Failed to save/update diet details')

      const result = await response.json()
      console.log('Operation successful:', result)
     
    } catch (error) {
      console.error('Error saving/updating diet details:', error)
    } finally {
      setIsSubmitting(false)
    }
  }


  const addMealAndSave = async () => {

    

    if (!currentPet || !currentPet.id) {
      console.error("No current pet selected or pet ID is missing.")
      alert("Please select a pet first.")
      return
    
    }
  
    const { mealType, time, quantity } = dietDetails.currentMeal
    if (!mealType || !time || !quantity) {
      alert("Please fill in all fields for the meal.")
      return
    }
  
    setIsSubmitting(true)
    const totalCalories = calculateTotalCalories(quantity, dietDetails.selectedBrand)
    const newMeal = {
      mealType,
      time,
      quantity: parseFloat(quantity),
      totalCalories,
      nutrients: { ...dietDetails.nutrients }
    }
  
    /* const updatedMeals = [... newMeal] */
  
    const payload = {
      name: dietDetails.name,
      quantity: dietDetails.quantity,
      totalCalories: dietDetails.totalCalories, 
      mealType: dietDetails.currentMeal.mealType,
      time: dietDetails.currentMeal.time,
      selectedBrand: dietDetails.selectedBrand
      /* meals: updatedMeals */
    }
  
    try {
     /*  console.log("Sending payload:", JSON.stringify(payload)) */
      
      /* const response = await fetch('http://localhost:3000/api/pet/dietdetails/', { */
      const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${currentPet.id}/dietdetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload)
      })

      console.log("Sending payload:", JSON.stringify(payload))
  
      if (!response.ok) throw new Error('Failed to save/update diet details')
      const result = await response.json()
      console.log('Operation successful:', result)
      
     
      dispatch({ type: 'SET_DIET_DETAILS', details: {...result, /* meals: updatedMeals, */ currentMeal: { mealType: '', time: '', quantity: '0' }} })
  
      navigate('/dietdetails', { state: { refresh: true } })
    } catch (error) {
      console.error('Error saving/updating diet details:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  

  
    
  return (
    <div className="diet-details-container">
       <h1 className="custom-heading">Add Meal</h1>
      {/* <h1>Diet Details</h1> */}

      
      <form onSubmit={handleSubmit}>


      <div >
      <Form.Group>
      {/* <Form.Label>Brand:</Form.Label> */}
      <Form.Select 
      className="mealForm"
      name="selectedBrand" 
      value={dietDetails.selectedBrand} 
      onChange={handleInputChange}>

          <option value="">Select a Brand</option>
          {brandsData.brands.map((brand, index) => (
            <option key={index} value={brand.name}>{brand.name}</option>
          ))}
        </Form.Select>
        </Form.Group>
      </div>


      <div >
      <Form.Group>
      {/* <Form.Label>Quantity (grams):</Form.Label> */}
      
      <Form.Select 
      className="mealForm"
      type="number" 
      name="quantity" 
      value={dietDetails.quantity} 
      onChange={handleInputChange}
      >
        <option value="">Select Grams</option>
        <option value="5">5 grams</option>
        <option value="10">10 grams</option>
        <option value="15">15 grams</option>
        <option value="20">20 grams</option>
        <option value="25">25 grams</option>
        <option value="30">30 grams</option>
        <option value="35">35 grams</option>
        <option value="40">40 grams</option>
        <option value="45">45 grams</option>
        <option value="50">50 grams</option>
      </Form.Select>
        </Form.Group>
      </div>


      <div>
      <Form.Group>
        {/* <label>Meal Type:</label> */}
        <Form.Select
        className="mealForm"
        name="mealType" 
        value={dietDetails.currentMeal?.mealType}
        onChange={handleInputChange}>

          <option value="">Choose Meal</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          </Form.Select>
        </Form.Group>
      </div>


      <div className="center-select">
      <Form.Group>
      <Form.Label>Choose a Time</Form.Label>
        <input type="time" name="time" value={dietDetails.currentMeal?.time || ''} onChange={handleInputChange} />
        </Form.Group>
      </div>







      {/* </form> */}


      <div className="center-select">

<Card style={{ width: '40rem' }} className="addmeal-nutrients-card">
      <Card.Header>Nutrients</Card.Header>
      <ListGroup variant="flush">
        {Object.entries(dietDetails.nutrients).map(([key, value]) => (
          <ListGroup.Item key={key}>{key}: {value} grams</ListGroup.Item>
        ))}
        <ListGroup.Item><strong>Total Calories:</strong> {dietDetails.totalCalories} kcal</ListGroup.Item>
      </ListGroup>
    </Card>
   
   </div>
   

     
    <Button variant="primary" onClick={addMealAndSave} disabled={isSubmitting} className="save-button">
      Add Meal and Save
    </Button>
    

      </form>
    </div>
    
    
  )
  
}


 


export default DietDetails