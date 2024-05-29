import { ActivityModel } from '../models/ActivityModel.js'

/**
 * ActivityController class to handle activity-related operations.
 */
export class ActivityController {


     /**
     * Get activity details for a specific pet on a specific date.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>}
     */
    async getActivityDetails(req, res) {
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

            const activities = await ActivityModel.find({
                petId: petId,
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).lean()

            console.log("Activities fetched:", activities)
            res.json({ activities })
        } catch (error) {
            console.error('Error fetching activities:', error)
            res.status(500).json({ message: 'Error fetching activities' })
        }
    }



    /**
     * Create a new activity for a specific pet.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>}
     */
    async createActivity(req, res) {
        try {

            const petId = req.params.petId
  
            const newActivity = new ActivityModel({
                 ...req.body, 
                 petId: petId })
            await newActivity.save()

            res.status(201).json({ message: 'Activity saved successfully', data: newActivity })
 
        } catch (error) {
            console.error('Error creating activity:', error)
            res.status(500).json({
                message: "Error creating activity",
                error: error.message
            })
        }
    }



     /**
     * Get activity details by activity ID.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>}
     */
    async getActivityById(req, res) {
        try {
            const id = req.params.id
            console.log('ID received:', id)
            const activity = await ActivityModel.findById(id)

            if (!activity) {
                return res.status(404).json({ message: "Activity not found" })
            }
            res.json(activity)
        } catch (error) {
            console.error('Error fetching activity:', error)
            res.status(500).json({ message: "Error fetching activity", error: error.message })
        }
    }


       /**
     * Update an existing activity by activity ID.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>}
     */
      async updateActivity(req, res) {
        const { id } = req.params
        const updates = req.body

        try {
            const updatedActivity = await ActivityModel.findByIdAndUpdate(id, updates, { new: true })

            if (!updatedActivity) {
                return res.status(404).json({ message: "Activity not found" })
            }

            // Send back the updated activity data
            res.status(200).json({
                message: "Activity updated successfully",
                activity: updatedActivity
            })
        } catch (error) {
            console.error('Error updating activity:', error)
            res.status(500).json({
                message: "Error updating activity",
                error: error.message
            })
        }
    }


    /**
     * Delete an activity by activity ID.
     *
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @returns {Promise<void>}
     */
    async deleteActivity(req, res) {
        try {
            const id = req.params.id
            const activity = await ActivityModel.findByIdAndDelete(id)

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