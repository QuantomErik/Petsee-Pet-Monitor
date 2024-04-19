import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

function EditActivity() {
    const { id } = useParams()
    console.log("ID from useParams:", id)
    
    const navigate = useNavigate()
    const [activity, setActivity] = useState({
        type: '',
        duration: '',
        intensity: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {

       

        const fetchActivity = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`http://localhost:3000/api/pet/activitydetails/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json()
                console.log(data)
                if (response.ok) {
                   /*  setActivity(data.activity) */
                    setActivity(data)
                } else {
                    throw new Error(data.message || 'Failed to fetch activity')
                }
            } catch (error) {
                setError(error.message)
            }
            setIsLoading(false)
        }

        fetchActivity()
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setActivity(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/api/pet/activitydetails/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(activity)
            })
            const data = await response.json()
            if (response.ok) {
                navigate('/activitydetails')
            } else {
                throw new Error(data.message || 'Failed to update activity')
            }
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!activity) return <p>No activity found</p>

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control
                    type="text"
                    name="type"
                    value={activity.type}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Duration</Form.Label>
                <Form.Control
                    type="number"
                    name="duration"
                    value={activity.duration}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Intensity</Form.Label>
                <Form.Control
                    type="text"
                    name="intensity"
                    value={activity.intensity}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Update Activity
            </Button>
        </Form>
    )
}

export default EditActivity
