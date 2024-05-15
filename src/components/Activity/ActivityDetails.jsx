/* import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivitiess } from './activitiesSlice.js'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function ActivityDetails() {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate() 
    const { activities } = useSelector(state => state.activities)
    const dispatch = useDispatch()
    const currentPet = useSelector(state => state.pets.currentPet)
    
    const [selectedDate, setSelectedDate] = useState(new Date())

    useEffect(() => {
      console.log("Current pet ID:", currentPet?.id)
      if (currentPet && currentPet.id) {
        console.log("Current pet ID:", currentPet.id)
        
        dispatch(fetchActivitiess(currentPet.id))
            
    }

    

        const fetchActivities = async () => {
          const token = localStorage.getItem('token')
            setIsLoading(true)
            try {
                
                const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${currentPet.id}/activitydetails`, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                console.log('Fetched activities:', data.activities)
                
            } catch (error) {
                setError(error.message)
            }
            setIsLoading(false)
        }

        fetchActivities()

        console.log("Component mounted, checking for flash message.")
        const message = localStorage.getItem('flashMessage')
        if (message) {
          console.log('Flash message found:', message)
          toast.success(message)
          localStorage.removeItem('flashMessage')
        } else {
          console.log('No flash message found.')
        }

    }, [dispatch, currentPet])

   

  

    return (
      <div>
     
          <h1>Activity Details</h1>

          <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />

          {activities.length > 0 ? (
              <div>
                
                  {activities.map((activity, index) => (
    <Card key={activity._id || index} >
        <Card.Body>
            <Card.Title>{activity.type}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Activity Details</Card.Subtitle>
            <Card.Text>
                Duration: {activity.duration} minutes
                <br/>
                Intensity: {activity.intensity}
            </Card.Text>
            
            
            <Button variant="primary" onClick={() => {
  if(activity._id) {
    console.log("Navigating with ID:", activity._id)
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
 */

import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivitiess } from './activitiesSlice'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'

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
                {/* <FaCalendarAlt className="date-picker-icon" /> */}
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

