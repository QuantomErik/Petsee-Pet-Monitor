import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css'


/**
 * EditActivity component allows the user to edit and update an existing activity.
 *
 * @component
 * @example
 * return (
 *   <EditActivity />
 * )
 */
function EditActivity() {
    const { id } = useParams()
    console.log("ID from useParams:", id)
    
    const navigate = useNavigate()
    const [activity, setActivity] = useState({
        type: '',
        duration: '',
        intensity: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')


    /**
     * Fetch the activity details when the component mounts and when the `id` changes.
     */
    useEffect(() => {
        const fetchActivity = async () => {
            setIsLoading(true)
            try {
                /* const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/activitydetails/${id}`, { */
                const response = await fetch(`https://erikyang.se/petsee/api/activitydetails/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json()
                console.log(data)
                if (response.ok) {
                    setActivity({
                        type: data.type,
                        duration: data.duration.toString(),
                        intensity: data.intensity
                    })
                } else {
                    throw new Error(data.message || 'Failed to fetch activity')
                }
            } catch (error) {
                setError(error.message)
            }
            setIsLoading(false)
        }

        fetchActivity()
    }, [id])


     /**
     * Handle changes in the form fields and update the activity state.
     *
     * @param {Object} e - The event triggered by the form field change.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setActivity(prev => ({ ...prev, [name]: value }))
    }


    /**
     * Handle form submission to update the activity details.
     *
     * @param {Object} e - The event triggered by the form submission.
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            /* const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/activitydetails/edit/${id}`, { */
            const response = await fetch(`https://erikyang.se/petsee/api/activitydetails/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(activity)
            })
            const data = await response.json()
            if (response.ok) {

                
                console.log("Setting flash message")
  localStorage.setItem('flashMessage', 'Activity updated successfully!')
  setTimeout(() => {
    console.log("Navigating to /activitydetails")
    navigate('/activitydetails')
  }, 100)


            } else {
                throw new Error(data.message || 'Failed to update activity')
            }
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }


     /**
     * Handle deleting the activity.
     */
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this activity?")) return
        setIsLoading(true)
        try {
            /* const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/activitydetails/edit/${id}`, { */
            const response = await fetch(`https://erikyang.se/petsee/api/activitydetails/edit/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to delete the activity')
            }
            console.log("Setting flash message")
  localStorage.setItem('flashMessage', 'Activity deleted successfully!')
  setTimeout(() => {
    console.log("Navigating to /activitydetails")
    navigate('/activitydetails')
  }, 100)
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!activity) return <p>No activity found</p>



    return (
        <div>
            <h1 className="custom-heading">Edit Activity</h1>
        <Form onSubmit={handleSubmit}>
<div >
            <Form.Group>
                <Form.Label>Activity Type</Form.Label>
                <Form.Select
                className="activityForm"
                    name="type"
                    value={activity.type}
                    onChange={handleInputChange}
                >
                    <option value="">Select Type</option>
                    <option value="Agility">Agility</option>
                    <option value="Running">Running</option>
                    <option value="Walking">Walking</option>
                </Form.Select>
            </Form.Group>
            </div>


            <div >
            <Form.Group>
                <Form.Label>Duration (min)</Form.Label>
                <Form.Select
                className="activityForm"
                    name="duration"
                    value={activity.duration}
                    onChange={handleInputChange}
                >
                    <option value="">Select Duration</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                </Form.Select>
            </Form.Group>
            </div>


            <div >
            <Form.Group>
                <Form.Label>Intensity</Form.Label>
                <Form.Select
                className="activityForm"
                    name="intensity"
                    value={activity.intensity}
                    onChange={handleInputChange}
                >
                    <option value="">Select Intensity</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </Form.Select>
            </Form.Group>
            </div>
            <Button variant="primary" type="submit">Update Activity</Button>

            <Button variant="danger" onClick={handleDelete}>Delete Activity</Button>
        </Form>
        </div>
    )
}

export default EditActivity
