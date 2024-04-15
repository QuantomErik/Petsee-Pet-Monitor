import { ActivityModel } from '../models/ActivityModel.js'

export class ActivityController {

    async getActivityDetails(req, res) {
        /* console.log('POST /api/pet/activitydetails route handler') */
        const userId = req.user.id
        try {
            const activityDetails = await ActivityModel.findOne({ userId: userId })

            if (!activityDetails) {
                return res.status(404).json({ message: 'activity details not found' })
            }
            res.status(200).json(activityDetails)
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch activity details', error })
        }
    }

    async saveActivityDetails(req, res) {
        console.log('POST /api/pet/activitydetails route handler')
        console.log("Received activity details:", req.body)

        try {

            const activityDetails = new ActivityModel({
                ...req.body,
                userId: req.user.id
            })

            console.log("Full body received:", req.body)

          await activityDetails.save()

          res.status(201).json({ success: true, message: 'activity Details saved successfully', data: activityDetails })
        } catch (error) {
          console.error('Failed to save activity details:', error)
          res.status(500).send('Internal Server Error')
        }
      }
      
    

      async updateActivityDetails(req, res) {
        const { id } = req.params;
    
        // Check if the body has content
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No details provided for update' });
        }
    
        console.log("Received update for ID:", id);
        console.log("Updating activity details with data:", req.body);
    
        try {
            const updatedActivityDetails = await ActivityModel.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedActivityDetails) {
                return res.status(404).json({ message: 'activity details not found' });
            }
            res.json({ message: 'activity details updated successfully', activityDetails: updatedActivityDetails });
        } catch (error) {
            console.error('Error updating activity details:', error);
            res.status(500).json({ message: 'Failed to update activity details', error });
        }
    }
    
    
}