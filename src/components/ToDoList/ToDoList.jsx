import React, { useState, useEffect } from 'react'
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function ToDoList() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('http://localhost:3000/api/pet/todolist', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            if (response.ok) {
                const data = await response.json()
                setTasks(data)
            } else {
                console.error('Failed to fetch tasks')
            }
        }
    
        fetchTasks()
    }, [])

    // Function to handle adding new tasks
    const addTask = async () => {
        if (!newTask.trim()) return
       
        try {
            const response = await fetch('http://localhost:3000/api/pet/todolist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ task: newTask })
            })
    
            if (response.ok) {
                const data = await response.json()
                setTasks(prevTasks => [...prevTasks, data]) 
                setNewTask('')
            } else {
                throw new Error('Failed to create task')
            }
        } catch (error) {
            console.error('Error creating task:', error)
        }
    }
    

    // Function to handle task completion toggle
    const toggleCompletion = async (id) => {
        const taskToUpdate = tasks.find(task => task._id === id)
        if (!taskToUpdate) return
    
        const updatedTask = { ...taskToUpdate, isCompleted: !taskToUpdate.isCompleted }
        
        try {
            const response = await fetch(`http://localhost:3000/api/pet/todolist/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ isCompleted: updatedTask.isCompleted })
            })
    
            if (response.ok) {
                // Update task state locally if the server update was successful
                const updatedTasks = tasks.map(task => 
                    task._id === id ? updatedTask : task
                )
                setTasks(updatedTasks)
            } else {
                throw new Error('Failed to update task completion status')
            }
        } catch (error) {
            console.error('Error updating task:', error)
        }
    }
    

    // Function to handle input changes
    const handleInputChange = (e) => {
        setNewTask(e.target.value)
    }

    // Function to handle Enter key in input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const handleTaskClick = (id) => {
        navigate(`/todolist/edit/${id}`)
    }

    return (
        <div className="todo-list-container">
            <h1>Todo List</h1>
            <InputGroup className="center-select">
                <Form.Control
                    type="text"
                    placeholder="Add new task"
                    value={newTask}
                    name="task"
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <Button variant="primary" onClick={addTask}>Create Task</Button>
            </InputGroup>
            
            <ListGroup>
    {tasks.map(task => (
        <ListGroup.Item
            key={task._id}
            variant={task.isCompleted ? 'success' : ''}
            onClick={() => handleTaskClick(task._id)}
            style={{ display: 'flex', alignItems: 'center' }} // Ensures alignment of items within the list
        >
            <div // This div wraps the checkbox, preventing event propagation to the ListGroup.Item
                onClick={(event) => event.stopPropagation()} // Stops click events from propagating to the ListGroup.Item
                style={{ marginRight: 'auto' }} // Ensures checkbox stays on the left
            >
                <Form.Check
                    type="checkbox"
                    label={<span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.task}</span>}
                    checked={task.isCompleted}
                    onChange={() => toggleCompletion(task._id)}
                />
            </div>
        </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default ToDoList
