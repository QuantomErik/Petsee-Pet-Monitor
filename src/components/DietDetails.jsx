/* import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const brandsData = {
  brands: [
    {
      name: "Acana",
      caloriesPerGram: 3405 / 1000,
      nutrients: {
        CrudeProtein: 31,
        FatContent: 17,
        CrudeAsh: 9,
        CrudeFibre: 6,
        Moisture: 12,
        Calcium: 1.5,
        Phosphorus: 1.1,
        Omega3FattyAcids: 1,
        Omega6FattyAcids: 1.2
      }
    }
    
  ]
}


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
    selectedBrand: ''
  })
  const [nutrients, setNutrients] = useState({});

  

  useEffect(() => {
    const fetchDietDetails = async () => {
      const token = localStorage.getItem('token')
      try {

       


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
    }));
    if (name === 'quantity' || name === 'selectedBrand') {
      calculateNutrients(value, name)
    }
  }

  const calculateNutrients = (value, name) => {
    const quantity = name === 'quantity' ? parseFloat(value) : parseFloat(dietDetails.quantity)
    const selectedBrand = name === 'selectedBrand' ? value : dietDetails.selectedBrand
    const brand = brandsData.brands.find(brand => brand.name === selectedBrand)
    if (brand && quantity) {
      const calculatedNutrients = {}
      Object.entries(brand.nutrients).forEach(([key, percent]) => {
        calculatedNutrients[key] = ((quantity * percent) / 100).toFixed(2)
      })
      const totalCalories = (brand.caloriesPerGram * quantity).toFixed(2)
      setNutrients({
        ...calculatedNutrients,
        TotalCalories: totalCalories
      })
    }
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
        <select name="selectedBrand" value={dietDetails.selectedBrand} onChange={handleChange}>
          <option value="">Select a Brand</option>
          {brandsData.brands.map((brand, index) => (
            <option key={index} value={brand.name}>{brand.name}</option>
          ))}
        </select>
      </div>
  
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

      {Object.entries(nutrients).map(([key, value]) => (
        <div key={key} className="nutrient-info">
          {key}: {value} grams
        </div>
      ))}

{Object.entries(nutrients).map(([key, value]) => (
      <div key={key} className="nutrient-info">
        {key}: {value} {key === 'TotalCalories' ? 'kcal' : 'grams'}
      </div>
    ))}

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
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const brandsData = {
  brands: [
    {
      name: "Acana",
      caloriesPerGram: 3405 / 1000, // kcal/g
      nutrients: {
        CrudeProtein: 31,
        FatContent: 17,
        CrudeAsh: 9,
        CrudeFibre: 6,
        Moisture: 12,
        Calcium: 1.5,
        Phosphorus: 1.1,
        Omega3FattyAcids: 1,
        Omega6FattyAcids: 1.2
      }
    },
    // Additional brands can be added with their nutritional info here
  ]
};

const DietDetails = () => {
  const navigate = useNavigate();
  const [dietDetails, setDietDetails] = useState({
    quantity: '',
    selectedBrand: '',
    nutrients: {},
    meals: [],
    currentMeal: { mealType: '', time: '' },
    name: ''
  })

  // Handle input changes for meal details and quantity
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDietDetails(prev => ({
      ...prev,
      [name]: value,
      currentMeal: {
        ...prev.currentMeal,
        [name]: value
      }
    }));
    if (name === 'quantity' || name === 'selectedBrand') {
      calculateNutrients(value, name);
    }
  }

  /* const addMeal = () => {
    setDietDetails(prev => ({
      ...prev,
      meals: [...prev.meals, prev.currentMeal],
      currentMeal: { mealType: '', time: '' } 
    }))
  } */

  /* const addMeal = () => {
    if (dietDetails.currentMeal.mealType && dietDetails.currentMeal.time) {
        const newMeal = {
            ...dietDetails.currentMeal,
            quantity: dietDetails.quantity,
            totalCalories: dietDetails.totalCalories,
            nutrients: dietDetails.nutrients
        };
        setDietDetails(prev => ({
            ...prev,
            meals: [...prev.meals, newMeal],
            currentMeal: { mealType: '', time: '' }
        }));
    } else {
        alert("Please fill in all fields for the meal.");
    }
}; */

const addMeal = () => {
  if (dietDetails.currentMeal.mealType && dietDetails.currentMeal.time) {
      const newMeal = {
          mealType: dietDetails.currentMeal.mealType,
          time: dietDetails.currentMeal.time,
          quantity: dietDetails.quantity,
          totalCalories: dietDetails.totalCalories,
          nutrients: { ...dietDetails.nutrients }
      };

      setDietDetails(prev => ({
          ...prev,
          meals: [...prev.meals, newMeal],
          // Clear currentMeal after adding
      }))
  } else {
      alert("Please fill in all fields for the meal.");
  }
};


