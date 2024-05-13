

import { PetController } from '../controllers/PetController.js'
import express from 'express'
import multer from 'multer'
import auth from '../middlewares/auth.js'


export const router = express.Router()
const petController = new PetController()
const upload = multer({ dest: 'uploads/' })


// Save pet Details
router.post('/pet/petdetails', auth.authenticateJWT, /* upload.single('image'), */ (req, res, next) => {
    console.log(req.body)
    petController.savePetDetails(req, res, next)
})

/* router.post('/pet/more/addpet', auth.authenticateJWT, upload.single('image'), (req, res, next) => {
    petController.savePetDetails(req, res, next)
}) */

// Get pet Details
/* router.get('/pet/petdetails', auth.authenticateJWT, (req, res, next) => {
    petController.getPetDetails(req, res, next)
}) */

/* router.get('/pet/petdetails', async (req, res) => {
    try {
        const petDetails = await petController.savePetDetails(req, res); // Implement this function to fetch data
        res.json({ pets: petDetails }); // Send JSON response
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}); */


router.get('/pet/petdetails', auth.authenticateJWT, (req, res, next) => {
    petController.getPetDetails(req, res, next)
})

/* router.get('/pet/petdetails/:id', auth.authenticateJWT, (req, res, next) => {
    petController.getPetDetailsById(req, res, next)
}) */

router.get('/pet/petdetails/:id', auth.authenticateJWT, (req, res, next) => {
    petController.getPetDetailsById(req, res, next)
})

// Update pet details
/* router.put('/pet/more/petdetails/:id', auth.authenticateJWT, upload.single('image'), (req, res, next) => {
    petController.updatePetDetails(req, res, next)
}) */

router.put('/pet/petdetails/:id', auth.authenticateJWT, upload.single('image'), (req, res, next) => {
    petController.updatePetDetails(req, res, next)
})

router.delete('/pet/petdetails/:id', auth.authenticateJWT, (req, res, next) => {
    petController.deletePet(req, res, next)
})


/* export default router */
