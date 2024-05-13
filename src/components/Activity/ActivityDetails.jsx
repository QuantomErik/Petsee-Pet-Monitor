import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActivitiess } from './activitiesSlice'

function ActivityDetails() {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate() 

    const { activities } = useSelector(state => state.activities)
    

    const dispatch = useDispatch()
    
    const currentPet = useSelector(state => state.pets.currentPet)

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
                /* const response = await fetch('http://localhost:3000/api/pet/activitydetails', { */
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
                /* setActivities(data.activities) */
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

   

  /*   if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div> */

    return (
      <div>
     
          <h1>Activity Details</h1>
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
