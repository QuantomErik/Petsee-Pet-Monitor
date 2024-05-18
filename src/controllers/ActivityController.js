import { ActivityModel } from '../models/ActivityModel.js'

export class ActivityController {

    
    async getActivityDetails(req, res, next) {
        try {
            const petId = req.params.petId;
            const { date } = req.query;

            if (!petId) {
                return res.status(400).json({ message: 'Pet ID is required' });
            }

            if (!date) {
                return res.status(400).json({ message: 'Date is required' });
            }


           /*  const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999); */

            
            const activities = await ActivityModel.find({
                petId: petId,
                /* createdAt: {
                    $gte: startDate,
                    $lte: endDate
                } */

               

            }).lean();

            console.log("Activities fetched:", activities);

            res.json({ activities });
        } catch (error) {
            console.error('Error fetching activities:', error);
            res.status(500).json({ message: 'Error fetching activities' });
        }
    }

    /* async getActivityDetails(req, res, next) {
        try {
            const petId = req.params.petId
            const { date, startDate, endDate } = req.query

            if (!petId) {
                return res.status(400).json({ message: 'Pet ID is required' })
            }

            if (!date || !startDate || !endDate) {
                return res.status(400).json({ message: 'Date, startDate, and endDate are required' })
            }

            const targetDate = new Date(date)
            const start = new Date(startDate)
            const end = new Date(endDate)

            if (isNaN(targetDate) || isNaN(start) || isNaN(end)) {
                return res.status(400).json({ message: 'Invalid date format' })
            }

            targetDate.setHours(0, 0, 0, 0)
            start.setHours(0, 0, 0, 0)
            end.setHours(23, 59, 59, 999)

            const activities = await ActivityModel.find({
                petId,
                createdAt: {
                    $gte: start,
                    $lte: end
                }
            }).lean()

            res.json({ activities })
        } catch (error) {
            console.error('Error fetching activities:', error)
            res.status(500).json({ message: 'Error fetching activities' })
        }
    } */

   /*  async getActivityDetails(req, res, next) {
        try {
            const petId = req.params.petId
            const { date, startDate, endDate } = req.query

            if (!petId) {
                return res.status(400).json({ message: 'Pet ID is required' })
            }

            let dateFilter = {}

            if (date) {
                
                const targetDate = new Date(date)
                targetDate.setHours(0, 0, 0, 0)
                const endOfDay = new Date(date)
                endOfDay.setHours(23, 59, 59, 999)
                dateFilter = {
                    $gte: targetDate,
                    $lte: endOfDay,
                }
            } else if (startDate && endDate) {
                
                const start = new Date(startDate)
                const end = new Date(endDate)
                if (isNaN(start) || isNaN(end)) {
                    return res.status(400).json({ message: 'Invalid date format' })
                }
                start.setHours(0, 0, 0, 0)
                end.setHours(23, 59, 59, 999)
                dateFilter = {
                    $gte: start,
                    $lte: end,
                }
            } else {
                return res.status(400).json({ message: 'Date or date range (startDate and endDate) is required' })
            }

            const activities = await ActivityModel.find({
                petId: petId,
                createdAt: dateFilter
            }).lean()

            res.json({ activities })
        } catch (error) {
            console.error('Error fetching activities:', error)
            res.status(500).json({ message: 'Error fetching activities' })
        }
    } */


    

    

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
    

   
    
    async getActivityById(req, res) {
        try {
            const id = req.params.id
           /*  const { id } = req.params */
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
    


   /*  async saveActivityDetails(req, res) {
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
      } */
      async updateActivity(req, res) {
        const { id } = req.params // Assuming the ID is passed as a URL parameter
        const updates = req.body // All updates provided in the body of the request
    
        try {
            // Find the document by ID and update it with the new values
            // The { new: true } option returns the updated document instead of the original
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

   /*  async deleteActivity(req, res) {
        try {
            const { activityId } = req.params
    
           
    
            const activity = await ActivityModel.findByIdAndDelete(activityId)
    
            if (activity) {
                res.status(200).json({
                    message: "Activity successfully deleted",
                    activityId: activity._id
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
    } */
    
    async deleteActivity(req, res) {
        try {
            /* const { activityId } = req.params */
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
    
    

      /* async updateActivityDetails(req, res) {
        const { id } = req.params
    
       
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No details provided for update' })
        }
    
        console.log("Received update for ID:", id)
        console.log("Updating activity details with data:", req.body)
    
        try {
            const updatedActivityDetails = await ActivityModel.findByIdAndUpdate(id, req.body, { new: true })
            if (!updatedActivityDetails) {
                return res.status(404).json({ message: 'activity details not found' })
            }
            res.json({ message: 'activity details updated successfully', activityDetails: updatedActivityDetails })
        } catch (error) {
            console.error('Error updating activity details:', error)
            res.status(500).json({ message: 'Failed to update activity details', error })
        }
    } */
    
    
}















/* import { ActivityModel } from '../models/ActivityModel.js'

export class ActivityController {

    async getActivityDetails(req, res) {
        
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
        const { id } = req.params
    
       
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No details provided for update' })
        }
    
        console.log("Received update for ID:", id)
        console.log("Updating activity details with data:", req.body)
    
        try {
            const updatedActivityDetails = await ActivityModel.findByIdAndUpdate(id, req.body, { new: true })
            if (!updatedActivityDetails) {
                return res.status(404).json({ message: 'activity details not found' })
            }
            res.json({ message: 'activity details updated successfully', activityDetails: updatedActivityDetails })
        } catch (error) {
            console.error('Error updating activity details:', error)
            res.status(500).json({ message: 'Failed to update activity details', error })
        }
    }
    
    
} */