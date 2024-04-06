/**
 * @file Defines the user router.
 * @module userRouter
 * @author Erik Yang
 */
import express from 'express'
import { UserController } from '../controllers/UserController.js'

export const router = express.Router()
const userController = new UserController()

/* router.get('/', (req, res, next) => userController.register(req, res, next)) */

/* router.post('/', (req, res, next) => {
  console.log('POST /register route handler')
  userController.registerPost(req, res, next)
}) */

router.post('/register', (req, res, next) => {
  console.log('POST /api/register route handler');
  userController.registerPost(req, res, next);
})
