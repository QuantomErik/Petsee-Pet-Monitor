import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'





const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000
    }
}

const ScheduleDetails = () => {
    const navigate = useNavigate()
    const [calendarEvents, setCalendarEvents] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [scheduleDetails, setScheduleDetails] = useState({
        id: '',
        date: new Date(),
        note: ''
    })

    useEffect(() => {
        const fetchScheduleDetails = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch('https://cscloud7-95.lnu.se/petsee/pet/scheduledetails', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    setCalendarEvents(data.map(item => ({
                        id: item.id,
                        title: item.note,
                        date: item.date,
                        allDay: true
                    })))
                } else {
                    console.error('Failed to fetch schedule details')
                }
            } catch (error) {
                console.error('Error fetching schedule details:', error)
            }
        }

        fetchScheduleDetails()
    }, [])

    const handleDateClick = (arg) => {
        const clickedDate = new Date(arg.dateStr)
        /* clickedDate.setUTCHours(0, 0, 0, 0) */
        setScheduleDetails(prevDetails => ({
            ...prevDetails,
            date: clickedDate,
            id: '',
            note: ''
        }))
        setModalIsOpen(true)
    }
    

   
    const handleEventClick = (clickInfo) => {
        
        const event = clickInfo.event
        setScheduleDetails({
            id: event.id,
            date: new Date(event.start),
            note: event.title
        })
        setModalIsOpen(true)
    }

    const handleNoteChange = (event) => {
        setScheduleDetails(prevDetails => ({
            ...prevDetails,
            note: event.target.value
        }))
    }

    const handleSaveOrUpdate = async () => {
        const token = localStorage.getItem('token')
        const method = scheduleDetails.id ? 'PUT' : 'POST'
        const url = scheduleDetails.id ? `https://cscloud7-95.lnu.se/petsee/pet/scheduledetails/${scheduleDetails.id}` : 'https://cscloud7-95.lnu.se/petsee/pet/scheduledetails'

       
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(scheduleDetails)
               /* body: JSON.stringify({...scheduleDetails, date: dateToSend.toISOString()}) */
                
            })

            if (response.ok) {

                toast.info('Note saved successfully')

               

                const result = await response.json()

                const updatedEvent = {
                    id: scheduleDetails.id ? scheduleDetails.id : result.id,
                    title: scheduleDetails.note,
                    date: scheduleDetails.date/* .toISOString().split('T')[0] */
                }

              

                setCalendarEvents(prevEvents => {
                    if (scheduleDetails.id) {
                        return prevEvents.map(event => event.id === scheduleDetails.id ? updatedEvent : event)
                    } else {
                        return [...prevEvents, updatedEvent]
                    }
                })

              

                navigate('/scheduledetails')
                setModalIsOpen(false)
            } else {
                throw new Error('Failed to save/update schedule details')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleDelete = async () => {
        if (!scheduleDetails.id) return 

        const token = localStorage.getItem('token')
        const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/scheduledetails/${scheduleDetails.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {


            setCalendarEvents(prevEvents => prevEvents.filter(event => event.id !== scheduleDetails.id))
            setModalIsOpen(false)

            toast.info('Note deleted successfully')
        }
    }

    return (
        <div className="schedule-details-container">
            <h1>Schedule Details</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                events={calendarEvents}
                height="auto"
                contentHeight={650}
            />

<Modal
                show={modalIsOpen}
                onHide={() => setModalIsOpen(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter Note for {scheduleDetails.date.toDateString()}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea value={scheduleDetails.note} onChange={handleNoteChange} className="form-control" />
                </Modal.Body>
                <Modal.Footer>
                   
                    <Button variant="primary" onClick={handleSaveOrUpdate}>Save</Button>
                    {scheduleDetails.id && <Button variant="danger" onClick={handleDelete}>Delete</Button>}
                </Modal.Footer>
            </Modal>

          
        </div>
    )
}

export default ScheduleDetails
