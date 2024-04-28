// src/routes/dietRouter.js
import express from 'express'
import { DietController } from '../controllers/DietController.js'
import auth from '../middlewares/auth.js'

export const router = express.Router()
const dietController = new DietController()


router.get('/pet/dietdetails', auth.authenticateJWT, (req, res, next) => {
    dietController.getDietDetails(req, res, next)
})

// Save new diet details
router.post('/pet/dietdetails', auth.authenticateJWT, (req, res, next) => {
    console.log("Received diet details:", req.body)
    dietController.saveDietDetails(req, res, next)
})

router.get('/pet/dietdetails/:id', auth.authenticateJWT, (req, res, next) => {
    console.log(`Fetching details for ID: ${req.params.id}`)
    dietController.getMealById(req, res, next)
})

// Update existing diet details
router.put('/pet/dietdetails/edit/:id', auth.authenticateJWT, (req, res, next) => {
    dietController.updateDietDetails(req, res, next)
})

/* router.delete('/pet/dietdetails/:userId/:mealId', auth.authenticateJWT, (req, res) => {
    dietController.deleteMeal(req, res)
}) */

router.delete('/pet/dietdetails/edit/:mealId', (req, res, next) => {
    dietController.deleteMeal(req, res, next)
})