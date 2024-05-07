import React, { useReducer, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// Define initial state and reducer for the activity details
const initialState = {
    type: '',
    duration: '',
    intensity: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value }
        case 'RESET':
            return initialState
        case 'SET_ACTIVITY':
            return { ...action.payload }
        default:
            return state
    }
}

const ActivityDetails = () => {
    const [activityDetails, dispatch] = useReducer(reducer, initialState)
    const currentPet = useSelector(state => state.pets.currentPet)
    const navigate = useNavigate()

    // Effect to reset form when currentPet changes
    useEffect(() => {
        if (currentPet) {
            dispatch({ type: 'RESET' })
        }
    }, [currentPet])

    const handleChange = (event) => {
        const { name, value } = event.target
        dispatch({ type: 'SET_FIELD', field: name, value })
    }

    const handleSaveActivityDetails = async () => {
        const token = localStorage.getItem('token')
        if (!currentPet) {
            alert("Please select a pet first.")
            return
        }

        try {
            const response = await fetch(`http://localhost:3000/api/pet/${currentPet.id}/activitydetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(activityDetails),
            })

            if (!response.ok) {
                throw new Error('Failed to save activity details')
            }

            const result = await response.json()
            console.log('Operation successful:', result)

            dispatch({ type: 'SET_ACTIVITY', payload: result.activity })
            localStorage.setItem('flashMessage', 'Activity created successfully!')
            navigate('/activitydetails')
        } catch (error) {
            console.error('Error saving/updating activity details:', error)
            alert(error.message)
        }
    }

    return (
        
      <div className="activity-details-container">
        <h1>Activity Details</h1>

        

        <div className="center-select">
<Form.Group>
  <Form.Label>Activity Type</Form.Label>
  <Form.Select
    className="activityForm"
    name="type"
    value={activityDetails.type}
    onChange={handleChange}
    aria-label="Default select example"
  >
    <option value="">Select Type</option>
    <option value="Agility">Agility</option>
    <option value="Running">Running</option>
    <option value="Walking">Walking</option>
  </Form.Select>
</Form.Group>
</div>


<div className="center-select">
<Form.Group>
  <Form.Label>Activity Duration</Form.Label>
  <Form.Select
    className="activityForm"
    name="duration"
    value={activityDetails.duration}
    onChange={handleChange}
    aria-label="Select duration"
  >
    <option value="">Select Duration</option>
    <option value="15">15 min</option>
    <option value="30">30 min</option>
    <option value="60">60 min</option>
  </Form.Select>
</Form.Group>
</div>



        {/* <div className="center-select">
        <Form.Select aria-label="Default select example" className="activityForm">
    <option>Activity Type</option>
    <option value="1">Agility</option>
    <option value="2">Running</option>
    <option value="3">Walking</option>
  </Form.Select>
  </div> */}
    
       {/*  <div className="input-container">
          <input
            type="text"
            name="type"
            value={activityDetails.type}
            onChange={handleChange}
            placeholder="Type"
          />
        </div> */}
  
       {/*  <div className="input-container">
    <input
      type="text"
      name="duration"
      value={activityDetails.duration}
      onChange={handleChange}
      placeholder="Duration"
    />
  </div> */}

<div className="center-select">
<Form.Group>
  <Form.Label>Activity Intensity</Form.Label>
  <Form.Select
    className="activityForm"
    name="intensity"
    value={activityDetails.intensity}
    onChange={handleChange}
    aria-label="Default select example"
  >
    <option value="">Select Intensity</option>
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Hard">Hard</option>
  </Form.Select>
</Form.Group>
</div>
  
       {/*  <div className="input-container">
          <input
            type="text"
            name="intensity"
            value={activityDetails.intensity}
            onChange={handleChange}
            placeholder="Intensity"
          />
        </div> */}
  
       {/*  <div className="input-container">
          <input
            type="number"
            name="date"
            value={activityDetails.date}
            onChange={handleChange}
            placeholder="Date)"
          />
        </div> */}
  
        {/* <div className="input-container">
    <input
      type="number"
      name="notes"
      value={activityDetails.notes}
      onChange={handleChange}
      placeholder="Notes"
    />
  </div> */}
  
  
  <Button variant="primary" onClick={handleSaveActivityDetails} className="save-button">
Save Activity Details
</Button>

          {/* <button onClick={handleSaveActivityDetails} className="save-button">Save Activity Details</button> */}
        
      </div>
      
    )
    
  }

export default ActivityDetails

