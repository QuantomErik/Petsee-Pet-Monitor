import mongoose from 'mongoose'
import { DietModel } from '../models/DietModel.js'

/**
 * Controller class to manage diet-related operations.
 */
export class DietController {

     /**
     * Get diet details for a specific pet on a specific date.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>}
     */

     async getDietDetails(req, res) {
        console.log("Fetching meals for petId:", req.params.petId)
        try {
            const petId = req.params.petId
            const { date } = req.query

            if (!petId) {
                return res.status(400).json({ message: 'Pet ID is required' })
            }

            if (!date) {
                return res.status(400).json({ message: 'Date is required' })
            }

            const startDate = new Date(date)
            startDate.setHours(0, 0, 0, 0)

            const endDate = new Date(date)
            endDate.setHours(23, 59, 59, 999)

            const dietDetails = await DietModel.find({
                petId: petId,
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).lean()

            console.log("Activities fetched:", dietDetails);

            
            res.json({ meals: dietDetails })
        } catch (error) {
            console.error('Error fetching diet details:', error)
            res.status(500).json({ message: 'Error fetching diet details' })
        }
    }


     /**
     * Save new diet details for a specific pet.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>}
     */
    async saveDietDetails(req, res) {
        try {
            const petId = req.params.petId
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



    /**
     * Update existing diet details.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>}
     */
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


     /**
     * Delete a meal by meal ID.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>}
     */
    async deleteMeal(req, res) {
        const { mealId } = req.params

        try {
            const result = await DietModel.findOneAndDelete(
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


    /**
     * Get meal details by meal ID.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>}
     */
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
}
