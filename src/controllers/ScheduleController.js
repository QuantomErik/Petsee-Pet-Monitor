import { ScheduleModel } from '../models/ScheduleModel.js'

export class ScheduleController {

    async saveScheduleDetails (req, res) {
        const userId = req.user.id

        try {
            const { date, note } = req.body;
            /* const newSchedule = new ScheduleModel({ date, note, userId: req.user._id }) */
            const newSchedule = new ScheduleModel({ date, note, userId: userId })
            await newSchedule.save();
            res.status(201).json(newSchedule);
        } catch (error) {
            res.status(500).send('Failed to save schedule details');
        }
    }
    
    async getScheduleDetails (req, res){
        const userId = req.user.id
        try {
            /* const schedules = await ScheduleModel.find({ userId: req.user._id }) */
            const schedules = await ScheduleModel.findOne({ userId: userId })
            res.json(schedules);
        } catch (error) {
            res.status(500).send('Failed to get schedules');
        }
    }
    
    async updateScheduleDetails(req, res) {
        const { id } = req.params;
        const { date, note } = req.body;

        try {
            const updatedSchedule = await ScheduleModel.findByIdAndUpdate(id, { date, note }, { new: true });
            if (!updatedSchedule) {
                return res.status(404).json({ message: 'Schedule not found' });
            }
            res.json({ message: 'Schedule updated successfully', data: updatedSchedule });
        } catch (error) {
            res.status(500).send('Failed to update schedule details');
        }
    }


}