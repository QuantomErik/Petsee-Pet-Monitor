/**
 * @file Defines the Pet router.
 * @module PetRouter
 * @author Erik Yang
 */

import { PetController } from '../controllers/PetController.js'
import express from 'express'
import multer from 'multer'
import auth from '../middlewares/auth.js'


export const router = express.Router()
const petController = new PetController()
const upload = multer({ dest: 'uploads/' })


// Save pet Details
router.post('/pet/petdetails', auth.authenticateJWT, (req, res, next) => {
    console.log(req.body)
    petController.savePetDetails(req, res, next)
})


router.get('/pet/petdetails', auth.authenticateJWT, (req, res, next) => {
    petController.getPetDetails(req, res, next)
})


router.get('/pet/petdetails/:id', auth.authenticateJWT, (req, res, next) => {
    petController.getPetDetailsById(req, res, next)
})


router.put('/pet/petdetails/:id', auth.authenticateJWT, upload.single('image'), (req, res, next) => {
    petController.updatePetDetails(req, res, next)
})

router.delete('/pet/petdetails/:id', auth.authenticateJWT, (req, res, next) => {
    petController.deletePet(req, res, next)
})


