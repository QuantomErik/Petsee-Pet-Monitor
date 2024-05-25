import { ScheduleModel } from '../models/ScheduleModel.js'

export class ScheduleController {

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

    async getScheduleDetails (req, res){
        const userId = req.user.id
        try {
            const schedules = await ScheduleModel.find({ userId: userId })
            res.json(schedules)
        } catch (error) {
            res.status(500).send('Failed to get schedules')
        }
    }
    
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


