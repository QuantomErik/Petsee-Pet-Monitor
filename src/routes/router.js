/**
 * @file Defines the main router.
 * @module router
 * @author Erik Yang
 */

import express from 'express'
import { router as loginRouter } from './loginRouter.js'
import { router as userRouter } from './userRouter.js'
import { router as logoutRouter } from './logoutRouter.js'
import { router as petRouter } from './petRouter.js'
import { router as dietRouter } from './dietRouter.js'
import { router as activityRouter } from './activityRouter.js'
import { router as scheduleRouter } from './scheduleRouter.js'
import { router as todolistRouter } from './todolistRouter.js'
import http from 'node:http'

export const router = express.Router()

router.use('/register', userRouter)
router.use('/petdetails', petRouter)
router.use('/', dietRouter)
router.use('/', activityRouter)
router.use('/scheduledetails', scheduleRouter)
/* router.use('/', todolistRouter) */
router.use('/todolist', todolistRouter)
/* router.use('/', loginRouter) */
router.use('/login', loginRouter)
router.use('/logout', logoutRouter)

/* router.use((req, res, next) => {
  console.log('Unhandled Path:', req.path)
  next()
}) */

/* router.use('*', (req, res) => {
  res.status(404).json({ error: "Not Found", status: 404, path: req.originalUrl })
}) */

router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode
  next(error)
})