/* import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, ListGroup, Card } from 'react-bootstrap';
import { toast } from 'react-toastify'


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
  }

  function EditMeal() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState({
        selectedBrand: '',
        quantity: '',
        mealType: '',
        time: '',
        totalCalories: '',
        nutrients: {}
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const calculateNutrients = (value, name, meal) => {
        const quantity = name === 'quantity' ? parseFloat(value) : parseFloat(meal.quantity);
        const selectedBrand = name === 'selectedBrand' ? value : meal.selectedBrand;
        const brand = brandsData.brands.find(brand => brand.name === selectedBrand);
    
        if (brand && quantity) {
            const nutrients = {};
            Object.entries(brand.nutrients).forEach(([key, percent]) => {
                nutrients[key] = ((quantity * percent) / 100).toFixed(2); // Ensure calculation is correct
            });
            const totalCalories = (brand.caloriesPerGram * quantity).toFixed(2);
    
            return { nutrients, totalCalories };
        }
    
        return { nutrients: {}, totalCalories: '0' }; // Return default if no brand or quantity
    };

 /*  const calculateNutrients = (value, name, meal) => {
    const quantity = name === 'quantity' ? parseFloat(value) : parseFloat(meal.quantity);
    const selectedBrand = name === 'selectedBrand' ? value : meal.selectedBrand;
    const brand = brandsData.brands.find(brand => brand.name === selectedBrand);

    if (brand && quantity) {
        const nutrients = {};
        Object.entries(brand.nutrients).forEach(([key, percent]) => {
            nutrients[key] = ((quantity * percent) / 100).toFixed(2);
        });
        const totalCalories = (brand.caloriesPerGram * quantity).toFixed(2);

        setMeal(prev => ({
            ...prev,
            nutrients,
            totalCalories
        }));
    }
} */

  const calculateTotalCalories = (quantity, brandName) => {
    const brand = brandsData.brands.find(b => b.name === brandName)
    return brand ? (brand.caloriesPerGram * parseFloat(quantity)).toFixed(2) : 0
  }

  /* function EditMeal() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [meal, setMeal] = useState({
        selectedBrand: '',
        quantity: '',
        mealType: '',
        time: '',
        totalCalories: '',
        nutrients: {}
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(''); */

    useEffect(() => {
        const fetchMeal = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/pet/dietdetails/${id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const data = await response.json();
                if (response.ok) {
                    console.log(data)
                    const { nutrients, totalCalories } = calculateNutrients(data.quantity, 'quantity', data)
                    setMeal({
                        selectedBrand: data.selectedBrand || '',
                        quantity: data.quantity,
                        mealType: data.mealType,
                        time: data.time,
                        totalCalories/* : data.totalCalories.toString() */,
                        nutrients/* : data.nutrients || {} */
                    });
                } else {
                    throw new Error(data.message || 'Failed to fetch meal');
                }
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };
    
        fetchMeal();
    }, [id])
    


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'quantity' || name === 'selectedBrand') {
            const { nutrients, totalCalories } = calculateNutrients(value, name, { ...meal, [name]: value });
            setMeal(prev => ({
                ...prev,
                [name]: value,
                nutrients,
                totalCalories
            }));
        } else {
            setMeal(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    
    /* const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMeal(prev => ({ ...prev, [name]: value }));
        if (name === 'quantity' || name === 'selectedBrand') {
            calculateNutrients(value, name, meal);
        }
    } */

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/pet/dietdetails/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(meal)
            });
            const data = await response.json();
            if (response.ok) {

                
                console.log("Setting flash message");
  localStorage.setItem('flashMessage', 'Meal updated successfully!');
  setTimeout(() => {
    console.log("Navigating to /dietdetails");
    navigate('/dietdetails');
  }, 100);
               
                /* navigate('/activitydetails') */
               /* setTimeout(() => navigate('/activitydetails'), 2000) */
            } else {
                throw new Error(data.message || 'Failed to update meal')
            }
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false);
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this meal?")) return;
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/pet/dietdetails/edit/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete the meal');
            }
            console.log("Setting flash message");
  localStorage.setItem('flashMessage', 'Meal deleted successfully!');
  setTimeout(() => {
    console.log("Navigating to /dietdetails");
    navigate('/dietdetails');
  }, 100);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!meal) return <p>No meal found</p>;



  



    return (
        <div>
           {/*  <ToastContainer /> */}
        <Form onSubmit={handleSubmit}>

<div className="center-select">
            <Form.Group>
                <Form.Label>Selected Brand</Form.Label>
                <Form.Select
                className="mealForm"
                    name="selectedBrand"
                    value={meal.selectedBrand}
                    onChange={handleInputChange}
                >
                    <option value="">Select a Brand</option>
          {brandsData.brands.map((brand, index) => (
            <option key={index} value={brand.name}>{brand.name}</option>
          ))}
        </Form.Select>
        </Form.Group>
      </div>

            <div className="center-select">
            <Form.Group>
                <Form.Label>Quantity (grams)</Form.Label>
                <Form.Select
                className="mealForm"
                    name="quantity"
                    value={meal.quantity}
                    onChange={handleInputChange}
                >
                    <option value="">Select Grams</option>
                    <option value="5">5 grams</option>
                    <option value="10">10 grams</option>
                    <option value="15">15 grams</option>
                    <option value="20">20 grams</option>
                    <option value="25">25 grams</option>
                    <option value="30">30 grams</option>
                    <option value="35">35 grams</option>
                    <option value="40">40 grams</option>
                    <option value="45">45 grams</option>
                    <option value="50">50 grams</option>
                </Form.Select>
            </Form.Group>
            </div>

            <div className="center-select">
            <Form.Group>
                <Form.Label>Meal Type</Form.Label>
                <Form.Select
                className="activityForm"
                    name="mealType"
                    value={meal/* .currentMeal? */.mealType}
                    onChange={handleInputChange}
                >
                    <option value="">Choose Meal</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </Form.Select>
            </Form.Group>
            </div>

            <div className="center-select">
                <Form.Group>
                <Form.Label>Choose a Time</Form.Label>
                    <input type="time" name="time" value={meal/* .currentMeal? */.time || ''} onChange={handleInputChange} />
                    </Form.Group>
            </div>

            <div className="center-select">
            <Card style={{ width: '40rem' }} className="editmeal-nutrients-card">
      <Card.Header>Nutrients</Card.Header>
      <ListGroup variant="flush">
        {meal.nutrients && Object.entries(meal.nutrients).map(([key, value]) => (
          <ListGroup.Item key={key}>{key}: {value} grams</ListGroup.Item>
        ))}
        <ListGroup.Item><strong>Total Calories:</strong> {meal.totalCalories} kcal</ListGroup.Item>
      </ListGroup>
    </Card>
    </div>


            <Button variant="primary" type="submit">Update Activity</Button>

            <Button variant="danger" onClick={handleDelete}>Delete Activity</Button>
        </Form>
        </div>
    );
}

export default EditMeal;
