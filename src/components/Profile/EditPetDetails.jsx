import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditPetDetails() {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate();
    const [petDetails, setPetDetails] = useState({
        name: '',
        age: '',
        weight: '',
        length: '',
        favouriteFood: '',
        favouriteToy: '',
       /*  breed: '', */
        medicalNotes: '',
        animalType: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPetDetails(id);
    }, [id]);

    const fetchPetDetails = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/pet/petdetails/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to fetch pet details');
            setPetDetails(data);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/pet/petdetails/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(petDetails)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to update pet details');
            toast.success('Pet details updated successfully!');
            navigate('/more');
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };
    
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this pet?")) return;
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/pet/petdetails/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to delete the pet');
            toast.success('Pet deleted successfully!');
            navigate('/more');
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
          setImagePreviewUrl(URL.createObjectURL(file))
          setPetImage(file)
        }
      }
    
      const handleDetailChange = (event) => {
        const { name, value } = event.target
        setPetDetails(prevDetails => ({
          ...prevDetails,
          [name]: value,
        }))
      }
    
      const handleSaveOrUpdate = async () => {
        const formData = new FormData()
        formData.append('image', petImage)
        formData.append('details', JSON.stringify(petDetails))
    
        const method = petDetails.id ? 'PUT' : 'POST'
        const endpoint = petDetails.id ? `http://localhost:3000/api/pet/petdetails/${petDetails.id}` : 'http://localhost:3000/api/pet/petdetails'
      
    
        try {
          const token = localStorage.getItem('token')
          const response = await fetch(endpoint, {
            method: method,
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          })
    
          if (!response.ok) {
            throw new Error('Failed to save pet details')
          }
    
          const result = await response.json()
          console.log('Operation successful:', result)
          toast.info('Information updated successfully!')
          // Update local state to reflect the newly saved/updated details
          setPetDetails(result)
          navigate('/home')
        } catch (error) {
          console.error('Error saving/updating pet details:', error)
        }
      }
    

    // Define fetchPetDetails, handleInputChange, handleSubmit, and handleDelete here
    // Similar to your EditActivity.jsx logic

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!petDetails) return <p>No pet details found</p>;

    return (
        <div className="petdetails-container">
          <h1>Pet Details</h1>
          <Button variant="primary" onClick={handleSaveOrUpdate}>
              {petDetails.id ? 'Update Pet Details' : 'Save Pet Details'}
            </Button>
    
          <div className="pet-image-section">
            <input type="file" id="fileInput" onChange={handleImageChange} hidden />
            <label htmlFor="fileInput" className="file-upload-btn">Choose a file</label>
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Pet" className="pet-image-circle" />}
          </div>
    
          <div className="center-select">      
            {/* Pet's Name */}
            <Form.Group className="mb-3" controlId="petName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet's name"
                name="name"
                value={petDetails.name}
                onChange={handleDetailChange}
              />
            </Form.Group>
            </div>
    
          
          
            <Form.Group className="mb-3" controlId="animalType">
              <Form.Label>Animal Type</Form.Label>
              <Form.Select
                name="animalType"
                value={petDetails.animalType}
                onChange={handleDetailChange}
              >
                <option value="">Select Animal Type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Hamster">Hamster</option>
                <option value="Rabbit">Rabbit</option>
              </Form.Select>
            </Form.Group>
           
    
            {/* Age */}
            
            <Form.Group className="mb-3" controlId="petAge">
              <Form.Label>Age</Form.Label>
              <Form.Select
                name="age"
                value={petDetails.age}
                onChange={handleDetailChange}
              >
                {Array.from({ length: 21 }, (_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </Form.Select>
            </Form.Group>
            
    
            {/* Weight */}
            <Form.Group className="mb-3" controlId="petWeight">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Select
                name="weight"
                value={petDetails.weight}
                onChange={handleDetailChange}
              >
                {Array.from({ length: 101 }, (_, i) => (
                  <option key={i} value={i}>{i} kg</option>
                ))}
              </Form.Select>
            </Form.Group>
    
            {/* Length */}
            <Form.Group className="mb-3" controlId="petLength">
              <Form.Label>Length (cm)</Form.Label>
              <Form.Select
                name="length"
                value={petDetails.length}
                onChange={handleDetailChange}
              >
                {Array.from({ length: 101 }, (_, i) => i + 10).map(value => (
                  <option key={value} value={value}>{value} cm</option>
                ))}
              </Form.Select>
            </Form.Group>
    
            {/* Favourite Food */}
            <Form.Group className="mb-3" controlId="favouriteFood">
              <Form.Label>Favourite Food</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet's favourite food"
                name="favouriteFood"
                value={petDetails.favouriteFood}
                onChange={handleDetailChange}
              />
            </Form.Group>
    
            {/* Favourite Toy */}
            <Form.Group className="mb-3" controlId="favouriteToy">
              <Form.Label>Favourite Toy</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet's favourite toy"
                name="favouriteToy"
                value={petDetails.favouriteToy}
                onChange={handleDetailChange}
              />
            </Form.Group>
    
            {/* Breed */}
            {/* <Form.Group className="mb-3" controlId="petBreed">
              <Form.Label>Breed</Form.Label>
              <Form.Select
                name="breed"
                value={petDetails.breed}
                onChange={handleDetailChange}
              >
                <option value="">Select a Breed</option>
                {breeds.map(breed => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </Form.Select>
            </Form.Group> */}
    
            {/* Medical Notes */}
            <Form.Group className="mb-3" controlId="medicalNotes">
              <Form.Label>Medical Notes</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter any medical notes"
                name="medicalNotes"
                value={petDetails.medicalNotes}
                onChange={handleDetailChange}
              />
            </Form.Group>
    
            <Button variant="primary" onClick={handleSaveOrUpdate}>
              {petDetails.id ? 'Update Pet Details' : 'Save Pet Details'}
            </Button>
          
        </div>
    );
}

export default EditPetDetails;
