/**
 * @file Defines the LoginController class.
 * @module LoginController
 * @author Erik Yang
 */

import { UserModel } from '../models/UserModel.js'
import { JsonWebToken } from '../lib/JsonWebToken.js'

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
 /*  async login(req, res) {
    try {
        const user = await UserModel.authenticate(req.body.username, req.body.password)

        if (user) {
            
            const accessToken = await JsonWebToken.encodeUser(user, '36h'); // Set appropriate expiration
        res.json({ accessToken });
            res.json({ success: true, message: 'Login successful', user: { id: user.id, username: user.username } })
            return
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
} */


async login(req, res) {
    try {
      const user = await UserModel.authenticate(req.body.username, req.body.password)
      if (user) {
        // Generate a JWT token
        const accessToken = await JsonWebToken.encodeUser(user, '36h') // Adjust the expiration time
        res.json({
          success: true,
          message: 'Login successful',
          user: {
            id: user.id,
            username: user.username
          },
          accessToken  // Include the token in the response
        });
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' })
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }


}
