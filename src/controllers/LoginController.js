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


/* async login(req, res) {
    try {
      const user = await UserModel.authenticate(req.body.username, req.body.password)
      if (user) {
        const accessToken = await JsonWebToken.encodeUser(user, '36h')
        res.json({
          success: true,
          message: 'Login successful',
          user: {
            id: user.id,
            username: user.username
          },
          accessToken
        })
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' })
      }
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  } */


  async login(req, res) {
    try {
        const result = await UserModel.authenticate(req.body.username, req.body.password)
        if (result.error) {
            switch (result.error) {
                case 'userNotFound':
                    return res.status(404).json({ success: false, message: "The username doesn't exist" })
                case 'passwordIncorrect':
                    return res.status(401).json({ success: false, message: 'Incorrect password' })
                default:
                    return res.status(401).json({ success: false, message: 'Invalid login' })
            }
        }

        // If authentication is successful and result is a user object
        const accessToken = await JsonWebToken.encodeUser(result, '36h')
        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: result.id,
                username: result.username
            },
            accessToken  // Include the token in the response
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}


}
