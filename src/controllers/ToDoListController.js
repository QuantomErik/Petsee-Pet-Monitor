import { ToDoListModel } from '../models/ToDoListModel.js'

export class ToDoListController { 


async getTasks (req, res) {
    try {
        const userId = req.user.id
        const tasks = await ToDoListModel.find({ userId }).sort({ createdAt: -1 })
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error })
    }
}

async createTask (req, res) {
    try {
        const { task } = req.body
        if (!task) return res.status(400).json({ message: "Task content is required" })

        const newTask = new ToDoListModel({
            task,
            userId: req.user.id
        })

        await newTask.save()
        res.status(201).json(newTask)
    } catch (error) {
        res.status(500).json({ message: "Failed to create task", error })
    }
}

async getTaskById(req, res) {
    try {
        const { id } = req.params // Extracting the task ID from the request parameters
        const task = await ToDoListModel.findById(id)

        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        // Optionally, check if the task belongs to the user making the request
        if (task.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to access this task" })
        }

        res.json(task)
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid task ID" })
        }
        res.status(500).json({ message: "Failed to retrieve task", error })
    }
}

async updateTask(req, res) {
    try {
        const { id } = req.params // Extracting the task ID from the URL
        const { task, isCompleted } = req.body // Assuming you might be updating task description and its completion status

        // Find the task by ID and ensure it belongs to the user
        const taskToUpdate = await ToDoListModel.findOne({ _id: id, userId: req.user.id })

        if (!taskToUpdate) {
            return res.status(404).json({ message: "Task not found or not authorized to update this task" })
        }

        // Update the task with new values, only if they are provided
        if (task !== undefined) {
            taskToUpdate.task = task
        }
        if (isCompleted !== undefined) {
            taskToUpdate.isCompleted = isCompleted
        }

        // Save the updated task
        await taskToUpdate.save()

        res.json(taskToUpdate) // Sending back the updated task
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid task ID" })
        }
        res.status(500).json({ message: "Failed to update task", error })
    }
}


async deleteTask(req, res) {
    try {
        const { id } = req.params // Extracting the task ID from the URL

        // Find the task by ID and ensure it belongs to the user, then delete it
        const task = await ToDoListModel.findOneAndDelete({ _id: id, userId: req.user.id })

        if (!task) {
            // If no task is found, or it doesn't belong to the user, return an error
            return res.status(404).json({ message: "Task not found or not authorized to delete this task" })
        }

        // If the deletion is successful, send a success response
        res.status(200).json({ message: "Task deleted successfully" })
    } catch (error) {
        if (error.kind === 'ObjectId') {
            // This handles cases where the ID format is invalid
            return res.status(400).json({ message: "Invalid task ID" })
        }
        // General error handling
        res.status(500).json({ message: "Failed to delete task", error })
    }
}


}




