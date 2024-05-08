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
}




