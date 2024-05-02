import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ActivityDetails() {
    const [activities, setActivities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate() 

    useEffect(() => {

      /* toast.success("Component mounted and toast triggered."); */

        const fetchActivities = async () => {
          const token = localStorage.getItem('token')
            setIsLoading(true)
            try {
                const response = await fetch('http://localhost:3000/api/pet/activitydetails', {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                console.log('Fetched activities:', data.activities)
                setActivities(data.activities)
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
          toast.success(message);
          localStorage.removeItem('flashMessage')
        } else {
          console.log('No flash message found.')
        }

    }, [])

   

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
      <div>
       {/*  <ToastContainer /> */}
          <h1>Activity Details</h1>
          {activities.length > 0 ? (
              <div>
                  {activities.map((activity, index) => (
    <Card key={activity._id || index} style={{ width: '18rem', marginBottom: '1rem' }}>
        <Card.Body>
            <Card.Title>{activity.type}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Activity Details</Card.Subtitle>
            <Card.Text>
                Duration: {activity.duration} minutes
                <br/>
                Intensity: {activity.intensity}
            </Card.Text>
            
            {/* <Button variant="primary" onClick={() => navigate(`/activitydetails/edit/${activity._id}`)}>Edit</Button> */}
            <Button variant="primary" onClick={() => {
  if(activity._id) {
    console.log("Navigating with ID:", activity._id) // Ensure this logs a valid ID
    navigate(`/activitydetails/edit/${activity._id}`)
  } else {
    console.error("Invalid activity ID:", activity._id)
  }
}}>Edit</Button>


{/* <Button variant="primary" onClick={() => navigate(`/activitydetails/edit/${activity._id}`)}>Edit</Button>  */}

        </Card.Body>
    </Card>
                  ))}
              </div>
          ) : (
              <p>No activities found</p>
          )}
          <Button onClick={() => navigate('/activitydetails/addactivity')} className="mt-3">Create Activity</Button>
          {/* <button onClick={() => toast.success('Test Toast')}>Show Test Toast</button> */}

          

      </div>
  )
}

export default ActivityDetails
