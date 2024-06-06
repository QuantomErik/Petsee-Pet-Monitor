/**
 * @file Defines the ToDoList router.
 * @module ToDoListRouter
 * @author Erik Yang
 */
import express from 'express'
import { ToDoListController } from '../controllers/ToDoListController.js'
import auth from '../middlewares/auth.js'

export const router = express.Router()
const todolistController = new ToDoListController()

/* router.get('/pet/todolist', auth.authenticateJWT, (req, res, next) => {
    todolistController.getTasks(req, res, next)
}) */

router.get('/', auth.authenticateJWT, (req, res, next) => {
    todolistController.getTasks(req, res, next)
})


 
/* router.post('/pet/todolist', auth.authenticateJWT, (req, res, next) => {
    todolistController.createTask(req, res, next)
}) */

router.post('/', auth.authenticateJWT, (req, res, next) => {
    todolistController.createTask(req, res, next)
})



/* router.get('/pet/todolist/:id', auth.authenticateJWT, (req, res, next) => {
    todolistController.getTaskById(req, res, next)
}) */

router.get('/:id', auth.authenticateJWT, (req, res, next) => {
    todolistController.getTaskById(req, res, next)
})

/* router.put('/pet/todolist/edit/:id', auth.authenticateJWT, (req, res, next) => {
    todolistController.updateTask(req, res, next)
}) */

router.put('/edit/:id', auth.authenticateJWT, (req, res, next) => {
    todolistController.updateTask(req, res, next)
})

/* router.put('/pet/todolist/:id', auth.authenticateJWT, (req, res, next) => {
    todolistController.updateTask(req, res, next)
}) */

router.put('/:id', auth.authenticateJWT, (req, res, next) => {
    todolistController.updateTask(req, res, next)
})

/* router.delete('/pet/todolist/edit/:id', auth.authenticateJWT, (req, res, next) => {
    todolistController.deleteTask(req, res, next)
}) */

router.delete('/edit/:id', auth.authenticateJWT, (req, res, next) => {
    todolistController.deleteTask(req, res, next)
})