import React, { useState, useEffect } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { /* useHistory,  */useParams, useNavigate } from 'react-router-dom'

function EditToDoList() {
    const [task, setTask] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const { id } = useParams() // Assuming you're using React Router to pass the task ID
    /* const history = useHistory() */
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTask = async () => {
            const response = await fetch(`http://localhost:3000/api/pet/todolist/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            if (response.ok) {
                const data = await response.json()
                setTask(data.task)
                setIsCompleted(data.isCompleted)
            } else {
                console.error('Failed to fetch task')
            }
        }

        fetchTask()
    }, [id])

    const updateTask = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/pet/todolist/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ task, isCompleted }),
            })

            if (response.ok) {
                navigate('/todolist')
            } else {
                throw new Error('Failed to update task')
            }
        } catch (error) {
            console.error('Error updating task:', error)
        }
    }

    const deleteTask = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/pet/todolist/edit/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            if (response.ok) {
                navigate('/todolist') // Navigate back after deletion
            } else {
                throw new Error('Failed to delete task')
            }
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }

    return (
        <div className="center-select">
            
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Update task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                
                    <Button variant="success" onClick={updateTask}>Update Task</Button>
                    <Button variant="danger" onClick={deleteTask}>Delete Task</Button>
                
            </InputGroup>
           {/*  <Form.Check
                type="checkbox"
                label="Completed"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
            /> */}
        </div>
    )
}

export default EditToDoList
