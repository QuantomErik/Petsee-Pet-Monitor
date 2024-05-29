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

export const router = express.Router()

router.use('/', userRouter)
router.use('/', petRouter)
router.use('/', dietRouter)
router.use('/', activityRouter)
router.use('/', scheduleRouter)
router.use('/', todolistRouter)
router.use('/', loginRouter)
router.use('/logout', logoutRouter)

router.use((req, res, next) => {
  console.log('Unhandled Path:', req.path)
  next()
})

router.use('*', (req, res) => {
  res.status(404).json({ error: "Not Found", status: 404, path: req.originalUrl })
})