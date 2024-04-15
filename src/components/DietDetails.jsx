import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DietDetails = () => {
  const navigate = useNavigate();
  const [dietDetails, setDietDetails] = useState({
    id: '',
    foodType: '',
    feedingTime: '',
    quantity: '',
    dietType: '',
    caloriesPerDay: 0,
    meals: '',
  })

  useEffect(() => {
    const fetchDietDetails = async () => {
      const token = localStorage.getItem('token')
      try {

       /*  fetch('http://localhost:3000/api/pet/dietdetails', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,  // assuming token is correctly handled
          },
          body: JSON.stringify({
              foodType: 'Dog food',
              feedingTime: '8',
              quantity: '5',
              dietType: 'Food',
              caloriesPerDay: '5'
          })
      }) */


        const response = await fetch('http://localhost:3000/api/pet/dietdetails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json();
          setDietDetails(data)
        } else {
          console.error('Failed to fetch diet details');
        }
      } catch (error) {
        console.error('Error fetching diet details:', error);
      }
    }

    fetchDietDetails();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDietDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }))
  }

  const handleSaveDietDetails = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/pet/dietdetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dietDetails),
    });

    if (!response.ok) {
      throw new Error('Failed to save diet details');
    }

    const result = await response.json();
    console.log('Operation successful:', result);
    setDietDetails(result);
    navigate('/home');
  }

  const handleUpdateDietDetails = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/api/pet/dietdetails/${dietDetails.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(dietDetails),
    });

    if (!response.ok) {
      throw new Error('Failed to update diet details');
    }

    const result = await response.json()
    console.log('Operation successful:', result)
    setDietDetails(result)
    navigate('/home')
  }

  

  return (
    <div className="diet-details-container">
      <h1>Diet Details</h1>
  
      <div className="input-container">
        <input
          type="text"
          name="foodType"
          value={dietDetails.foodType}
          onChange={handleChange}
          placeholder="Food Type"
        />
      </div>

      <div className="input-container">
  <input
    type="text"
    name="dietType"
    value={dietDetails.dietType}
    onChange={handleChange}
    placeholder="Diet Type"
  />
</div>

      <div className="input-container">
        <input
          type="text"
          name="feedingTime"
          value={dietDetails.feedingTime}
          onChange={handleChange}
          placeholder="Feeding Time"
        />
      </div>

      <div className="input-container">
        <input
          type="number"
          name="quantity"
          value={dietDetails.quantity}
          onChange={handleChange}
          placeholder="Quantity (grams)"
        />
      </div>

      <div className="input-container">
  <input
    type="number"
    name="caloriesPerDay"
    value={dietDetails.caloriesPerDay}
    onChange={handleChange}
    placeholder="Calories Per Day"
  />
</div>

<div className="input-container">
  <input
    type="number"
    name="meals"
    value={dietDetails.meals}
    onChange={handleChange}
    placeholder="Meals"
  />
</div>

      {dietDetails.id ?
        <button onClick={handleUpdateDietDetails} className="update-button">Update Diet Details</button> :
        <button onClick={handleSaveDietDetails} className="save-button">Save Diet Details</button>
      }
    </div>
  );
};

export default DietDetails;
