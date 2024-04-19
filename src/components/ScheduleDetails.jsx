import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from 'react-router-dom'

const ScheduleDetails = () => {
    const navigate = useNavigate()
    const [scheduleDetails, setScheduleDetails] = useState({
        id: '',
        date: new Date(),
        note: ''
    })

    useEffect(() => {
        const fetchScheduleDetails = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch('http://localhost:3000/api/pet/scheduledetails', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    setScheduleDetails({
                        ...data,
                        date: data.date ? new Date(data.date) : new Date() // Ensure date is always a Date object
                    })
                } else {
                    console.error('Failed to fetch schedule details')
                }
            } catch (error) {
                console.error('Error fetching schedule details:', error)
            }
        }

        fetchScheduleDetails()
    }, [])

    const handleDateChange = (date) => {
        setScheduleDetails(prevDetails => ({ ...prevDetails, date }))
    }

    const handleNoteChange = (event) => {
        const note = event.target.value
        setScheduleDetails(prevDetails => ({ ...prevDetails, note }))
    }

    const handleSaveOrUpdate = async () => {
        const token = localStorage.getItem('token')
        const method = scheduleDetails.id ? 'PUT' : 'POST'
        const url = scheduleDetails.id ? `http://localhost:3000/api/pet/scheduledetails/${scheduleDetails.id}` : 'http://localhost:3000/api/pet/scheduledetails'

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(scheduleDetails)
            })

            if (response.ok) {
                const result = await response.json()
                console.log('Operation successful:', result)
                navigate('/home') // Redirect as needed
            } else {
                throw new Error('Failed to save/update schedule details')
            }
        } catch (error) {
            console.error('Error saving/updating schedule details:', error)
        }
    }

    return (
        <div className="schedule-details-container">
            <h1>Schedule Details</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSaveOrUpdate()
            }}>
                <div>
                    <DatePicker selected={scheduleDetails.date} onChange={handleDateChange} />
                </div>
                <div>
                    <textarea
                        value={scheduleDetails.note}
                        onChange={handleNoteChange}
                        placeholder="Enter a note for the selected date"
                    />
                </div>
                <button type="submit">Save Schedule</button>
            </form>
        </div>
    )
}

export default ScheduleDetails
