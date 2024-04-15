// src/routes/activityRouter.js
import express from 'express';
import { ScheduleController } from '../controllers/ScheduleController.js'
import auth from '../middlewares/auth.js'

export const router = express.Router();
const scheduleController = new ScheduleController();


/* router.get('/pet/activitydetails', auth.authenticateJWT, (req, res, next) => {
    activityController.getActivityDetails(req, res, next);
})


router.post('/pet/activitydetails', auth.authenticateJWT, (req, res, next) => {
    activityController.saveActivityDetails(req, res, next);
})


router.put('/pet/activitydetails/:id', auth.authenticateJWT, (req, res, next) => {
    activityController.updateActivityDetails(req, res, next);
}) */

router.post('/pet/scheduledetails', auth.authenticateJWT, (req, res, next) => {
    scheduleController.saveScheduleDetails(req, res, next)
})


router.get('/pet/scheduledetails', auth.authenticateJWT, (req, res, next) => {
    scheduleController.getScheduleDetails(req, res, next)
})

router.put('/pet/scheduledetails/:id', auth.authenticateJWT, (req, res, next) => {
    scheduleController.updateScheduleDetails(req, res, next)
})
