import express from 'express'
import { ToDoListController } from '../controllers/ToDoListController.js'
import auth from '../middlewares/auth.js'

export const router = express.Router()
const todolistController = new ToDoListController()

router.get('/pet/todolist', auth.authenticateJWT, (req, res, next) => {
    todolistController.getTasks(req, res, next)
})

router.post('/pet/todolist', auth.authenticateJWT, (req, res, next) => {
    todolistController.createTask(req, res, next)
})