/**
 * @file Defines the main router.
 * @module router
 * @author Erik Yang
 */

import express from 'express'
import http from 'node:http'
import { router as homeRouter } from './homeRouter.js'
import { router as dashRouter } from './dashRouter.js'
import { router as loginRouter } from './loginRouter.js'
import { router as userRouter } from './userRouter.js'
import { router as logoutRouter } from './logoutRouter.js'
import { router as petRouter } from './petRouter.js'
import { router as dietRouter } from './dietRouter.js'
import { router as activityRouter } from './activityRouter.js'
import { router as scheduleRouter } from './scheduleRouter.js'
import { router as moreRouter } from './moreRouter.js'
/* import { router as homepageRouter } from './logoutRouter.js' */

export const router = express.Router()

router.use('/', homeRouter)
router.use('/dash', dashRouter)
/* router.use('/login', loginRouter) */
router.use('/api', loginRouter)
/* router.use('/register', userRouter) */
router.use('/api', userRouter)

router.use('/api', petRouter)
router.use('/api', dietRouter)
router.use('/api', activityRouter)
router.use('/api', scheduleRouter)
router.use('/api', moreRouter)



/* router.use('/api', homepageRouter) */

router.use('/logout', logoutRouter)


router.use('*', (req, res, next) => {
  const statusCode = 404
  const error = new Error(http.STATUS_CODES[statusCode])
  error.status = statusCode
  next(error)
})
