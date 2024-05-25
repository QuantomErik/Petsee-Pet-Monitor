/**
 * @file Defines the main application.
 * @module server
 * @author Erik Yang
 */

import express from 'express'
import session from 'express-session'
import logger from 'morgan'
import { connectToDatabase } from './config/mongoose.js'
import { sessionOptions } from './config/sessionOptions.js'
import { router } from './routes/router.js'
import helmet from 'helmet'
import cors from 'cors'
import mongoose from 'mongoose'




try {
  // Connect to MongoDB.
  await connectToDatabase(process.env.DB_CONNECTION_STRING)

  // Creates an Express application.
  const app = express()

mongoose.set('debug', true)
  

  // Set the base URL to use for all relative URLs in a document.
  const baseURL = process.env.BASE_URL || '/'

  app.use(cors())

  app.use((req, res, next) => {
    console.log(`Request URL: ${req.originalUrl}`)
    next()
  })

  app.use(helmet())
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'default-src': ["'self'"],
        
        'script-src': ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net', 'gc.kis.v2.scr.kaspersky-labs.com'],
        'connect-src': ["'self'", 'wss://gc.kis.v2.scr.kaspersky-labs.com', 'https://gc.kis.v2.scr.kaspersky-labs.com', 'http://localhost:5173',]
      }
    })
  )

  // Parse JSON and urlencoded request bodies
app.use(express.json()) // Parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false })) // Parses incoming requests with URL-encoded payloads

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  

  // Parse requests of the content type application/x-www-form-urlencoded.
  // Populates the request object with a body object (req.body).
  app.use(express.urlencoded({ extended: false }))
  app.use(express.static('dist'))

 

  // Setup and use session middleware (https://github.com/expressjs/session)
  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
  }
  app.use(session(sessionOptions))

  // Middleware to be executed before the routes.
  app.use((req, res, next) => {
    // Flash messages - survives only a round trip.
    if (req.session.flash) {
      res.locals.flash = req.session.flash
      delete req.session.flash
    }

    // Pass the base URL to the views.
    res.locals.baseURL = baseURL

    res.locals.isAuthenticated = !!req.session.user

    next()
  })

  // Register routes.
  app.use('/', router)


  app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`)
    next()
  })

  // Starts the HTTP server listening for connections.
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running at http://localhost:${server.address().port}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
