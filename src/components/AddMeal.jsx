import React, { useReducer, useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    },
  ]
};

const dietReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        currentMeal: {
          ...state.currentMeal,
          [action.field]: action.value,
        }
      };
    case 'ADD_MEAL':
      return {
        ...state,
        meals: [...state.meals, action.meal],
        currentMeal: { mealType: '', time: '', quantity: '0' }
      };
    case 'UPDATE_NUTRIENTS':
      return {
        ...state,
        nutrients: action.nutrients,
        totalCalories: action.totalCalories
      };
    default:
      return state;
  }
};


const useSaveDietDetails = (isSubmitting, dietDetails) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isSubmitting || !dietDetails) return;

    const saveDietDetails = async () => {
      const payload = { 
        /* meals  */
        mealType: dietDetails.currentMeal.mealType,
    time: dietDetails.currentMeal.time,
    quantity: parseFloat(dietDetails.quantity),
    totalCalories: parseFloat(dietDetails.totalCalories),
    name: dietDetails.name
      }
      const method = 'POST'; // Simplified for example
      const endpoint = 'http://localhost:3000/api/pet/dietdetails/';
  
      try {
        console.log("Sending payload:", JSON.stringify(payload));

        const response = await fetch(endpoint, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(payload)
        });
  
        if (!response.ok) throw new Error('Failed to save/update diet details');
  
        const result = await response.json();
        console.log('Operation successful:', result);
        // Dispatch to state reducer if needed or handle the result
        
      } catch (error) {
        console.error('Error saving/updating diet details:', error);
      } finally {
        // Reset submission state or handle navigation
        navigate('/dietdetails', { state: { refresh: true } });
      }
    };

    saveDietDetails();
  }, [isSubmitting, dietDetails, navigate]);
};

const DietDetails = () => {
  const navigate = useNavigate();
  const [dietDetails, dispatch] = useReducer(dietReducer, {
    name: '', 
    quantity: '',
    totalCalories: 0,
    selectedBrand: '',
    nutrients: {},
    meals: [],
    currentMeal: { mealType: '', time: '', quantity: '0' },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useSaveDietDetails(isSubmitting, dietDetails);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: 'SET_FIELD', field: name, value: value });
    if (name === 'quantity' || name === 'selectedBrand') {
      calculateNutrients(value, name, dietDetails, dispatch);
    }
  };
  

  const calculateNutrients = (value, name, dietDetails, dispatch) => {
    console.log('Calculating nutrients for:', name, value);
    const quantity = name === 'quantity' ? parseFloat(value) : parseFloat(dietDetails.quantity);
    const selectedBrand = name === 'selectedBrand' ? value : dietDetails.selectedBrand;
    const brand = brandsData.brands.find(brand => brand.name === selectedBrand);
  
    if (brand && quantity) {
      const nutrients = {};
      Object.entries(brand.nutrients).forEach(([key, percent]) => {
        nutrients[key] = ((quantity * percent) / 100).toFixed(2);
      });
      const totalCalories = (brand.caloriesPerGram * quantity).toFixed(2);
      
      console.log('Calculated nutrients:', nutrients);
  
      dispatch({
        type: 'UPDATE_NUTRIENTS',
        nutrients,
        totalCalories
      });
    }
  };

  const calculateTotalCalories = (quantity, brandName) => {
    const brand = brandsData.brands.find(b => b.name === brandName);
    return brand ? (brand.caloriesPerGram * parseFloat(quantity)).toFixed(2) : 0;
  };

  

  const addMeal = () => {
    if (isSubmitting) {
      console.log('Submission blocked, already submitting.');
      return;
    }
    setIsSubmitting(true);
    const { mealType, time, quantity } = dietDetails.currentMeal;
    if (mealType && time && quantity) {
      const totalCalories = calculateTotalCalories(quantity, dietDetails.selectedBrand);
      const newMeal = { mealType, time, quantity: parseFloat(quantity), totalCalories, nutrients: { ...dietDetails.nutrients } };
      dispatch({ type: 'ADD_MEAL', meal: newMeal });
    } else {
      alert("Please fill in all fields for the meal.");
      setIsSubmitting(false);
    }
  };

  // Function to handle when the form is submitted
  const handleSubmit = async () => {
    if (isSubmitting) {
      console.log('Submission blocked, already submitting.');
      return;
    }
    setIsSubmitting(true);

    const payload = {
      ...dietDetails,
      meals: dietDetails.meals.map(meal => ({
        ...meal,
        quantity: parseFloat(meal.quantity),
        totalCalories: parseFloat(meal.totalCalories)
      }))
    };

    try {
      console.log("Sending payload:", JSON.stringify(payload));

      const response = await fetch('http://localhost:3000/api/pet/dietdetails/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save/update diet details');

      const result = await response.json();
      console.log('Operation successful:', result);
      // Navigate or update UI as needed
    } catch (error) {
      console.error('Error saving/updating diet details:', error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const addMealAndSave = async () => {
    if (isSubmitting) {
      console.log('Submission blocked, already submitting.');
      return;
    }
  
    const { mealType, time, quantity } = dietDetails.currentMeal;
    if (!mealType || !time || !quantity) {
      alert("Please fill in all fields for the meal.");
      return;
    }
  
    setIsSubmitting(true);
    const totalCalories = calculateTotalCalories(quantity, dietDetails.selectedBrand);
    const newMeal = {
      mealType,
      time,
      quantity: parseFloat(quantity),
      totalCalories,
      nutrients: { ...dietDetails.nutrients }
    };
  
    const updatedMeals = [...dietDetails.meals, newMeal];
  
    const payload = {
      name: dietDetails.name,
      quantity: dietDetails.quantity,
      totalCalories: dietDetails.totalCalories, // This should be calculated based on all meals if not done yet
      meals: updatedMeals
    };
  
    try {
      console.log("Sending payload:", JSON.stringify(payload));
      const response = await fetch('http://localhost:3000/api/pet/dietdetails/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) throw new Error('Failed to save/update diet details');
      const result = await response.json();
      console.log('Operation successful:', result);
      
      // Update the state with the result and reset current meal
      dispatch({ type: 'SET_DIET_DETAILS', details: {...result, meals: updatedMeals, currentMeal: { mealType: '', time: '', quantity: '0' }} });
  
      navigate('/dietdetails', { state: { refresh: true } });
    } catch (error) {
      console.error('Error saving/updating diet details:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  
  return (
    <div className="diet-details-container">
      <h1>Diet Details</h1>
      <form onSubmit={handleSubmit}>
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
        <select name="mealType" value={dietDetails.currentMeal?.mealType} onChange={handleInputChange}>
          <option value="">Choose a Meal Type</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
      </div>
      <div>
        <label>Time:</label>
        <input type="time" name="time" value={dietDetails.currentMeal?.time || ''} onChange={handleInputChange} />
      </div>
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
        <label>Name:</label>
        <input type="text" name="name" value={dietDetails.name} onChange={handleInputChange} />
      </div>
      {/* <button onClick={addMeal} disabled={isSubmitting} className="save-button">Add & Save Meal</button> */}
     {/*  <button type="submit" disabled={isSubmitting}>Save Diet Details</button> */}
     <button onClick={addMealAndSave} disabled={isSubmitting}>Add Meal and Save</button>

      </form>
    </div>
  );
};




 


export default DietDetails;