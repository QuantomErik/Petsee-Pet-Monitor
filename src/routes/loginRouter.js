/**
 * @file Defines the login router.
 * @module loginRouter
 * @author Erik Yang
 */

import express from 'express'
import { LoginController } from '../controllers/LoginController.js'

export const router = express.Router()
const controller = new LoginController()

// Login route
/* router.get('/', (req, res, next) => controller.index(req, res, next)) */

// Handle login form submission
/* router.post('/', (req, res, next) => controller.login(req, res, next)) */

router.post('/login', (req, res, next) => controller.login(req, res, next))
