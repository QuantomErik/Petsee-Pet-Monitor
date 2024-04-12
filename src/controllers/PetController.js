
import { PetProfileModel } from '../models/PetProfileModel.js'
import fs from 'fs'
import path from 'path'

export class PetController {

    async savePetProfile(req, res) {
        console.log('POST /api/pet/profile route handler')
        try {

            console.log('Received image:', req.file); // Check if the file object is populated
            console.log('Received form data:', req.body); // Check the rest of the form data

            if (!req.file) {
                throw new Error('No image file uploaded');
            }

            const { user, file, body } = req;
            const petDetails = JSON.parse(body.details)

             // Read the file from the uploads directory
             const filePath = req.file.path;
             const fileData = fs.readFileSync(filePath);
             const base64Image = fileData.toString('base64');

            const petProfile = new PetProfileModel({
                ...petDetails,
                /* image: file.path,  */ // or handle the image as needed
                image: base64Image,
                userId: user.id
            });

            await petProfile.save();
            res.status(201).json({ success: true, message: 'Pet profile saved successfully', data: petProfile })
        } catch (error) {
            console.error('Error saving pet profile:', error)
            res.status(500).json({ success: false, message: 'Error saving pet profile' })
        }
    }



    async getPetProfile(req, res) {
        try {
            // Assuming the pet profile is linked to the user
            const userId = req.user.id;
            const petProfile = await PetProfileModel.findOne({ userId: userId });
    
            if (!petProfile) {
                return res.status(404).json({ success: false, message: 'Pet profile not found' });
            }
    
            res.status(200).json(petProfile);
        } catch (error) {
            console.error('Error fetching pet profile:', error);
            res.status(500).json({ success: false, message: 'Error fetching pet profile' });
        }
    }
    


}