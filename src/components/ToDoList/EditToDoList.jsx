import React, { useState, useEffect } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { /* useHistory,  */useParams, useNavigate } from 'react-router-dom'

function EditToDoList() {
    const [task, setTask] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTask = async () => {
            const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/todolist/${id}`, {
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
            const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/todolist/edit/${id}`, {
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
            const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/todolist/edit/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            if (response.ok) {
                navigate('/todolist')
            } else {
                throw new Error('Failed to delete task')
            }
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }

    return (

        
        <div >

<h1 className="custom-heading">Edit Activity</h1>
            
            <div>
            <InputGroup>
                <Form.Control
                className="mealForm"
                    type="text"
                    placeholder="Update task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                 </InputGroup>
            </div>
                
                <div>
                    <Button variant="success" onClick={updateTask}>Update Task</Button>
                    <Button variant="danger" onClick={deleteTask}>Delete Task</Button>
                    </div>
           
          
        </div>
    )
}

export default EditToDoList