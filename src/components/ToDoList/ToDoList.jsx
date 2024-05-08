import React, { useState, useEffect } from 'react'
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'

function ToDoList() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')

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
    const toggleCompletion = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task._id === id) {
                return { ...task, isCompleted: !task.isCompleted }
            }
            return task
        })
        setTasks(updatedTasks)
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
                    <ListGroup.Item key={task.id} variant={task.isCompleted ? 'success' : ''}>
                        <Form.Check
                            type="checkbox"
                            /* label={task.task} */
                            label={<span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>{task.task}</span>}


                            
                            checked={task.isCompleted}
                            onChange={() => toggleCompletion(task._id)}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default ToDoList
