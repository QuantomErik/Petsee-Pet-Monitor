/* import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'



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
                        date: data.date ? new Date(data.date) : new Date()
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
                navigate('/home')
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
 */




/* import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNavigate } from 'react-router-dom'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from 'react-modal'

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
    const [note, setNote] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    

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
                    setScheduleDetails(prevDetails => ({
                        ...prevDetails,
                        date: data.date ? new Date(data.date) : new Date(data.date),
                        note: data.note
                    }))
                   
                    setCalendarEvents(data.map(item => ({
                        title: item.note,
                        date: item.date
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
        setSelectedDate(new Date(arg.dateStr))
        setNote('')
        setModalIsOpen(true)
        setScheduleDetails(prevDetails => ({
            ...prevDetails,
            date: new Date(arg.dateStr) 
        }))
    }

    const handleNoteChange = (event) => {
        setNote(event.target.value)
        const newNote = event.target.value
        setScheduleDetails(prevDetails => ({
            ...prevDetails,
            note: newNote
        }))
    }


    const handleSaveOrUpdate = async () => {
       
        const token = localStorage.getItem('token')
        const method = scheduleDetails.id ? 'PUT' : 'POST'
        const url = scheduleDetails.id ? `http://localhost:3000/api/pet/scheduledetails/${scheduleDetails.id}` : 'http://localhost:3000/api/pet/scheduledetails'
        console.log('Submitting:', scheduleDetails)
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(scheduleDetails)
            })

            console.log('Saving note:', note, 'for date:', selectedDate)
            setModalIsOpen(false)
            if (response.ok) {
                const result = await response.json()
                console.log('Operation successful:', result)


                setCalendarEvents(prevEvents => {
                    const newEvent = {
                        title: scheduleDetails.note,
                        date: scheduleDetails.date.toISOString().split('T')[0] 
                    }
    
                   
                    if (scheduleDetails.id) {
                        return prevEvents.map(event => event.id === scheduleDetails.id ? newEvent : event)
                    } else {
                        return [...prevEvents, newEvent]
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

    return (
        <div className="schedule-details-container">
            <h1>Schedule Details</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                dateClick={handleDateClick}
               
                events={calendarEvents}

                height="auto" 
                contentHeight={650} 
            />
           <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Note Modal"
            ariaHideApp={false} 
        >
            <h2>Enter Note for {selectedDate.toDateString()}</h2>
            <textarea value={note} onChange={handleNoteChange} />
            <button onClick={handleSaveOrUpdate}>Save Note</button>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
        </Modal>
        </div>
    )
}

export default ScheduleDetails
 */

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
                const response = await fetch('http://localhost:3000/api/pet/scheduledetails', {
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
        }));
        setModalIsOpen(true);
    }
    

   /*  const handleDateClick = (arg) => {
        
        setScheduleDetails({
            id: '',
            date: new Date(arg.dateStr),
            note: ''
        })
        setModalIsOpen(true)
    } */

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
        const url = scheduleDetails.id ? `http://localhost:3000/api/pet/scheduledetails/${scheduleDetails.id}` : 'http://localhost:3000/api/pet/scheduledetails'

       /*  const dateToSend = new Date(scheduleDetails.date.getTime())
        dateToSend.setUTCHours(0, 0, 0, 0) */

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

                /* await fetchScheduleDetails() */

                const result = await response.json()

                const updatedEvent = {
                    id: scheduleDetails.id ? scheduleDetails.id : result.id,
                    title: scheduleDetails.note,
                    date: scheduleDetails.date/* .toISOString().split('T')[0] */
                }

                /* const updatedEvent = {
                    id: scheduleDetails.id,
                    title: scheduleDetails.note,
                    date: scheduleDetails.date.toISOString().split('T')[0]
                } */

                setCalendarEvents(prevEvents => {
                    if (scheduleDetails.id) {
                        return prevEvents.map(event => event.id === scheduleDetails.id ? updatedEvent : event)
                    } else {
                        return [...prevEvents, updatedEvent]
                    }
                })

                /* setCalendarEvents(prevEvents => {
                    return scheduleDetails.id ?
                        prevEvents.map(event => event.id === scheduleDetails.id ? updatedEvent : event) :
                        [...prevEvents, { ...updatedEvent, id: response.json().id }]
                }) */

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
        if (!scheduleDetails.id) return  // Can't delete something that hasn't been saved

        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/api/pet/scheduledetails/${scheduleDetails.id}`, {
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
                   {/*  <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Close</Button> */}
                    <Button variant="primary" onClick={handleSaveOrUpdate}>Save</Button>
                    {scheduleDetails.id && <Button variant="danger" onClick={handleDelete}>Delete</Button>}
                </Modal.Footer>
            </Modal>

            {/* <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                contentLabel="Note Modal"
                ariaHideApp={false}
            >
                <h2>Enter Note for {scheduleDetails.date.toDateString()}</h2>
                <textarea value={scheduleDetails.note} onChange={handleNoteChange} />
                <button onClick={handleSaveOrUpdate}>Save</button>

               
                <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal> */}
        </div>
    )
}

export default ScheduleDetails
