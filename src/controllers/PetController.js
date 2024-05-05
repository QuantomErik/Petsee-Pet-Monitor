
import { PetProfileModel } from '../models/PetProfileModel.js'
import fs from 'fs'
import path from 'path'

export class PetController {

    async savePetDetails(req, res) {
        console.log('POST /api/pet/petdetails route handler')
        try {

            console.log('Received image:', req.file) // Check if the file object is populated
            console.log('Received form data:', req.body) // Check the rest of the form data

            if (!req.file) {
                throw new Error('No image file uploaded')
            }

            const { user, file, body } = req
            const petData = JSON.parse(body.details)

             // Read the file from the uploads directory
             const filePath = req.file.path
             const fileData = fs.readFileSync(filePath)
             const base64Image = fileData.toString('base64')

            const petDetails = new PetProfileModel({
                ...petData,
                /* image: file.path,  */ // or handle the image as needed
                image: base64Image,
                userId: user.id
            })

            await petDetails.save()
            res.status(201).json({ success: true, message: 'Pet Details saved successfully', data: petDetails })
        } catch (error) {
            console.error('Error saving pet Details:', error)
            res.status(500).json({ success: false, message: 'Error saving pet Details' })
        }
    }



    async getPetDetails(req, res) {
        try {
            // Assuming the pet Details is linked to the user
            const userId = req.user.id
            const petDetails = await PetProfileModel.find/* One */({ userId: userId })
    
            if (!petDetails) {
                return res.status(404).json({ success: false, message: 'Pet Details not found' })
            }
    
            res.status(200).json(petDetails)
        } catch (error) {
            console.error('Error fetching pet Details:', error)
            res.status(500).json({ success: false, message: 'Error fetching pet Details' })
        }
    }

    async getPetDetailsById(req, res) {
        try {
            // Assuming the pet Details is linked to the user
            const id = req.params.id
           /*  const userId = req.user.id */
            const petDetails = await PetProfileModel.findById(id)
            /* const petDetails = await PetProfileModel.findOne({ _id: id }); */
    
            if (!petDetails) {
                return res.status(404).json({ success: false, message: 'Pet Details not found' })
            }
    
            res.status(200).json(petDetails)
        } catch (error) {
            console.error('Error fetching pet Details:', error)
            res.status(500).json({ success: false, message: 'Error fetching pet Details' })
        }
    }


async updatePetDetails(req, res) {
    const { id } = req.params
    const updateData = JSON.parse(req.body.details)

    console.log("Received update for ID:", id)
    console.log("Updating pet details with data:", req.body)

    try {
        const updatedPetDetails = await PetProfileModel.findByIdAndUpdate(id, updateData, { new: true })
        if (!updatedPetDetails) {
            return res.status(404).json({ message: "Pet details not found" })
        }
        res.json({ message: "Pet details updated successfully", petDetails: updatedPetDetails })
    } catch (error) {
        console.error("Error updating pet details:", error)
        res.status(500).json({ message: "Failed to update pet details", error: error.toString() })
    }
}

    


}