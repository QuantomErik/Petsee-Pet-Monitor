import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Dropdown } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { useParams} from 'react-router-dom'


const PetDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [petImage, setPetImage] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [breeds, setBreeds] = useState([])
  const [petDetails, setPetDetails] = useState({
    id: '',
    name: '',
    age: '',
    weight: '',
    length: '',
    favouriteFood: '',
    favouriteToy: '',
    medicalNotes: '',
    animalType: ',',
    caloriesDay: '',
    activitiesDay: '',
    
  })

 

  useEffect(() => {
  
    if (id && id !== 'addpet') {
      fetchPetDetails(id);
    }
  }, [id])

  const fetchPetDetails = async (id) => {
    const token = localStorage.getItem('token')
    try {
      
      
      const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/petdetails/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          
        },
      })
      if (response.ok) {
        const data = await response.json()
        
        if (data) {
          setPetDetails(data)
          if (data.image) {
            setImagePreviewUrl(`data:image/jpeg;base64,${data.image}`)
          }
        }
      } else {
        throw new Error('Failed to fetch pet details')
      }
    } catch (error) {
      console.error('Error fetching pet details:', error)
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

    const requiredFields = ['name', 'age', 'weight', 'length', 'favouriteFood', 'favouriteToy', 'medicalNotes', 'animalType', 'caloriesDay', 'activitiesDay']
  
  const missingFields = requiredFields.filter(key => !petDetails[key].trim())

  if (missingFields.length > 0) {
    toast.error(`Please fill in all the fields: ${missingFields.join(', ')}`)
    return
  }

    const method = petDetails.id ? 'PUT' : 'POST'
    const endpoint = petDetails.id ? `https://cscloud7-95.lnu.se/petsee/pet/petdetails/${petDetails.id}` : 'https://cscloud7-95.lnu.se/petsee/pet/petdetails'
  

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },

       body: JSON.stringify(petDetails),
      })

      if (!response.ok) {
        throw new Error('Failed to save pet details')
      }

      const result = await response.json()
      console.log('Operation successful:', result)
      console.log('Calling from Petdetails.jsx')
      toast.info('Information updated successfully!')
      // Update local state to reflect the newly saved/updated details
      setPetDetails(result)
      navigate('/home')
    } catch (error) {
      console.error('Error saving/updating pet details:', error)
    }
  }



  return (
    <div className="petdetails-container">
      <h1 className="custom-heading">Pet Details</h1>

        
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
        

      
      
        <Form.Group className="petForm" controlId="animalType">
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
        
        <Form.Group className="petForm" controlId="petAge">
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
        <Form.Group className="petForm" controlId="petWeight">
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


       
        <Form.Group className="petForm" controlId="petLength">
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
        <Form.Group className="petForm" controlId="favouriteFood">
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
        <Form.Group className="petForm" controlId="favouriteToy">
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
        <Form.Group className="petForm" controlId="medicalNotes">
          <Form.Label>Medical Notes</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter any medical notes"
            name="medicalNotes"
            value={petDetails.medicalNotes}
            onChange={handleDetailChange}
          />
        </Form.Group>



        <Form.Group className="petForm" controlId="caloriesDay">
        <Form.Label>CaloriesDay</Form.Label>
        <Form.Select
          name="caloriesDay"
          value={petDetails.caloriesDay}
          onChange={handleDetailChange}
        >
          <option value="">Choose calories needed per day</option>
          {Array.from({ length: 15 }, (_, i) => /* (i + 10) */ 100 * (i + 1)).map((value) => (
            <option key={value} value={value}>
              {value} calories
            </option>
          ))}
        </Form.Select>
      </Form.Group>


      <Form.Group className="petForm" controlId="activitiesDay">
        <Form.Label>Activities Needed Per Day</Form.Label>
        <Form.Select
          name="activitiesDay"
          value={petDetails.activitiesDay}
          onChange={handleDetailChange}
        >
          <option value="">Choose activities needed per day</option>
          {Array.from({ length: 11 }, (_, i) => i).map((value) => (
            <option key={value} value={value}>
              {value} activities
            </option>
          ))}
        </Form.Select>
      </Form.Group>



        <Button variant="primary" onClick={handleSaveOrUpdate}>
          {petDetails.id ? 'Update Pet Details' : 'Save Pet Details'}
        </Button>
      
    </div>
  )
  


  /* return (
    <div className="petdetails-container">
      <h1>Pet Details</h1>
      <div className="pet-image-section">
        <input type="file" id="fileInput" onChange={handleImageChange} hidden />
        <label htmlFor="fileInput" className="file-upload-btn">Choose a file</label>
        {imagePreviewUrl && <img src={imagePreviewUrl} alt="Pet" className="pet-image-circle" />}
      </div>
      
      <div className="pet-biometrics">
      <div className="input-container">
      <label htmlFor="name">Name </label>
          <input
            type="text"
            name="name"
            value={petDetails.name}
            onChange={handleDetailChange}
            placeholder="Pet's name"
          />
        </div>

        <div className="input-container">
        <label htmlFor="name">Animal Type:</label>
                <select name="animalType" value={petDetails.animalType} onChange={handleDetailChange}>
                    <option value="">Select Animal Type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Hamster">Hamster</option>
                    <option value="Rabbit">Rabbit</option>
                </select>
                </div>

        <div className="input-container">
          <select name="age" value={petDetails.age} onChange={handleDetailChange}>
            {Array.from({ length: 21 }, (_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>


<div className="input-container">
          <select name="weight" value={petDetails.weight} onChange={handleDetailChange}>
            {Array.from({ length: 101 }, (_, i) => (
              <option key={i} value={i}>{i} kg</option>
            ))}
          </select>
        </div>

       

<div className="input-container">
          <select name="length" value={petDetails.length} onChange={handleDetailChange}>
            {Array.from({ length: 191 }, (_, i) => i + 10).map(value => (
              <option key={value} value={value}>{value} cm</option>
            ))}
          </select>
        </div>

       

        <div className="input-container">
        <label htmlFor="favouriteFood">Favourite Food </label>
          <input
            type="text"
            name="favouriteFood"
            value={petDetails.favouriteFood}
            onChange={handleDetailChange}
            placeholder="Pet's favourite food"
          />
        </div>

        <div className="input-container">
        <label htmlFor="favouriteToy">Favourite Toy </label>
          <input
            type="text"
            name="favouriteToy"
            value={petDetails.favouriteToy}
            onChange={handleDetailChange}
            placeholder="Pet's favourite toy"
          />
        </div>

        <div className="input-container">
  <select name="breed" value={petDetails.breed} onChange={handleDetailChange}>
    {breeds.length > 0 && breeds.map(breed => (
      <option key={breed} value={breed}>{breed}</option>
    ))}
  </select>
</div>

    

        <div className="input-container">
        <label htmlFor="medicalNotes">Medical Notes </label>
          <input
            type="text"
            name="medicalNotes"
            value={petDetails.medicalNotes}
            onChange={handleDetailChange}
            placeholder="Pet's medical notes"
          />
        </div>

      </div>
      {petDetails.id ?
        <button onClick={handleSaveOrUpdate} className="update-button">Update Pet Details</button> :
        <button onClick={handleSaveOrUpdate} className="save-button">Save Pet Details</button>
      }
    </div>
  ) */
}

export default PetDetails
