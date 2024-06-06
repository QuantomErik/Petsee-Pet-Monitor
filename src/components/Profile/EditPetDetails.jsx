import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * EditPetDetails component that allows the user to view, edit, and delete pet details.
 * Fetches pet details if an ID is provided in the URL, otherwise allows adding a new pet.
 *
 * @component
 * @example
 * return (
 *   <EditPetDetails />
 * )
 */
function EditPetDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [petDetails, setPetDetails] = useState({
    name: '',
    age: '',
    weight: '',
    length: '',
    favouriteFood: '',
    favouriteToy: '',
    medicalNotes: '',
    animalType: '',
    caloriesDay: '',
    activitiesDay: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    /**
     * Fetch pet details from the server.
     */
    const fetchPetDetails = async () => {
      setIsLoading(true)
      try {
       /*  const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/petdetails/${id}`, { */
       const response = await fetch(`https://cscloud7-95.lnu.se/petsee/api/petdetails/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Failed to fetch pet details')
        console.log('Fetched pet details:', data)
        setPetDetails(data)
      } catch (error) {
        setError(error.message)
      }
      setIsLoading(false)
    }

    fetchPetDetails()
  }, [id])


   /**
   * Delete the pet details by sending a request to the server.
   */
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return
    setIsLoading(true)
    try {
     /*  const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/petdetails/${id}`, { */
     const response = await fetch(`https://cscloud7-95.lnu.se/petsee/api/petdetails/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (!response.ok) throw new Error('Failed to delete the pet')
      toast.success('Pet deleted successfully!')
      navigate('/more')
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }


   /**
   * Handle changes in the form fields and update the state.
   *
   * @param {Object} event - The event triggered by the form field change.
   */
  const handleDetailChange = (event) => {
    const { name, value } = event.target
    setPetDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }


  /**
   * Save or update the pet details by sending a request to the server.
   */
  const handleSaveOrUpdate = async () => {
    const formData = new FormData()
    formData.append('details', JSON.stringify(petDetails))

    const method = petDetails.id ? 'PUT' : 'POST'
    const endpoint = petDetails.id
      /* ? `https://cscloud7-95.lnu.se/petsee/pet/petdetails/${petDetails.id}`
      : 'https://cscloud7-95.lnu.se/petsee/pet/petdetails' */

      ? `https://cscloud7-95.lnu.se/petsee/api/petdetails/${petDetails.id}`
      : 'https://cscloud7-95.lnu.se/petsee/api/petdetails'

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

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!petDetails) return <p>No pet details found</p>

  return (
    <div className="petdetails-container">
      <h1 className="custom-heading">Pet Details</h1>

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

      <Form.Group className="mb-3" controlId="petAge">
        <Form.Label>Age</Form.Label>
        <Form.Select
          name="age"
          value={petDetails.age}
          onChange={handleDetailChange}
        >
          {Array.from({ length: 21 }, (_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="petWeight">
        <Form.Label>Weight (kg)</Form.Label>
        <Form.Select
          name="weight"
          value={petDetails.weight}
          onChange={handleDetailChange}
        >
          {Array.from({ length: 101 }, (_, i) => (
            <option key={i} value={i}>
              {i} kg
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="petLength">
        <Form.Label>Length (cm)</Form.Label>
        <Form.Select
          name="length"
          value={petDetails.length}
          onChange={handleDetailChange}
        >
          {Array.from({ length: 101 }, (_, i) => i + 10).map((value) => (
            <option key={value} value={value}>
              {value} cm
            </option>
          ))}
        </Form.Select>
      </Form.Group>

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

      <Form.Group className="mb-3" controlId="caloriesDay">
        <Form.Label>CaloriesDay</Form.Label>
        <Form.Select
          name="caloriesDay"
          value={petDetails.caloriesDay}
          onChange={handleDetailChange}
        >
          {Array.from({ length: 15 }, (_, i) => 100 * (i + 1)).map((value) => (
            <option key={value} value={value}>
              {value} calories
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="activitiesDay">
        <Form.Label>Activities Needed Per Day</Form.Label>
        <Form.Select
          name="activitiesDay"
          value={petDetails.activitiesDay}
          onChange={handleDetailChange}
        >
          {Array.from({ length: 11 }, (_, i) => i).map((value) => (
            <option key={value} value={value}>
              {value} activities
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-start">
        <Button variant="primary" onClick={handleSaveOrUpdate}>
          {petDetails.id ? 'Update ' : 'Save Pet Details'}
        </Button>

        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  )
}

export default EditPetDetails
