import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ActivityDetails = () => {
    const [activityDetails, setActivityDetails] = useState({
        type: '',
        duration: '',
        intensity: '',
        /* date: '',
        notes: '' */
    });
    const navigate = useNavigate();

    useEffect(() => {
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
              const data = await response.json();
              setActivityDetails(data)
            } else {
              console.error('Failed to fetch activity details');
            }
          } catch (error) {
            console.error('Error fetching activity details:', error);
          }
        }
    
        fetchActivityDetails();
      }, [])
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setActivityDetails(prevDetails => ({
          ...prevDetails,
          [name]: value
        }))
      }
    
      const handleSaveActivityDetails = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/pet/activitydetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(activityDetails),
        });
    
        if (!response.ok) {
          throw new Error('Failed to save activity details');
        }
    
        const result = await response.json();
        console.log('Operation successful:', result);
        setActivityDetails(result);
        navigate('/activitydetails');
      }
    
      const handleUpdateActivityDetails = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/api/pet/activitydetails/${activityDetails.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(activityDetails),
        });
    
        if (!response.ok) {
          throw new Error('Failed to update activity details');
        }
    
        const result = await response.json()
        console.log('Operation successful:', result)
        setActivityDetails(result)
        navigate('/home')
      }

      return (
        <div className="activity-details-container">
          <h1>Activity Details</h1>
      
          <div className="input-container">
            <input
              type="text"
              name="type"
              value={activityDetails.type}
              onChange={handleChange}
              placeholder="Type"
            />
          </div>
    
          <div className="input-container">
      <input
        type="text"
        name="duration"
        value={activityDetails.duration}
        onChange={handleChange}
        placeholder="Duration"
      />
    </div>
    
          <div className="input-container">
            <input
              type="text"
              name="intensity"
              value={activityDetails.intensity}
              onChange={handleChange}
              placeholder="Intensity"
            />
          </div>
    
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
    
    
          {activityDetails.id ?
            <button onClick={handleUpdateActivityDetails} className="update-button">Update Activity Details</button> :
            <button onClick={handleSaveActivityDetails} className="save-button">Save Activity Details</button>
          }
          {/* <Button onClick={() => navigate('/dietdetails/addmeal')} className="mt-3">Create Meal</Button> */}
        </div>
        
      );
      
    };

export default ActivityDetails
