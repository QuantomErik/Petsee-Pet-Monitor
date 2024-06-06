/**
 * @file Defines the Activity router.
 * @module ActivityRouter
 * @author Erik Yang
 */

import express from 'express'
import { ActivityController } from '../controllers/ActivityController.js'
import auth from '../middlewares/auth.js'

export const router = express.Router()
const activityController = new ActivityController()


router.get('/:petId/activitydetails', auth.authenticateJWT, (req, res, next) => {
    activityController.getActivityDetails(req, res, next)
})

/* router.get('/:petId/activitydetails', auth.authenticateJWT, (req, res, next) => {
    activityController.getActivityDetails(req, res, next)
}) */

// Save new diet details
router.post('/:petId/activitydetails', auth.authenticateJWT, (req, res, next) => {
    activityController.createActivity(req, res, next)
})

/* router.post('/:petId/activitydetails', auth.authenticateJWT, (req, res, next) => {
    activityController.createActivity(req, res, next)
}) */


router.post('/activitydetails', auth.authenticateJWT, (req, res, next) => {
    activityController.createActivity(req, res, next)
})

/* router.post('/', auth.authenticateJWT, (req, res, next) => {
    activityController.createActivity(req, res, next)
}) */


router.get('/activitydetails/:id', auth.authenticateJWT, (req, res, next) => {
    console.log(`Fetching details for ID: ${req.params.id}`)
    activityController.getActivityById(req, res, next)
})

/* router.get('/:id', auth.authenticateJWT, (req, res, next) => {
    console.log(`Fetching details for ID: ${req.params.id}`)
    activityController.getActivityById(req, res, next)
}) */


// Update existing diet details
router.put('/activitydetails/edit/:id', auth.authenticateJWT, (req, res, next) => {
    activityController.updateActivity(req, res, next)
})

/* router.put('/edit/:id', auth.authenticateJWT, (req, res, next) => {
    activityController.updateActivity(req, res, next)
}) */



router.delete('/activitydetails/edit/:id', auth.authenticateJWT, (req, res, next) => {
    activityController.deleteActivity(req, res, next)
})


/* router.delete('/edit/:id', auth.authenticateJWT, (req, res, next) => {
    activityController.deleteActivity(req, res, next)
}) */