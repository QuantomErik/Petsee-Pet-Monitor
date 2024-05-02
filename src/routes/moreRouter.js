import express from 'express'
import { MoreController } from '../controllers/MoreController.js'

export const router = express.Router()
const controller = new MoreController()