

import { PetController } from '../controllers/PetController.js'
import express from 'express'
import multer from 'multer'
import auth from '../middlewares/auth.js';


export const router = express.Router()
const petController = new PetController()
const upload = multer({ dest: 'uploads/' })


// Save pet Details
router.post('/pet/petdetails', auth.authenticateJWT, upload.single('image'), (req, res, next) => {
    petController.savePetDetails(req, res, next)
})

// Get pet Details
router.get('/pet/petdetails', auth.authenticateJWT, (req, res, next) => {
    petController.getPetDetails(req, res, next)
})

// Update pet details
router.put('/pet/petdetails/:id', auth.authenticateJWT, upload.single('image'), (req, res, next) => {
    petController.updatePetDetails(req, res, next)
})


/* export default router; */
