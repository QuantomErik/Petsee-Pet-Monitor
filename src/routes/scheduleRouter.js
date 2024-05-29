/**
 * @file Defines the Schedule router.
 * @module ScheduleRouter
 * @author Erik Yang
 */
import express from 'express'
import { ScheduleController } from '../controllers/ScheduleController.js'
import auth from '../middlewares/auth.js'

export const router = express.Router()
const scheduleController = new ScheduleController()

router.post('/pet/scheduledetails', auth.authenticateJWT, (req, res, next) => {
    scheduleController.saveScheduleDetails(req, res, next)
})

router.get('/pet/scheduledetails', auth.authenticateJWT, (req, res, next) => {
    scheduleController.getScheduleDetails(req, res, next)
})

router.put('/pet/scheduledetails/:id', auth.authenticateJWT, (req, res, next) => {
    scheduleController.updateScheduleDetails(req, res, next)
})

router.delete('/pet/scheduledetails/:id', (req, res, next) => {
    scheduleController.deleteScheduleDetails(req, res, next)
})
