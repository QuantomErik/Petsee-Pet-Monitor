import React, { useState } from 'react'

const Profile = () => {
  const [petImage, setPetImage] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [petDetails, setPetDetails] = useState({
    name: '',
    age: '',
    weight: '',
    length: '',
    favouriteFood: '',
    favouriteToy: '',
    // Add other biometric details as needed
  })

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        /* setPetImage(URL.createObjectURL(file)) */
        /* setPetImage(file) */
        setImagePreviewUrl(URL.createObjectURL(file)); // Set the URL for image preview
        setPetImage(file); // Keep the file object for sending to the server
    }
  }

  const handleDetailChange = (event) => {
    const { name, value } = event.target
    setPetDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }))
  }

  // Profile.jsx

const handleSave = async () => {
    const formData = new FormData()
    formData.append('image', petImage)
    formData.append('details', JSON.stringify(petDetails))

    
    try {
        const token = localStorage.getItem('token');  // Ensure you have the token stored in localStorage
        const response = await fetch('http://localhost:3000/api/pet/profile', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,  // Set the authorization header
            },
            body: formData,
        })

        if (!response.ok) {
            throw new Error('Failed to save pet profile')
        }

        const result = await response.json();
        console.log('Save successful:', result);
        // Handle success
    } catch (error) {
        console.error('Save error:', error);
        // Handle error
    }
}

  return (
    <div className="profile-container">
      <h1>Pet Profile</h1>
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
        {/* Add more input containers as needed for other biometrics */}

        <button onClick={handleSave} className="save-button">Save Profile</button>

      </div>
    </div>
  )
}

export default Profile;
