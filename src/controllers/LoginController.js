/**
 * @file Defines the LoginController class.
 * @module LoginController
 * @author Erik Yang
 */

import { UserModel } from '../models/UserModel.js'

/**
 * Encapsulates a controller.
 */
export class LoginController {
 

  /**
   * Handles user authentication and login.
   *
   * @async
   * @function
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} A promise that resolves after handling the authentication and login.
   * @throws {Error} Throws an error if there's an issue with authentication.
   */
  async login(req, res) {
    try {
        const user = await UserModel.authenticate(req.body.username, req.body.password)

        if (user) {
            // Instead of regenerating session and redirecting, send a JSON response
            req.session.user = user; // Only if you still need session management
            res.json({ success: true, message: 'Login successful', user: { id: user.id, username: user.username } })
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
}
