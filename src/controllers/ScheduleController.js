import { ScheduleModel } from '../models/ScheduleModel.js'

/**
 * Controller for handling schedule-related operations.
 */
export class ScheduleController {


     /**
     * Save new schedule details to the database.
     *
     * @async
     * @function
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @returns {Promise<void>} A promise that resolves after saving schedule details.
     * @throws {Error} Throws an error if there's an issue saving schedule details.
     */
    async saveScheduleDetails (req, res) {
        const userId = req.user.id

        try {
            const { date, note } = req.body
            const newSchedule = new ScheduleModel({ date, note, userId })
            await newSchedule.save()
            res.status(201).json(newSchedule)
        } catch (error) {
            res.status(500).send('Failed to save schedule details')
        }
    }


    /**
     * Get all schedule details for the logged-in user.
     *
     * @async
     * @function
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @returns {Promise<void>} A promise that resolves after fetching schedule details.
     * @throws {Error} Throws an error if there's an issue fetching schedule details.
     */
    async getScheduleDetails (req, res){
        const userId = req.user.id
        try {
            const schedules = await ScheduleModel.find({ userId: userId })
            res.json(schedules)
        } catch (error) {
            res.status(500).send('Failed to get schedules')
        }
    }
    

    /**
     * Update schedule details by schedule ID.
     *
     * @async
     * @function
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @returns {Promise<void>} A promise that resolves after updating schedule details.
     * @throws {Error} Throws an error if there's an issue updating schedule details.
     */
    async updateScheduleDetails(req, res) {
        const { id } = req.params
        const { date, note } = req.body

        try {
            const updatedSchedule = await ScheduleModel.findByIdAndUpdate(id, { date, note }, { new: true })
            if (!updatedSchedule) {
                return res.status(404).json({ message: 'Schedule not found' })
            }
            res.json({ message: 'Schedule updated successfully', data: updatedSchedule })
        } catch (error) {
            res.status(500).send('Failed to update schedule details')
        }
    }


     /**
     * Delete schedule details by schedule ID.
     *
     * @async
     * @function
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     * @returns {Promise<void>} A promise that resolves after deleting schedule details.
     * @throws {Error} Throws an error if there's an issue deleting schedule details.
     */
    async deleteScheduleDetails(req, res) {
        const id = req.params.id

        try {
            const note = await ScheduleModel.findByIdAndDelete(id)

            if (note) {
                res.status(200).json({
                    message: "Activity successfully deleted",
                    id: note._id
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


