
import { PetProfileModel } from '../models/PetProfileModel.js'
import fs from 'fs'
import path from 'path'

export class PetController {

    async savePetDetails(req, res) {
        console.log('POST /api/pet/petdetails route handler')
        try {

           
            console.log('Received  data:', req.body)

           

            const { user, body } = req
            /* const petData = JSON.parse(body.details) */
            const petData = req.body

            console.log('Pet data:', petData);

    

            const petDetails = new PetProfileModel({
                ...petData,
               
                userId: user.id,
                caloriesDay: petData.caloriesDay,
                activitiesDay: petData.activitiesDay
            })
            console.log('Pet details before save:', petDetails);
            await petDetails.save()
            console.log('Pet details after save:', petDetails);
            res.status(201).json({ success: true, message: 'Pet Details saved successfully', data: petDetails })
        } catch (error) {
            console.error('Error saving pet Details:', error)
            res.status(500).json({ success: false, message: 'Error saving pet Details' })
        }
    }

    
    async getPetDetails(req, res) {
        try {
            
            const userId = req.user.id
            const petDetails = await PetProfileModel.find({ userId: userId })
            console.log('Fetched pet details:', petDetails)
    
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
        
            const id = req.params.id
           /*  const userId = req.user.id */
            const petDetails = await PetProfileModel.findById(id)
            /* const petDetails = await PetProfileModel.findOne({ _id: id }) */
    
            if (!petDetails) {
                return res.status(404).json({ success: false, message: 'Pet Details not found' })
            }
    
            res.status(200).json(petDetails)
            /* res.json({
                petDetails: petDetails.map(pet => ({
                    ...pet.toObject(), 
                    _id: pet._id    
                }))
            }) */
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

async deletePet(req, res) {
    try {
        /* const { activityId } = req.params */
        const id = req.params.id

       

        const activity = await PetProfileModel.findByIdAndDelete(id)

        if (activity) {
            res.status(200).json({
                message: "Activity successfully deleted",
                id: activity._id
            })
        } else {
            res.status(404).json({
                message: "Activity not found"
            })
        }
    } catch (error) {
        console.error('Error deleting activity:', error)
        res.status(500).json({
            message: "Error deleting activity",
            error: error.message
        })
    }
}

    


}