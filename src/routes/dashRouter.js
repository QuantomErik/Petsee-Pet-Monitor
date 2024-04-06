/**
 * @file Defines the dash router.
 * @module dashRouter
 * @author Erik Yang
 */

import express from 'express'
import { DashController } from '../controllers/DashController.js'

export const router = express.Router()

const controller = new DashController()

/**
 * Middleware to check if a user is authenticated.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    // User is authenticated, proceed to the next middleware
    next()
  } else {
    // User is not authenticated, redirect to error page
    res.redirect('errors/404')
  }
}

/**
 * Middleware to check if the authenticated user is the creator of a snippet.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */
const isSnippetCreator = (req, res, next) => {
  if (req.doc && req.doc.createdBy && req.session.user) {
    // Convert to strings for comparison
    if (req.doc.createdBy.toString() === req.session.user.id.toString()) {
      next()
    } else {
      const err = new Error('Forbidden: You are not authorized to perform this action.')
      err.status = 403
      next(err)
    }
  } else {
    req.session.flash = { type: 'danger', text: 'Invalid request parameters.' }
    res.redirect('/dash')
  }
}

// Provide req.doc to the route if :id is present in the route path.
router.param('id', (req, res, next, id) => controller.loadDashDocument(req, res, next, id))

// Map HTTP verbs and route paths to controller action methods.
router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/create', isAuthenticated, (req, res, next) => controller.create(req, res, next))
router.post('/create', isAuthenticated, (req, res, next) => controller.createPost(req, res, next))

router.get('/:id/update', isAuthenticated, isSnippetCreator, (req, res, next) => {
  controller.update(req, res, next)
})

router.post('/:id/update', isAuthenticated, isSnippetCreator, (req, res, next) => controller.updatePost(req, res, next))

router.get('/:id/delete', isAuthenticated, isSnippetCreator, (req, res, next) => controller.delete(req, res, next))
router.post('/:id/delete', isAuthenticated, isSnippetCreator, (req, res, next) => controller.deletePost(req, res, next))
