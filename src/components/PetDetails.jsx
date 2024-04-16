import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PetDetails = () => {
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
    breed: '',
    medicalNotes: '',
    animalType: ','
  })

  const fetchBreeds = async (animalType) => {
    if (!animalType) {
      setBreeds([])
      return
    }
  
    // Construct the file path based on the animal type
    const filePath = `./Breeds/${animalType.toLowerCase()}Breeds.json`
  
    try {
      const response = await fetch(filePath)
      if (response.ok) {
        const data = await response.json()
        // Check if breeds is actually an array
        if (Array.isArray(data)) {
          setBreeds(data);
        } else {
          console.error('Expected breeds to be an array')
          setBreeds([])
        }
      } else {
        console.error('Failed to fetch breeds', response.status)
        setBreeds([])
      }
    } catch (error) {
      console.error('Error fetching breeds:', error)
      setBreeds([])
    }
  }
  

  useEffect(() => {
    fetchBreeds(petDetails.animalType)
  }, [petDetails.animalType])

  /* const fetchBreeds = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      if (response.ok) {
        const data = await response.json()
        const breedData = data.message
  
      
        const breedsWithSubBreeds = Object.entries(breedData).flatMap(([breed, subBreeds]) => {
          if (subBreeds.length === 0) {
            return [breed]
          } else {
            return subBreeds.map(subBreed => `${breed} (${subBreed})`)
          }
        });
  
        setBreeds(breedsWithSubBreeds)
      } else {
        console.error('Failed to fetch breeds')
      }
    } catch (error) {
      console.error('Error fetching breeds:', error)
    }
  } */

 /*  useEffect(() => {
    fetchBreeds()
  }, []); */

  /* const navigate = useNavigate() */

  useEffect(() => {
    const fetchPetDetails = async () => {
      const token = localStorage.getItem('token')// Ensure you have the token stored in localStorage
      try {
        const response = await fetch('http://localhost:3000/api/pet/petdetails', {
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

    fetchPetDetails();
  }, [])

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file))
      setPetImage(file)
    }
  };

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
      // Update local state to reflect the newly saved/updated details
      setPetDetails(result)
      navigate('/home')
    } catch (error) {
      console.error('Error saving/updating pet details:', error)
    }
  }






  return (
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

        {/* <div className="input-container">
          <input
            type="text"
            name="age"
            value={petDetails.age}
            onChange={handleDetailChange}
            placeholder="Pet's age"
          />
        </div> */}

<div className="input-container">
          <select name="weight" value={petDetails.weight} onChange={handleDetailChange}>
            {Array.from({ length: 101 }, (_, i) => (
              <option key={i} value={i}>{i} kg</option>
            ))}
          </select>
        </div>

        {/* <div className="input-container">
          <input
            type="text"
            name="weight"
            value={petDetails.weight}
            onChange={handleDetailChange}
            placeholder="Pet's weight"
          />
        </div> */}

<div className="input-container">
          <select name="length" value={petDetails.length} onChange={handleDetailChange}>
            {Array.from({ length: 191 }, (_, i) => i + 10).map(value => (
              <option key={value} value={value}>{value} cm</option>
            ))}
          </select>
        </div>

       {/*  <div className="input-container">
          <input
            type="text"
            name="length"
            value={petDetails.length}
            onChange={handleDetailChange}
            placeholder="Pet's length"
          />
        </div> */}

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

        {/* <div className="input-container">
          <input
            type="text"
            name="breed"
            value={petDetails.breed}
            onChange={handleDetailChange}
            placeholder="Pet's Breed"
          />
        </div> */}

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
  )
};

export default PetDetails;
