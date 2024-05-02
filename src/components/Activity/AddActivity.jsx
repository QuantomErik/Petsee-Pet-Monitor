import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const ActivityDetails = () => {
    const [activityDetails, setActivityDetails] = useState({
        type: '',
        duration: '',
        intensity: '',
        /* date: '',
        notes: '' */
    })
    const navigate = useNavigate()

    /* useEffect(() => {
        const fetchActivityDetails = async () => {
          const token = localStorage.getItem('token')
          try {
    

    
            const response = await fetch('http://localhost:3000/api/pet/activitydetails', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            })
            if (response.ok) {
              const data = await response.json()
              setActivityDetails(data)
            } else {
              console.error('Failed to fetch activity details')
            }
          } catch (error) {
            console.error('Error fetching activity details:', error)
          }
        }
    
        fetchActivityDetails()
      }, []) */
    
      const handleChange = (event) => {
        const { name, value } = event.target
        setActivityDetails(prevDetails => ({
          ...prevDetails,
          [name]: value
        }))
      }
    
      const handleSaveActivityDetails = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/api/pet/activitydetails/', {
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
        /* setActivityDetails(result) */

        setActivityDetails(result.activity)

        console.log("Setting flash message")
        localStorage.setItem('flashMessage', 'Activity created successfully!')
        setTimeout(() => {
          console.log("Navigating to /activitydetails")
          navigate('/activitydetails')
        }, 100)

        /* setActivityDetails(result.activity)
        navigate('/activitydetails') */
      }
    
      /* const handleUpdateActivityDetails = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/api/pet/activitydetails/${activityDetails.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(activityDetails),
        })
    
        if (!response.ok) {
          throw new Error('Failed to update activity details')
        }
    
        const result = await response.json()
        console.log('Operation successful:', result)
        setActivityDetails(result)
        navigate('/home')
      } */

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
