// src/routes/dietRouter.js
import express from 'express';
import { DietController } from '../controllers/DietController.js'
import auth from '../middlewares/auth.js'

export const router = express.Router();
const dietController = new DietController();


router.get('/pet/dietdetails', auth.authenticateJWT, (req, res, next) => {
    dietController.getDietDetails(req, res, next);
})

// Save new diet details
router.post('/pet/dietdetails', auth.authenticateJWT, (req, res, next) => {
    dietController.saveDietDetails(req, res, next);
})

// Update existing diet details
router.put('/pet/dietdetails/:id', auth.authenticateJWT, (req, res, next) => {
    dietController.updateDietDetails(req, res, next);
})
