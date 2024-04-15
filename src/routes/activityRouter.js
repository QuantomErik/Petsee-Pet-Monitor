// src/routes/activityRouter.js
import express from 'express';
import { ActivityController } from '../controllers/ActivityController.js'
import auth from '../middlewares/auth.js'

export const router = express.Router();
const activityController = new ActivityController();


router.get('/pet/activitydetails', auth.authenticateJWT, (req, res, next) => {
    activityController.getActivityDetails(req, res, next);
})

// Save new diet details
router.post('/pet/activitydetails', auth.authenticateJWT, (req, res, next) => {
    activityController.saveActivityDetails(req, res, next);
})

// Update existing diet details
router.put('/pet/activitydetails/:id', auth.authenticateJWT, (req, res, next) => {
    activityController.updateActivityDetails(req, res, next);
})
