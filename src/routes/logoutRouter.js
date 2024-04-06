/**
 * @file Defines the logout router.
 * @module logoutRouter
 * @author Erik Yang
 */
import express from 'express'
import { LogoutController } from '../controllers/LogoutController.js'

export const router = express.Router()
const controller = new LogoutController()

router.post('/', (req, res, next) => controller.logout(req, res, next))
