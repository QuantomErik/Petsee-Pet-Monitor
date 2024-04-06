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
    console.log(req.body)
    try {
        const { username, password } = req.body;

        // For debugging: Log the received username and password
        console.log('Registering user:', username, password)

        // Basic check to ensure username and password are received
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required.' })
        }

        // Temporarily skip detailed validation and check for existing user
        // Create a new user directly for debugging purposes
        const newUser = await UserModel.create({ username, password })

        // Respond with success and the new user's ID and username
        res.status(201).json({ success: true, message: 'User registered successfully.', user: { id: newUser._id, username: newUser.username } })
    } catch (error) {
        // Log the error to the console for debugging
        console.error('Registration error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}

}
