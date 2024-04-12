

import { PetController } from '../controllers/PetController.js'
import express from 'express'
import multer from 'multer'
import auth from '../middlewares/auth.js';


export const router = express.Router()
const petController = new PetController()
const upload = multer({ dest: 'uploads/' })


// Save pet profile
router.post('/pet/profile', auth.authenticateJWT, upload.single('image'), (req, res, next) => {
    petController.savePetProfile(req, res, next)
})

// Get pet profile
router.get('/pet/profile', auth.authenticateJWT, (req, res, next) => {
    petController.getPetProfile(req, res, next);
})

/* export default router; */
