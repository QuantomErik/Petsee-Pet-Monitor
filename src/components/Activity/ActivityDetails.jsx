

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


function ActivityDetails() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const navigate = useNavigate()
    const { activities, isLoading, error } = useSelector(state => state.activities)
    const dispatch = useDispatch()
    const currentPet = useSelector(state => state.pets.currentPet)

    useEffect(() => {
        if (currentPet && currentPet.id) {
            console.log(`Fetching activities for date: ${selectedDate.toISOString().split('T')[0]}`)
            dispatch(fetchActivitiess({ petId: currentPet.id, date: selectedDate.toISOString().split('T')[0] }))
        }
    }, [dispatch, currentPet, selectedDate])

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