const deleteMeal = (index) => {
    const updatedMeals = dietDetails.meals.filter((_, idx) => idx !== index);
    setDietDetails(prev => ({ ...prev, meals: updatedMeals }));
};

const editMeal = (index) => {
    // Set up to edit, possibly by setting currentMeal to the selected meal and removing it from the array
    const mealToEdit = dietDetails.meals[index];
    setDietDetails(prev => ({
        ...prev,
        currentMeal: mealToEdit,
        meals: [...prev.meals.slice(0, index), ...prev.meals.slice(index + 1)]
    }));
};






  // Calculate nutrients based on the selected brand and quantity
 /*  useEffect(() => {
    if (dietDetails.selectedBrand && dietDetails.quantity) {
      const brand = brandsData.brands.find(brand => brand.name === dietDetails.selectedBrand);
      if (brand) {
        const quantity = parseFloat(dietDetails.quantity);
        const nutrients = {};
        Object.entries(brand.nutrients).forEach(([key, value]) => {
          nutrients[key] = ((quantity * value) / 100).toFixed(2);
        });
        setDietDetails(prev => ({
          ...prev,
          nutrients,
          totalCalories: (brand.caloriesPerGram * quantity).toFixed(2)
        }));
      }
    }
  }, [dietDetails.selectedBrand, dietDetails.quantity]); */

  const calculateNutrients = (value, name) => {
    const quantity = name === 'quantity' ? parseFloat(value) : parseFloat(dietDetails.quantity);
    const selectedBrand = name === 'selectedBrand' ? value : dietDetails.selectedBrand;
    const brand = brandsData.brands.find(brand => brand.name === selectedBrand);
    if (brand && quantity) {
      const nutrients = {};
      Object.entries(brand.nutrients).forEach(([key, percent]) => {
        nutrients[key] = ((quantity * percent) / 100).toFixed(2);
      });
      const totalCalories = (brand.caloriesPerGram * quantity).toFixed(2);
      setDietDetails(prev => ({
        ...prev,
        nutrients,
        totalCalories
      }));
    }
  };

  // Save or update diet details
  const handleSaveOrUpdate = async () => {

    console.log("Sending to server:", JSON.stringify(dietDetails, null, 2));

    if (dietDetails.currentMeal.mealType && dietDetails.currentMeal.time) {
      addMeal()
  }

    const method = dietDetails.id ? 'PUT' : 'POST';
    const endpoint = dietDetails.id ? `http://localhost:3000/api/pet/dietdetails/${dietDetails.id}` : 'http://localhost:3000/api/pet/dietdetails'

    console.log("Sending to server:", dietDetails)


    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(dietDetails)
      });

      if (!response.ok) {
        throw new Error('Failed to save/update diet details');
      }

      const result = await response.json();
      console.log('Operation successful:', result);
     /*  setDietDetails(result) */
      navigate('/home')// Redirect to home page after save/update
    } catch (error) {
      console.error('Error saving/updating diet details:', error)
    }
  };

  return (
    <div className="diet-details-container">
      <h1>Diet Details</h1>
      <div>
        <label>Brand:</label>
        <select name="selectedBrand" value={dietDetails.selectedBrand} onChange={handleInputChange}>
          <option value="">Select a Brand</option>
          {brandsData.brands.map((brand, index) => (
            <option key={index} value={brand.name}>{brand.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Quantity (grams):</label>
        <input type="number" name="quantity" value={dietDetails.quantity} onChange={handleInputChange} />
      </div>

      <div>
        <label>Meal Type:</label>
        <select name="mealType" value={dietDetails.currentMeal.mealType} onChange={handleInputChange}>
          <option value="">Choose a Meal Type</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
      </div>

      <div>
        <label>Time:</label>
        <input type="time" name="time" value={dietDetails.currentMeal.time} onChange={handleInputChange} />
      </div>

      {/* <button onClick={addMeal}>Add Meal</button>
      <button onClick={handleSaveOrUpdate}>Save/Update Diet Details</button> */}
      <div>
        {dietDetails.nutrients && (
          <>
            <h2>Nutrients</h2>
            {Object.entries(dietDetails.nutrients).map(([key, value]) => (
              <div key={key}>{key}: {value} grams</div>
            ))}
            <p>Total Calories: {dietDetails.totalCalories} kcal</p>
          </>
        )}
      </div>

      <div>
        <label>name:</label>
        <input type="string" name="name" value={dietDetails.name} onChange={handleInputChange} />
      </div>

      <div className="addMealButton"><button onClick={addMeal}>Add Meal</button></div>
      <button onClick={handleSaveOrUpdate}>Save/Update Diet Details</button>


    </div>
  )
}

export default DietDetails;
