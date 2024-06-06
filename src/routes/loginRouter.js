/**
 * @file Defines the login router.
 * @module loginRouter
 * @author Erik Yang
 */

import express from 'express'
import { LoginController } from '../controllers/LoginController.js'

export const router = express.Router()
const controller = new LoginController()


/* router.post('/login', (req, res, next) => controller.login(req, res, next)) */
router.post('/', (req, res, next) => controller.login(req, res, next))
