import { useState, useEffect } from 'react'
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


/**
 * ToDoList component for managing and displaying a list of tasks.
 *
 * @component
 * @example
 * return (
 *   <ToDoList />
 * )
 */
function ToDoList() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTasks = async () => {
            /* const response = await fetch('https://cscloud7-95.lnu.se/petsee/pet/todolist', { */
            const response = await fetch('https://erikyang.se/petsee/api/todolist', {
            /* const response = await fetch('/api/pet/todolist', { */
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

     /**
     * Handles adding a new task.
     */
    const addTask = async () => {
        if (!newTask.trim()) return
       
        try {
            /* const response = await fetch('https://cscloud7-95.lnu.se/petsee/pet/todolist', { */
           const response = await fetch('https://erikyang.se/petsee/api/todolist', {
            /* const response = await fetch('/api/pet/todolist', { */
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


    /**
     * Toggles the completion status of a task.
     *
     * @param {string} id - The ID of the task to toggle.
     */
    const toggleCompletion = async (id) => {
        const taskToUpdate = tasks.find(task => task._id === id)
        if (!taskToUpdate) return
    
        const updatedTask = { ...taskToUpdate, isCompleted: !taskToUpdate.isCompleted }
        
        try {
            /* const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/todolist/${id}`, { */
            const response = await fetch(`https://erikyang.se/petsee/api/todolist/${id}`, {
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
    

   /**
     * Handles input change for the new task input field.
     *
     * @param {Object} e - The input change event.
     */
    const handleInputChange = (e) => {
        setNewTask(e.target.value)
    }

    // Function to handle Enter key in input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }


    /**
     * Navigates to the edit page for a task.
     *
     * @param {string} id - The ID of the task to edit.
     */
    const handleTaskClick = (id) => {
        navigate(`/todolist/edit/${id}`)
    }

    return (
        <div className="todo-list-container">
            <h1 className="custom-heading">To-do list</h1>
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
            style={{ display: 'flex', alignItems: 'center' }}
        >
            <div 
                onClick={(event) => event.stopPropagation()}
                style={{ marginRight: 'auto' }}
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
