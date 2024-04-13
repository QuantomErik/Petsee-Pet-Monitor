import React, { useEffect, useState } from 'react'

const PetDetails = () => {
  const [petImage, setPetImage] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [petDetails, setPetDetails] = useState({
    id: '', // Include an id field in your state
    name: '',
    age: '',
    weight: '',
    length: '',
    favouriteFood: '',
    favouriteToy: '',
  });

  useEffect(() => {
    const fetchPetDetails = async () => {
      const token = localStorage.getItem('token');// Ensure you have the token stored in localStorage
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
      setPetImage(file);
    }
  };

  const handleDetailChange = (event) => {
    const { name, value } = event.target
    setPetDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

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
      setPetDetails(result);
    } catch (error) {
      console.error('Error saving/updating pet details:', error)
    }
  };

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
          <input
            type="text"
            name="name"
            value={petDetails.name}
            onChange={handleDetailChange}
            placeholder="Pet's name"
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            name="age"
            value={petDetails.age}
            onChange={handleDetailChange}
            placeholder="Pet's age"
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            name="weight"
            value={petDetails.weight}
            onChange={handleDetailChange}
            placeholder="Pet's weight"
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            name="length"
            value={petDetails.length}
            onChange={handleDetailChange}
            placeholder="Pet's length"
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            name="favouriteFood"
            value={petDetails.favouriteFood}
            onChange={handleDetailChange}
            placeholder="Pet's favourite food"
          />
        </div>

        <div className="input-container">
          <input
            type="text"
            name="favouriteToy"
            value={petDetails.favouriteToy}
            onChange={handleDetailChange}
            placeholder="Pet's favourite toy"
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
