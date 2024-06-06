import { useReducer, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * Initial state for the activity details form.
 */
const initialState = {
    type: '',
    duration: '',
    intensity: '',
}


/**
 * Reducer function to manage the state of the activity details form.
 *
 * @param {Object} state - The current state of the form.
 * @param {Object} action - The action to be performed on the state.
 * @returns {Object} The new state of the form.
 */
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


/**
 * ActivityDetails component allows the user to add and save activity details for a pet.
 *
 * @component
 * @example
 * return (
 *   <ActivityDetails />
 * )
 */
export const ActivityDetails = () => {
    const [activityDetails, dispatch] = useReducer(reducer, initialState)
    const currentPet = useSelector(state => state.pets.currentPet)
    const navigate = useNavigate()

    /**
     * Effect to reset the form when the current pet changes.
     */
    useEffect(() => {
        if (currentPet) {
            dispatch({ type: 'RESET' })
        }
    }, [currentPet])


    /**
     * Handle changes in the form fields and update the state.
     *
     * @param {Object} event - The event triggered by the form field change.
     */
    const handleChange = (event) => {
        const { name, value } = event.target
        dispatch({ type: 'SET_FIELD', field: name, value })
    }


     /**
     * Handle saving the activity details by making an API call.
     * Validates the form fields and shows error messages if necessary.
     */
    const handleSaveActivityDetails = async () => {
        const token = localStorage.getItem('token')
        if (!currentPet) {
            alert("Please select a pet first.")
            return
        }

         // Validation check
         const requiredFields = ['type', 'duration', 'intensity']
         const missingFields = requiredFields.filter(key => !activityDetails[key].trim())
 
         if (missingFields.length > 0) {
             toast.error('Please fill in all the fields.')
             return
         }

        try {
            /* const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${currentPet.id}/activitydetails`, { */
            const response = await fetch(`https://cscloud7-95.lnu.se/petsee/api/${currentPet.id}/activitydetails`, {
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
        <h1 className="custom-heading">Add Activity</h1>

        <div>
          
<Form.Group>
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


<div>
<Form.Group>
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



<div>
<Form.Group>
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
  
  
  <Button variant="primary" onClick={handleSaveActivityDetails} className="save-button">
Save Activity Details
</Button>
      </div>
      
    )
    
  }

export default ActivityDetails

