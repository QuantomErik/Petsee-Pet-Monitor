

import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivitiess } from './activitiesSlice'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

/**
 * ActivityDetails component that displays the details of activities for a specific pet.
 * Allows the user to view, edit, and create activities for the selected date.
 *
 * @component
 * @example
 * return (
 *   <ActivityDetails />
 * )
 */

function ActivityDetails() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const navigate = useNavigate()
    const { activities, isLoading, error } = useSelector(state => state.activities)
    const dispatch = useDispatch()
    const currentPet = useSelector(state => state.pets.currentPet)

     /**
     * Fetch activities for the selected pet and date whenever the current pet or selected date changes.
     */
    useEffect(() => {
        if (currentPet && currentPet.id) {
            console.log(`Fetching activities for date: ${selectedDate.toISOString().split('T')[0]}`)
            dispatch(fetchActivitiess({ petId: currentPet.id, date: selectedDate.toISOString().split('T')[0] }))
        }
    }, [dispatch, currentPet, selectedDate])

    /**
     * Display a success toast message if a flash message is found in local storage.
     */
    useEffect(() => {
        const message = localStorage.getItem('flashMessage')
        if (message) {
            toast.success(message)
            localStorage.removeItem('flashMessage')
        }
    }, [])

    return (
        <div>
            <h1 className="custom-heading">Activity Details</h1>
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
            ) : activities.length > 0 ? (
                <div>
                    {activities.map((activity, index) => (
                        <Card key={activity._id || index}>
                <Card.Header className="card-headerStyle">
                        {activity.type}
              </Card.Header>

                            <Card.Body>
                                <Card.Text>
                                    Duration: {activity.duration} minutes
                                    <br />
                                    Intensity: {activity.intensity}
                                </Card.Text>
                                <Button variant="primary" onClick={() => {
                                    if (activity._id) {
                                        navigate(`/activitydetails/edit/${activity._id}`)
                                    } else {
                                        console.error("Invalid activity ID:", activity._id)
                                    }
                                }}>Edit</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            ) : (
                <p>No activities found</p>
            )}
            <Button onClick={() => navigate('/activitydetails/addactivity')} className="mt-3">Create Activity</Button>
        </div>
    )
}

export default ActivityDetails

