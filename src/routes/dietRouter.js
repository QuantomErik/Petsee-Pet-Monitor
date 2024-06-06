/**
 * @file Defines the Diet router.
 * @module DietRouter
 * @author Erik Yang
 */
import express from 'express'
import { DietController } from '../controllers/DietController.js'
import auth from '../middlewares/auth.js'

export const router = express.Router()
const dietController = new DietController()


/* router.get('/pet/:petId/dietdetails', auth.authenticateJWT, (req, res) => {
    dietController.getDietDetails(req, res)
}) */

router.get('/:petId/dietdetails', auth.authenticateJWT, (req, res) => {
    dietController.getDietDetails(req, res)
})



// Save new diet details for a specific pet
/* router.post('/pet/:petId/dietdetails', auth.authenticateJWT, (req, res, next) => {
    console.log("Received diet details for pet:", req.params.petId, req.body)
    dietController.saveDietDetails(req, res, next)
}) */

router.post('/:petId/dietdetails', auth.authenticateJWT, (req, res, next) => {
    console.log("Received diet details for pet:", req.params.petId, req.body)
    dietController.saveDietDetails(req, res, next)
})


/* router.get('/pet/dietdetails/:id', auth.authenticateJWT, (req, res, next) => {
    
    console.log(`Fetching details for ID: ${req.params.id}`)
    
    dietController.getMealById(req, res, next)
}) */

router.get('/dietdetails/:id', auth.authenticateJWT, (req, res, next) => {
    
    console.log(`Fetching details for ID: ${req.params.id}`)
    
    dietController.getMealById(req, res, next)
})

// Update existing diet details
/* router.put('/pet/dietdetails/edit/:id', auth.authenticateJWT, (req, res, next) => {
    dietController.updateDietDetails(req, res, next)
}) */

router.put('/dietdetails/edit/:id', auth.authenticateJWT, (req, res, next) => {
    dietController.updateDietDetails(req, res, next)
})


/* router.delete('/pet/dietdetails/edit/:mealId', (req, res, next) => {
    dietController.deleteMeal(req, res, next)
}) */

router.delete('/dietdetails/edit/:mealId', (req, res, next) => {
    dietController.deleteMeal(req, res, next)
})