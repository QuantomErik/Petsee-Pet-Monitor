// src/controllers/DietController.js
import mongoose from 'mongoose'

import { DietModel } from '../models/DietModel.js'

export class DietController {

    async getDietDetails(req, res) {
        console.log("Fetching meals for petId:", req.params.petId)
        try {
            const petId = req.params.petId
            /* const userId = req.user._id */
            /* const dietDetails = await DietModel.find({ userId })({petId: petId}) */
            const dietDetails = await DietModel.find({ petId: petId })
            console.log("Diet details fetched:", petId,  dietDetails)
console.log("Type of dietDetails:", typeof dietDetails)

console.log("Fetching meals for petId:", req.params.petId)
            
    
            if (!dietDetails || dietDetails.length === 0) {
                return res.status(404).json({ message: 'No diet details found' })
            }
    
            const formattedDietDetails = dietDetails.map(diet => diet.toObject())
            // Map over the documents to convert them to plain JavaScript objects
          /*   const formattedDietDetails = dietDetails.map(diet => ({
                ...diet.toObject(),
                _id: diet._id  
                _id: diet._id.toString()
            })) */
            console.log("Diet details fetched:", dietDetails)
            res.json({ meals: formattedDietDetails/* , userId  */}) // Send the formatted diet details
        } catch (error) {
            console.error('Fetch Error:', error)
            res.status(500).json({ message: 'Error fetching diet details' })
        }
    }
    

   /*  async getDietDetails(req, res) {
        
        const userId = req.user.id
        try {
            
            const dietDetails = await DietModel.find({ userId: userId })

            if (!dietDetails || dietDetails.length === 0) {
                return res.status(404).json({ message: 'No diet details found' })
            }
            
            const consolidatedMeals = dietDetails.reduce((acc, detail) => {
                acc.meals = acc.meals.concat(detail.meals)
                return acc
            }, { meals: [], userId: userId })

           
            res.status(200).json(consolidatedMeals)
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch diet details', error })
        }
    }
 */

    async saveDietDetails(req, res) {
        try {
            const petId = req.params.petId// Get pet ID from route parameter
            const dietDetails = new DietModel({
                ...req.body,
                petId: petId,
            })
    
            await dietDetails.save()
            res.status(201).json({ message: 'Meal saved successfully', data: dietDetails })
        } catch (error) {
            console.error('Failed to save meal:', error)
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation Error', errors: error.errors })
    }
    res.status(500).send('Internal Server Error')
        }
    }
    
    /* async saveDietDetails(req, res) {

        console.log("Received diet details:", req.body)

        console.log('POST /api/pet/dietdetails route handler')
        console.log("Received diet details:", req.body)

        try {

            const dietDetails = new DietModel({
                ...req.body,
                userId: req.user.id
            })

            console.log("Full body received:", req.body)

          await dietDetails.save()

          res.status(201).json({ success: true, message: 'DietController: Diet Details saved successfully', data: dietDetails })
        } catch (error) {
          console.error('Failed to save diet details:', error)
          res.status(500).send('Internal Server Error')
        }
      } */
      
    

      async updateDietDetails(req, res) {

        console.log("Received diet details:", req.body)

        const { id } = req.params
    
        // Check if the body has content
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No details provided for update' })
        }
    
        console.log("Received update for ID:", id)
        console.log("Updating diet details with data:", req.body)
    
        try {
            const updatedDietDetails = await DietModel.findByIdAndUpdate(id, req.body, { new: true })
            if (!updatedDietDetails) {
                return res.status(404).json({ message: 'Diet details not found' })
            }
            res.json({ message: 'Diet details updated successfully', dietDetails: updatedDietDetails })
        } catch (error) {
            console.error('Error updating diet details:', error)
            res.status(500).json({ message: 'Failed to update diet details', error })
        }
    }

    async deleteMeal(req, res) {
        const { mealId } = req.params
        /* const userId = req.user.id */
    
        try {
            const result = await DietModel.findOneAndDelete(
                /* { userId: userId }, */
                { $pull: { meals: { _id: mealId } } },
                { new: true }
            )
    
            if (!result) {
                return res.status(404).json({ message: 'Meal not found' })
            }
    
            res.status(200).json({ success: true, message: 'Meal deleted successfully', data: result })
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete meal', error })
        }
    }

    async getMealById(req, res) {
        const id = req.params.id
        console.log('Attempting to fetch meal with ID:', id)
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.warn('Invalid ID supplied:', id)
            return res.status(400).json({ message: "Invalid ID format" })
        }
    
        try {
            const meal = await DietModel.findById(id)
            if (!meal) {
                console.warn('No meal found with ID:', id)
                return res.status(404).json({ message: "Meal not found" })
            }
            console.log('Meal fetched successfully:', meal)
            res.json(meal)
        } catch (error) {
            console.error('Database access error while fetching meal:', error)
            res.status(500).json({ message: "Error fetching meal", error: error.message })
        }
    }
    

    /* async deleteMeal(req, res) {
        const { mealId } = req.params
        const userId = req.user.id
        console.log('Attempting to delete meal with ID:', mealId, 'for user ID:', userId)
        console.log('Attempting to delete meal with ID:', mealId, 'for user ID:', userId)
try {
    const result = await DietModel.updateOne(
        { userId: userId, 'meals._id': new mongoose.Types.ObjectId(mealId) },
        { $pull: { meals: { _id: new mongoose.Types.ObjectId(mealId) } } }
    )
    console.log('MongoDB Response:', result)
    if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Meal not found or nothing to delete' })
    }
    res.status(200).json({ success: true, message: 'Meal deleted successfully' })
} catch (error) {
    console.error('Failed to delete meal:', error)
    res.status(500).json({ message: 'Failed to delete meal', error })
}
    } */
    
    
    
    
    
}