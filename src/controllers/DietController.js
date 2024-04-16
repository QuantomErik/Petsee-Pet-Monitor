// src/controllers/DietController.js

import { DietModel } from '../models/DietModel.js'

export class DietController {

    async getDietDetails(req, res) {
        /* console.log('POST /api/pet/dietdetails route handler') */
        const userId = req.user.id
        try {
            const dietDetails = await DietModel.findOne({ userId: userId })

            if (!dietDetails) {
                return res.status(404).json({ message: 'Diet details not found' })
            }
            res.status(200).json(dietDetails)
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch diet details', error })
        }
    }

    async saveDietDetails(req, res) {

        console.log("Received diet details:", req.body);

        console.log('POST /api/pet/dietdetails route handler')
        console.log("Received diet details:", req.body)

        try {

            const dietDetails = new DietModel({
                ...req.body,
                userId: req.user.id
            })

            console.log("Full body received:", req.body)

          await dietDetails.save()

          res.status(201).json({ success: true, message: 'Diet Details saved successfully', data: dietDetails })
        } catch (error) {
          console.error('Failed to save diet details:', error)
          res.status(500).send('Internal Server Error')
        }
      }
      
    

      async updateDietDetails(req, res) {

        console.log("Received diet details:", req.body);

        const { id } = req.params;
    
        // Check if the body has content
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No details provided for update' });
        }
    
        console.log("Received update for ID:", id);
        console.log("Updating diet details with data:", req.body);
    
        try {
            const updatedDietDetails = await DietModel.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedDietDetails) {
                return res.status(404).json({ message: 'Diet details not found' });
            }
            res.json({ message: 'Diet details updated successfully', dietDetails: updatedDietDetails });
        } catch (error) {
            console.error('Error updating diet details:', error);
            res.status(500).json({ message: 'Failed to update diet details', error });
        }
    }
    
    
}
