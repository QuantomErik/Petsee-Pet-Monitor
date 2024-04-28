// src/routes/activityRouter.js
import express from 'express'
import { ActivityController } from '../controllers/ActivityController.js'
import auth from '../middlewares/auth.js'

export const router = express.Router()
const activityController = new ActivityController()


router.get('/pet/activitydetails', auth.authenticateJWT, (req, res, next) => {
    activityController.getActivityDetails(req, res, next)
})

// Save new diet details
/* router.post('/pet/activitydetails', auth.authenticateJWT, (req, res, next) => {
    activityController.saveActivityDetails(req, res, next)
}) */

/* router.param('id', (req, res, next, id) => activityController.getActivityById(req, res, next, id))
 */
router.post('/pet/activitydetails', auth.authenticateJWT, (req, res, next) => {
    activityController.createActivity(req, res, next)
})

router.get('/pet/activitydetails/:id', auth.authenticateJWT, (req, res, next) => {
    console.log(`Fetching details for ID: ${req.params.id}`)
    activityController.getActivityById(req, res, next)
})

/* router.get('/pet/activitydetails/:activityId', auth.authenticateJWT, (req, res, next) => {
    activityController.getActivityById(req, res, next)
})
 */

/* router.get('/api/pet/activitydetails/:id', auth.authenticateJWT, activityController.updateActivity) */
// Update existing diet details
router.put('/pet/activitydetails/edit/:id', auth.authenticateJWT, (req, res, next) => {
    activityController.updateActivity(req, res, next)
})


router.delete('/pet/activitydetails/edit/:id', auth.authenticateJWT, (req, res, next) => {
    activityController.deleteActivity(req, res, next)
})
