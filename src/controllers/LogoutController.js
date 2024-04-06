/**
 * @file Defines the LogoutController class.
 * @module LogoutController
 * @author Erik Yang
 */

/**
 * Encapsulates a controller.
 */
export class LogoutController {
/**
 * Logout the user by destroying the session.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {Error} Throws an error if there's an issue with the logout process.
 */
  async logout (req, res, next) {
    try {
    // Check if the user is logged in
      if (!req.session.user) {
      // User is not logged in, respond with 404 status code
        const error = new Error('Not Found')
        error.status = 404
        next(error)
      } else {
      // User is logged in, proceed with logout
        req.session.destroy((err) => {
          if (err) {
            console.error('Error destroying session:', err)
            return next(err)
          }
          console.log('Logged out')

          res.redirect('./')
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
      next(error)
    }
  }
}
