import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { toast} from 'react-toastify'


/**
 * ScheduleDetails component to display and manage the schedule details using a calendar interface.
 *
 * @component
 * @example
 * return (
 *   <ScheduleDetails />
 * )
 */
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
                /* const response = await fetch('https://cscloud7-95.lnu.se/petsee/pet/scheduledetails', { */
                const response = await fetch('https://erikyang.se/petsee/api/scheduledetails', {
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


    /**
     * Handles the click on a date in the calendar to open the modal for adding a note.
     *
     * @param {Object} arg - The date click argument from FullCalendar.
     */
    const handleDateClick = (arg) => {
        const clickedDate = new Date(arg.dateStr)
        setScheduleDetails(prevDetails => ({
            ...prevDetails,
            date: clickedDate,
            id: '',
            note: ''
        }))
        setModalIsOpen(true)
    }


    /**
     * Handles the click on an event in the calendar to open the modal for editing the note.
     *
     * @param {Object} clickInfo - The event click info from FullCalendar.
     */
    const handleEventClick = (clickInfo) => {

        const event = clickInfo.event
        setScheduleDetails({
            id: event.id,
            date: new Date(event.start),
            note: event.title
        })
        setModalIsOpen(true)
    }


    /**
     * Handles the change in the note input field.
     *
     * @param {Object} event - The change event from the input field.
     */
    const handleNoteChange = (event) => {
        setScheduleDetails(prevDetails => ({
            ...prevDetails,
            note: event.target.value
        }))
    }


     /**
     * Handles the save or update of the schedule details.
     */
    const handleSaveOrUpdate = async () => {
        const token = localStorage.getItem('token')
        const method = scheduleDetails.id ? 'PUT' : 'POST'
        /* const url = scheduleDetails.id ? `https://cscloud7-95.lnu.se/petsee/pet/scheduledetails/${scheduleDetails.id}` : 'https://cscloud7-95.lnu.se/petsee/pet/scheduledetails' */
        const url = scheduleDetails.id ? `https://erikyang.se/petsee/api/scheduledetails/${scheduleDetails.id}` : 'https://erikyang.se/petsee/api/scheduledetails'

       
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
                toast.info('Note saved successfully')
                const result = await response.json()
                const updatedEvent = {
                    id: scheduleDetails.id ? scheduleDetails.id : result.id,
                    title: scheduleDetails.note,
                    date: scheduleDetails.date
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


    /**
     * Handles the deletion of the schedule note.
     */
    const handleDelete = async () => {
        if (!scheduleDetails.id) return

        const token = localStorage.getItem('token')
        /* const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/scheduledetails/${scheduleDetails.id}`, { */
        const response = await fetch(`https://erikyang.se/petsee/api/scheduledetails/${scheduleDetails.id}`, {
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
            <h1 className="custom-heading">Schedule Details</h1>
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
