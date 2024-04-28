/**
 * @file Defines the UserController class.
 * @module UserController
 * @author Erik Yang
 */

import { UserModel } from '../models/UserModel.js'

/**
 * Class representing the user controller.
 */
export class UserController {


  /**
   * Handles the user registration form submission.
   *
   * @async
   * @function
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {Promise<void>} A promise that resolves after processing the form submission.
   */
  async registerPost(req, res) {
    console.log('POST /api/register route handler')
    console.log(req.body)
    try {
        const { username, password, email } = req.body
        console.log('Registering user:', username, password, email)

        const permissionLevel = 15

        // For debugging: Log the received username and password

        // Basic check to ensure username and password are received
        if (!username || !password || !email) {
            return res.status(400).json({ success: false, message: 'Username, password, and email are required.' })
        }

        const existingEmail = await UserModel.findOne({ email })
if (existingEmail) {
    return res.status(409).json({ success: false, message: 'Email is already in use.' })
}

        // Check for existing user
        const existingUser = await UserModel.findOne({ username })
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Username is already taken.' })
        }

        // Create a new user with default permission level
        const newUser = await UserModel.create({
            username,
            password,
            email,
            permissionLevel  // Set permissionLevel to 15
        })

        // Respond with success and the new user's ID and username
        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            user: { id: newUser._id, username: newUser.username, permissionLevel: newUser.permissionLevel }
        })
    } catch (error) {
        // Log the error to the console for debugging
        console.error('Registration error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}

}
