/**
 * @file Defines the Dashontroller class.
 * @module DashController
 * @author Erik Yang
 */

import { DashModel } from '../models/DashModel.js'
import xss from 'xss'

/**
 * Encapsulates a controller.
 */
export class DashController {
  /**
   * Provide req.doc to the route if :id is present.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @param {string} id - The value of the id for the task to load.
   */
  async loadDashDocument (req, res, next, id) {
    try {
      // Get the dash document.
      const dashDoc = await DashModel.findById(id)

      // If the dash document is not found, throw an error.
      if (!dashDoc) {
        const error = new Error('The snippet you requested does not exist.')
        error.status = 404
        throw error
      }

      // Provide the dash document to req.
      req.doc = dashDoc

      // Next middleware.
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handles the request to display a list of all snippets with optional filtering.
   * Filters the snippets based on the query parameters provided in the request.
   * Supports filtering by name, tag, occupation, and age.
   * If the age filter is used, validates that the input is a number.
   * In case of invalid age input, sets a flash message and redirects to the dashboard.
   * Sends a response to the client with the filtered snippets or forwards an error.
   *
   * @param {object} req - The Express request object, containing query parameters for filtering.
   * @param {object} res - The Express response object used to render the view.
   * @param {Function} next - The next middleware function in the Express router.
   * @returns {Promise<void>} A promise that resolves when the response is sent or an error is forwarded.
   * @throws Will forward an error to the next middleware if any part of the process fails.
   */
  async index (req, res, next) {
    try {
      const filter = {}
      const filterType = req.query.filterType
      const filterValue = req.query.filterValue

      // Apply filter based on the selected filter type
      switch (filterType) {
        case 'name':
          filter.name = new RegExp(filterValue, 'i')
          break
        case 'tag':
          filter.tags = { $in: [filterValue] }
          break
        case 'occupation':
          filter.occupation = filterValue
          break
        case 'age':
          if (isNaN(filterValue) || filterValue.trim() === '') {
            req.session.flash = { type: 'danger', text: 'Invalid age input. Please enter a valid number.' }
            return res.redirect('/dash')
          }
          filter.age = Number(filterValue)
          break
      }

      const dashes = (await DashModel.find(filter)).map(dashDoc => dashDoc.toObject())

      const viewData = {
        dashes,
        filterType: req.query.filterType,
        currentUserId: req.session.user ? req.session.user.id.toString() : null
      }

      res.render('dash/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Returns a HTML form for creating a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async create (req, res) {
    try {
      const previousData = req.session.previousData
      delete req.session.previousData // Clear after use

      res.render('dash/create', { previousData })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Creates a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {Promise<void>} A promise that resolves when the response is sent or an error is forwarded.
   */
  async createPost (req, res) {
    try {
      const sanitizedAge = xss(req.body.age)
      const sanitizedName = xss(req.body.name)
      const sanitizedEmail = xss(req.body.email)
      const sanitizedOccupation = xss(req.body.occupation)
      const active = req.body

      // Validate Age
      const age = parseInt(sanitizedAge, 10)
      if (isNaN(age) || age < 0 || age > 120) {
        req.session.previousData = { age: sanitizedAge, name: sanitizedName, email: sanitizedEmail, occupation: sanitizedOccupation, active }
        req.session.flash = { type: 'danger', text: 'Invalid age input.' }
        return res.redirect('./create')
      }

      // Validate Email
      if (!sanitizedEmail.includes('@')) {
        req.session.previousData = { age: sanitizedAge, name: sanitizedName, email: sanitizedEmail, occupation: sanitizedOccupation, active }
        req.session.flash = { type: 'danger', text: 'Invalid email.' }
        return res.redirect('./create')
      }

      console.log('Session User:', req.session.user)
      const createdBy = req.session.user.id

      let tags = []

      if (req.body.tags && req.body.tags.trim()) {
        tags = req.body.tags.split(',').map(tag => xss(tag.trim()))
      }

      await DashModel.create({
        age: sanitizedAge,
        name: sanitizedName,
        email: sanitizedEmail,
        occupation: sanitizedOccupation,
        active: active === 'on',
        createdBy,
        tags
      })

      req.session.flash = { type: 'success', text: 'The snippet was created successfully.' }
      res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./create')
    }
  }

  /**
   * Returns a HTML form for updating a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async update (req, res) {
    try {
      res.render('dash/update', { viewData: req.doc.toObject() })
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Updates a specific snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async updatePost (req, res) {
    try {
      if ('age' in req.body) req.doc.age = xss(req.body.age)
      if ('name' in req.body) req.doc.name = xss(req.body.name)
      if ('email' in req.body) req.doc.email = xss(req.body.email)
      if ('occupation' in req.body) req.doc.occupation = xss(req.body.occupation)
      if ('active' in req.body) {
        req.doc.active = req.body.active === 'on'
      } else {
        req.doc.active = false
      }

      if ('tags' in req.body) {
        req.doc.tags = req.body.tags.split(',').map(tag => xss(tag.trim()))
      }

      if (req.doc.isModified()) {
        await req.doc.save()
        req.session.flash = { type: 'success', text: 'The snippet was updated successfully.' }
      } else {
        req.session.flash = { type: 'info', text: 'The snippet was not updated because there was nothing to update.' }
      }
      res.redirect('..')
      console.log('Updated Snippet id:', req.params.id)
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./update')
    }
  }

  /**
   * Returns a HTML form for deleting a snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {Promise<void>} - A promise that resolves when the response is sent or an error is handled.
   */
  async delete (req, res) {
    try {
      const snippetId = req.params.id
      const snippet = await DashModel.findById(snippetId)

      if (!snippet) {
      // Handle case where snippet is not found
        req.session.flash = { type: 'danger', text: 'Snippet not found.' }
        return res.redirect('..')
      }
      res.render('dash/delete', { viewData: snippet })
    } catch (error) {
    // Handle errors
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('..')
    }
  }

  /**
   * Deletes the specified snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async deletePost (req, res) {
    try {
      const snippetId = req.params.id
      const snippet = await DashModel.findById(snippetId)
      await req.doc.deleteOne()

      req.session.flash = { type: 'success', text: 'The snippet was deleted successfully.' }
      res.redirect('..')
      console.log('Snippet ID:', snippetId)
      console.log('Deleted Snippet:', snippet)
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      res.redirect('./delete')
    }
  }
}
